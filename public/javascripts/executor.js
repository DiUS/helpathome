function start(){
    task = getTask(executor);
    // result = executeTask()
    // submitResultToServer()
}

executor = function(taskWrapper){
	task = "var taskFunction = "+taskWrapper['task']
	inputSet = taskWrapper['data']

	console.log(task)
	console.log(inputSet)

    eval(task)
    result = taskFunction(inputSet)

    pushResult(taskWrapper["result_url"], result)
}
