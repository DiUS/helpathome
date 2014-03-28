var job = {
  code: function(input) {
      return input + 1;
    },

  inputs: function() {
    return [ 1, 2, 3, 4, 5 ];
  }

};

var next_task = 0;
var pending_tasks = [0,1];
var tasks = generate_tasks(job);


exports.next = function(req, res) {
  res.json(tasks[next_task]);
};

exports.show = function(req, res) {
  res.json(tasks[req.params.id]);
};

exports.index = function(req, res) {
  res.json(tasks);
};


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
      status: "not started"
    };
    id = id + 1;
    return task
  })
}
