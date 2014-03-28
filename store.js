var job = require('./jobs/primes.js').get;
var tasks = generate_tasks(job);

job.results = []

function save_result(task_id, data) {
  job.results[task_id] = data;
  tasks[task_id].status = 'done'; 
  return data;
}

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
      status: 'pending'
    };
    id = id + 1;
    return task;
  })
}

exports.job = job;
exports.tasks = tasks;
exports.save_result = save_result;
