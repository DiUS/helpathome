var job = require('../jobs/default.js').get;

exports.set = function(req, res) {
  var task_id = req.params.task_id;
  var data = req.body;

  res.json(store(task_id, data));
};

exports.show = function(req, res) {
  var task_id = req.params.task_id;
  var result = job.results[task_id] || {};

  res.json(result);
};

function store(task_id, data) {
  job.results[task_id] = data;
  return data;
}