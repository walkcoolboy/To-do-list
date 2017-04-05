$(document).ready(function(e) {

  //prevent default submitting for all forms
  $(document).on("submit", "form", function(e){
    e.preventDefault();
  });

  $('#add-todo').button({icons:{primary:"ui-icon-circle-plus"}}).click(
		function() {
			$('#task').val(""); //clean up the task input every time
			$('#new-todo').dialog('open');
		});

  $('#new-todo').dialog({ modal : true, autoOpen : false,
  		buttons : {
			"Add task" : function () {
				var taskName= $('#task').val();
				if (taskName === "") {return false;}
				var taskHTML = '<li><span class="done">%</span>';
        taskHTML += '<span class="edit">+</span>';
        taskHTML += '<span class="delete">x</span>';
				taskHTML += '<span class="task"></span></li>';
				var $newTask = $(taskHTML);
				$newTask.find('.task').text(taskName);
				$newTask.hide();
				$('#todo-list').prepend($newTask);
				$newTask.show('clip',250).effect('highlight',1000);
				$(this).dialog('close');
			},
			"Cancel" : function () { $(this).dialog('close'); }
		}
	});

	$('#todo-list').on('click', '.done', function() {
		var $taskItem = $(this).parent('li');
		$taskItem.slideUp(250, function() {
			var $this = $(this);
			$this.detach();
			$('#completed-list').prepend($this);
			$this.slideDown();
		});
	});

  //set edit dialog here
  $('#edit').dialog({ modal : true, autoOpen : false});

  //allow edit
  $('#todo-list').on('click', '.edit', function() {
    var $taskNameInToDoList = $(this).parent('li').find('.task');
    var $taskNameInEdit=$('#edit-task');
    $taskNameInEdit.val($taskNameInToDoList.html());
    //setting edit dialog buttons
    $('#edit').dialog({
              buttons : {
              "Confirm" : function () {
                  $(this).dialog('close');
                  $taskNameInToDoList.text($taskNameInEdit.val());
                },
              "Cancel" : function () {
                  $(this).dialog('close');
                }
              }
        });
    //open dialog
    $('#edit').dialog('open');
  });

//allow drag and drop
  $('.sortlist').sortable({
      connectWith : '.sortlist',
      cursor : 'pointer',
      placeholder : 'ui-state-highlight',
      cancel : '.delete,.done,.edit'
  });

  //set delete confirm dialog here
  $('#delete-confirm').dialog({ modal : true, autoOpen : false});

  //allow delete
  $('.sortlist').on('click','.delete',function() {
      var $this=$(this);
      //setting delete confirm dialog buttons
      $('#delete-confirm').dialog({
                buttons : {
                "Delete" : function () {
                    $(this).dialog('close');
                    $this.parent('li').effect('puff', function() {
                      $this.remove();
                    });
                  },
                "Cancel" : function () {
                    $(this).dialog('close');
                  }
                }
          });
      //open dialog
      $('#delete-confirm').dialog('open');
  });

}); // end ready
