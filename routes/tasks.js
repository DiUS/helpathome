var job = {

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
  }
};

var current_task = 0;
var pending_tasks = [0,1];
var tasks = generate_tasks(job);


exports.next = function(req, res) {
  if (current_task < tasks.length)
    res.json(tasks[current_task++]);
  else
    res.status(404).send('Not found');
};

exports.show = function(req, res) {
  res.json(tasks[req.params.id]);
};

exports.index = function(req, res) {
  if (req.params.format == 'json') {
    res.json(tasks);
  } else {
    res.render('progress.html');
  }
};

exports.execute = function(req, res) {
  res.json(tasks.map(function(task) {
    return evaluate_task(task);
  }));
};

exports.execute_task = function(req, res) {
  res.json(evaluate_task(tasks[req.params.task_id]));
};


function generate_tasks(job) {
  var id = 0;
  var codeString = job.code.toString();
  return job.inputs().map(function(input) {
    var task = {
      task_id: id,
      task_url: "/tasks/" + id,
      result_url: "/tasks/" + id + "/result",
      task: codeString,
      data: input,
      status: "not started"
    };
    id = id + 1;
    return task;
  })
}

function evaluate_task(task) {
  eval("var f = " + task.task);
  return f(task.data);
}
