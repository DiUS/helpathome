    jobHandlers = {
      dataUpdate: function(tasksStatus, addedTaskIds, deletedTaskIds) {
        console.log('dataUpdate: ' + tasksStatus +  ' -- ' + addedTaskIds + ' -- ' + deletedTaskIds);
        var data = {
          "name": "Jobs",
          "children": tasksStatus
        };
        console.log(tasksStatus);
        jobMap(data);
        jobProgress(data);
      },
      taskAdded: function(tasksStatus, addedTaskIds) {
        console.log('taskAdded: ' + tasksStatus +  ' -- ' + addedTaskIds);
      },
      taskDeleted: function(tasksStatus, deletedTaskIds) {
        console.log('taskDeleted: ' + tasksStatus +  ' -- ' + deletedTaskIds);
      }
    };
