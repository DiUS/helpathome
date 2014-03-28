exports.get = {
  code: function(input) {
    // function isPrime(num) {
    //   var result = true;
    //   if (num !== 2) {
    //     if (num % 2 == 0) {
    //       result = false;
    //     } else {
    //       for (x = 3; x <= Math.sqrt(num); x+=2) {
    //         if (num % x == 0)
    //           result = false;
    //       }
    //     }
    //   }
    //   return result;
    // };

    function isPrime(n) {
      if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
      if (n%2==0) return (n==2);
      if (n%3==0) return (n==3);
      var m=Math.sqrt(n);
      for (var i=5;i<=m;i+=6) {
        if (n%i==0)     return false;
        if (n%(i+2)==0) return false;
      }
      return true;
    }

    result = []
    for (i = input.min; i <= input.max; i++) {
      if(isPrime(i))
        result.push(i);
    }

    return result;

  },

  inputs: function() {
    var start  = 1000000000000000;
    var num_tasks = 10000;
    var step = 1000;
    var finish = start + (num_tasks * step);

    var input_chunks = [];
    for (var i = start; i <= finish; i = i + step) {
      max = (i + step - 1 > finish) ? finish : i + step - 1;
      input_chunks.push({min: i, max: max});
    }
    return input_chunks;
  },

  results: []
};
