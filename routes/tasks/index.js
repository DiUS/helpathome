var id = 0;
exports.index = function(req, res){
  res.json({ 
    task_id: id++,
    task: 'function(input) { alert(input); }',
    data: 'Hello from help@home'
  });
};