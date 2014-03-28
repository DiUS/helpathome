
exports.next = function(req, res) {
  res.json(new_task(0));
};

exports.show = function(req, res) {
  res.json(new_task(req.params.id));
};


function new_task(id) {
  return { 
    task_id: id,
    result_url: "//tasks/" + id + "/result",
    task: 'function(input) { input + 1 }',
    data: id
  };
}