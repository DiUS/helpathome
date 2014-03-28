getTask = function (callback) {
    return $.getJSON("/tasks/next", callback);
}

pushResult = function(path, result, callback){
	console.log("path = "+ path)
	$.ajax({
		type: 'PUT',
		contentType: "application/json",
		url: path, 
		data: JSON.stringify({ "result": result}),
		dataType: 'json',
		success: callback()
	});
}