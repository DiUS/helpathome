exports.get = {
  code: function(input) {
    return input + 1;
  },

  inputs: function() {
    return [ 1, 2, 3, 4, 5 ];
  },

  reduce: function(x,y) {
    return x + y;
  },

  results: []
};

