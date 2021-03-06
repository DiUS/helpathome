/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var tasks = require('./routes/tasks.js');
var results = require('./routes/results.js');
var app = express();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.engine('html', require('ejs').renderFile);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);

// Tasks
app.get('/tasks', tasks.index);
app.get('/tasks/next', tasks.next);
app.get('/tasks/:id', tasks.show);

//Results
app.put('/tasks/:task_id/result', results.set);
app.get('/tasks/:task_id/result', results.show);
app.get('/tasks/execute', tasks.execute);
app.get('/tasks/:task_id/execute', tasks.execute_task);

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
