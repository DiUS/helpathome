      var tasksEndPoint = "http://localhost:9292/tasks"
      var tid;
      var oldTaskIds = [];

      function jobStatusPoller() {
        $.ajax({
          url: tasksEndPoint,
          data: { format: 'json' },
          type: 'GET',
          dataType: 'json',

          success: function(tasksStatus) {
            //JSON.parse(tasksStatus); //!?
            currentIds = [];
            deletedIds = [];
            addedIds = [];
            for (var i=0; i<tasksStatus.length; i++)
            {
              currentIds.push(tasksStatus[i]['task_id']);
            }
            findIdsChange(currentIds, oldTaskIds, deletedIds, addedIds);

            taskDeletedHandler = jobHandlers['taskDeleted'];
            taskAddedHandler = jobHandlers['taskAdded'];
            dataUpdateHandler = jobHandlers['dataUpdate'];

            fireNotifications(tasksStatus, addedIds, deletedIds);

            oldTaskIds = currentIds;
          },

          error: function(jqXHR, textStatus, errorThrown) {
            console.log('Ajax error: ' + jqXHR + ' -- ' + textStatus + ' -- ' + errorThrown);
          }
        });
      };

      function startTimer() {
        //tid = setInterval(jobStatusPoller, 2000);
        jobStatusPoller();
      };

      function abortTimer() { // to be called when you want to stop the timer
        clearInterval(tid);
      };

      function findIdsChange(currentIds, oldIds, deleted, added) {
        jQuery.grep(currentIds, function(current) {
          if (jQuery.inArray(current, oldIds) == -1) added.push(current);
        });

        jQuery.grep(oldIds, function(current) {
          if (jQuery.inArray(current, currentIds) == -1) deleted.push(current);
        });
      };

      function fireNotifications(tasksStatus, addedIds, deletedIds){
        if (deletedIds.length != 0 && taskDeletedHandler !== undefined) (tasksStatus, deletedIds);
        if (addedIds.length != 0 && taskAddedHandler !== undefined) jobHandlers['taskAdded'](tasksStatus, deletedIds);
        jobHandlers['dataUpdate'](tasksStatus, deletedIds, addedIds);
      };
