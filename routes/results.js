var store = require('../store.js');

var job = store.job;
var tasks = store.tasks;

exports.set = function(req, res) {
  var task_id = req.params.task_id;
  var data = req.body;

  res.json(store.save_result(task_id, data));
};

exports.show = function(req, res) {
  var task_id = req.params.task_id;
  var result = job.results[task_id] || {};

  res.json(result);
};