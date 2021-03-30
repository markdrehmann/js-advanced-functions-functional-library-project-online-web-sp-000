const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      let newCollection = Array.isArray(collection) ? collection.slice() : Object.values(collection)
      for(let i = 0; i < newCollection.length; i++) {
        callback(newCollection[i])
      }
      return collection
    },

    map: function(collection, callback) {
      Array.isArray(collection) ? collection : collection = Object.values(collection)
      let mappedArray = []
      for(let i = 0; i < collection.length; i++) {
        mappedArray.push(callback(collection[i]))
      }
      return mappedArray
    },

    reduce: function(collection, action, total) {
      let newCollection = collection.slice(0)
      if (!total) {
        total = newCollection[0]
        newCollection.shift()
      }
      for (let i = 0; i < newCollection.length; i++) {
        total = action(total, newCollection[i])
      }
      return total
    },

    find: function(collection, predicate) {
      Array.isArray(collection) ? collection : Object.values(collection)
      for (let i = 0; i < collection.length; i++)
        if (predicate(collection[i])) return collection[i]
        return undefined
    },

    filter: function(collection, predicate) {
      Array.isArray(collection) ? collection : Object.values(collection)
      let newArray = []
      for (let i = 0; i < collection.length; i++)
        if (predicate(collection[i])) newArray.push(collection[i])
        return newArray
    },

    size: function(collection) {
      return Array.isArray(collection) ? collection.length : Object.values(collection).length
    },

    first: function(collection, num=false) {
      return num ? collection.slice(0, num) : collection[0]
    },

    last: function(collection, num=false) {
      return num ? collection.slice(collection.length - num) : collection[collection.length - 1]
    },

    compact: function(collection) {
      return collection.filter(el => !!el)
    },

    sortBy: function(collection, callback) {
      let newColl = [...collection]
      return newColl.sort(function(a,b) {
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArr=[]) {
      if (!Array.isArray(collection)) return newArr.push(collection)
      if (shallow) {
        for (let val of collection)
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let idx = 1; idx < collection.length; idx++) {
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val)
          if (!modifiedVals.has(moddedVal)) {
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values
    },

    functions: function(obj) {
      const functionNames = []
      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }
      return functionNames.sort()
    }
  }
})()

fi.libraryMethod()
