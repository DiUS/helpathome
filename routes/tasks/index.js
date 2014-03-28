var id = 0;
exports.index = function(req, res) {
  res.json({ 
    task_id: id,
    result_url: "//tasks/" + id + "/result",
    task: 'function(input) { input + 1 }',
    data: id
  });
};