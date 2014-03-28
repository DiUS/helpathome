var results = require('./results.js');
var store = require('../store.js');

var job = store.job;
var tasks = store.tasks;

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

exports.get = tasks

// Helper Functions
function evaluate_task(task) {
  eval("var f = " + task.task);
  console.log(task);
  var result =  f(task.data);
  // return result;
  return store.save_result(task.task_id, result);
}

function summarize_task(task) {
  return {
    task_id: task.task_id,
    task_url: task.task_url,
    result_url: task.result_url,
    status: task.status
  }
}
