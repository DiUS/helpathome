
var next_task = 0;
var pending_tasks = [0,1]; 

exports.next = function(req, res) {
  res.json(task(next_task));
};

exports.show = function(req, res) {
  res.json(task(req.params.id));
};

exports.index = function(req, res) {
  res.json(tasks(pending_tasks));
};


function tasks(ids) {
  return ids.map(function(id){
    return { 
      task_id: id,
      task_url: "//tasks/" + id,
      result_url: "//tasks/" + id + "/result",
      status: "pending"
    };
  })
}

function task(id) {
  return { 
    task_id: id,
    result_url: "//tasks/" + id + "/result",
    task: 'function(input) { input + 1 }',
    data: id
  };
}