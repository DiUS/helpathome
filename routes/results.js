var results = []

exports.set = function(req, res) {
  var task_id = req.params.task_id;
  var data = req.body;

  res.json(store(task_id, data));
};

exports.show = function(req, res) {
  var task_id = req.params.task_id;
  var result = results[task_id] || {};

  res.json(result);
};

function store(task_id, data) {
  results[task_id] = data;
  return data;
}