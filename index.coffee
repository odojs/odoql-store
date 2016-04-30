module.exports = (options) ->
  store =
    stores: {}
    use: (name, cb) ->
      store.stores[name] = cb
      store
    params: {}
  options.name ?= 'store'
  store.params[options.name] = (exe, params) ->
    # support single params and no source
    # for ql.store 'dataset' support
    # instead of requiring ql.store null, 'dataset' syntax
    if !params.__s?
      params.__s = params.__p
      params.__p = null
    getparams = (cb) -> cb null, null
    if params.__p?
      getparams = exe.build params.__p
    getsource = exe.build params.__s
    (cb) ->
      getparams (err, params) ->
        return cb err if err?
        getsource (err, source) ->
          return cb err if err?
          if !store.stores[source]?
            return cb new Error "#{source} store not found"
          store.stores[source] params, cb
  store