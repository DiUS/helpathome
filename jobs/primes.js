exports.get = {
  code: function(input) {
    function isPrime(num) {
      var result = true;
      if (num !== 2) {
        if (num % 2 == 0) {
          result = false;
        } else {
          for (x = 3; x <= Math.sqrt(num); x+=2) {
            if (num % x == 0)
              result = false;
          }
        }
      }
      return result;
    };

    result = []
    for (i = input.min; i <= input.max; i++) {
      if(isPrime(i))
        result.push(i);
    }

    return result;

  },

  inputs: function() {
    var start = 1;
    var finish = 1000000;
    var step = 100000;

    var input_chunks = [];
    for (var i = start; i <= finish; i = i + step) {
      max = (i + step - 1 > finish) ? finish : i + step - 1;
      input_chunks.push({min: i, max: max});
    }
    return input_chunks;
  },

  results: []
};