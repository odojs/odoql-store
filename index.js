// Generated by CoffeeScript 1.9.2
module.exports = function(options) {
  var store;
  store = {
    stores: {},
    use: function(name, cb) {
      store.stores[name] = cb;
      return store;
    },
    params: {}
  };
  if (options.name == null) {
    options.name = 'store';
  }
  store.params[options.name] = function(exe, params) {
    var getparams, getsource;
    if (params.__s == null) {
      params.__s = params.__p;
      params.__p = null;
    }
    getparams = function(cb) {
      return cb(null, null);
    };
    if (params.__p != null) {
      getparams = exe.build(params.__p);
    }
    getsource = exe.build(params.__s);
    return function(cb) {
      return getparams(function(err, params) {
        if (err != null) {
          return cb(err);
        }
        return getsource(function(err, source) {
          if (err != null) {
            return cb(err);
          }
          if (store.stores[source] == null) {
            return cb(new Error(source + " store not found"));
          }
          return store.stores[source](params, cb);
        });
      });
    };
  };
  return store;
};
