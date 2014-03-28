function start(){
    task = requestTaskFromServer(executor);
}

executor = function(taskWrapper){
	task = taskWrapper['task']
	inputSet = taskWrapper['data']

    result = eval(task)(inputSet);
    console.log("result = "+ result)
}
