var results = require('./results.js');

var job = require('../jobs/primes.js').get;
var tasks = generate_tasks(job);

var next_task = 0;

exports.next = function(req, res) {
  if (next_task < tasks.length) {
    task = tasks[next_task++];
    task.status = 'running';
    res.json(task);
  }
  else
    res.status(404).send('Not found');
};

exports.show = function(req, res) {
  res.json(tasks[req.params.id]);
};

exports.index = function(req, res) {
  if (req.query.format == 'json') {
    res.json(tasks.map(summarize_task));
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


// Helper Functions
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
      status: 'pending'
    };
    id = id + 1;
    return task;
  })
}

function evaluate_task(task) {
  eval("var f = " + task.task);
  console.log(task);
  var result =  f(task.data);
  return result;
  // return results.store(task.task_id, result);
}

function summarize_task(task) {
  return {
    task_id: task.task_id,
    task_url: task.task_url,
    result_url: task.result_url,
    status: task.status
  }
}
