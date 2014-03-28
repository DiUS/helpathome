requestTaskFromServer = function (callback) {

//    return {
//        "taskId": 123,
//        "taskFunction": "taskFunction = function(input){" +
//            "console.log(input);" +
//            "}",
//        "inputSet": "an input set"
//    }

    return $.getJSON("/tasks/next", callback);
}
