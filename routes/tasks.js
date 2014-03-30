var results = require('./results.js');
var store = require('../store.js');

var job = store.job;
var tasks = store.tasks;

var next_task = 0;

exports.next = function(req, res) {
  if (next_task < tasks.length) {
    task = tasks[next_task++];
    start_task(task);
    task.owner_name = req.query.owner_name;
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
    addr_port = req.headers.host.split(':');
    host_address = (addr_port[0] + ':' + addr_port[1]);
    console.log(host_address);
    res.render('progress', { 'hostAddress': host_address });
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
  start_task(task)
  var result =  f(task.data);
  return store.save_result(task.task_id, result);
}

function summarize_task(task) {
  var execution_time = null;
  if(task.end_time)
    execution_time = task.end_time - task.start_time
  return {
    task_id: task.task_id,
    task_url: task.task_url,
    result_url: task.result_url,
    status: task.status,
    owner_name: task.owner_name,
    execution_time: execution_time
  }
}

function start_task(task) {
  task.status = 'running';
  task.start_time = new Date().getTime();
}
