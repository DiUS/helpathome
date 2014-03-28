var job = require('../jobs/primes.js').get;
job.results = []

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
  job.tasks[task_id].status = 'done'; 
  return data;
}

exports.store = store