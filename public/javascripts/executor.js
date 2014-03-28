	var taskCount = 0;


function start(){
  displayBrowserInformation();
  task = getTask(executor);
}

function startOver(){
	 setTimeout(start,3000);
}

updateTaskId = function(){
	$("#taskId").html(taskCount);
}

executor = function(taskWrapper){
	if(!(taskWrapper['task'])){
		startOver()
	}
	task = "var taskFunction = "+taskWrapper['task']
	
	inputSet = taskWrapper['data']

  taskCount++;
  updateTaskId()
  eval(task)
  result = taskFunction(inputSet)

  pushResult(taskWrapper["result_url"], result, startOver)
}

function displayBrowserInformation() {
    browserInfo  = "<p>Browser Information</p>";
    browserInfo += "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
    browserInfo += "<p>Browser Name: " + navigator.appName + "</p>";
    browserInfo += "<p>Browser Version: " + navigator.appVersion + "</p>";
    browserInfo += "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
    browserInfo += "<p>Platform: " + navigator.platform + "</p>";
    browserInfo += "<p>User-agent header: " + navigator.userAgent + "</p>";
    browserInfo += "<p>User-agent language: " + navigator.systemLanguage + "</p>";
    $('#browserInfo').html(browserInfo);
}
