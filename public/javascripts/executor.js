	var taskCount = 0;


function start(){
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