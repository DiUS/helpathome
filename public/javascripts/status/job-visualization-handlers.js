jobHandlers = {
        dataUpdate: function(tasksStatus, addedTaskIds, deletedTaskIds) {
          console.log('dataUpdate: ' + tasksStatus +  ' -- ' + addedTaskIds + ' -- ' + deletedTaskIds);
          jobMap(tasksStatus);
          jobProgress(tasksStatus);
        },
        taskAdded: function(tasksStatus, addedTaskIds) {
          console.log('taskAdded: ' + tasksStatus +  ' -- ' + addedTaskIds);

        },
        taskDeleted: function(tasksStatus, deletedTaskIds) {
          console.log('taskDeleted: ' + tasksStatus +  ' -- ' + deletedTaskIds);
        }
      };
