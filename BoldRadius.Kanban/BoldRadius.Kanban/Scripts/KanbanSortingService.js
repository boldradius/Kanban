(function (SortingService) {

    SortingService.updateProject = function(project, newIndex) {
        viewModel.board.projects.remove(project);
        viewModel.board.projects.splice(newIndex, 0, project);
        
        for (var i = 0; i < viewModel.board.projects().length; i++) {
            viewModel.board.projects()[i].sequenceNumber(i);
        }
    };

    SortingService.updateTask = function(task, statusId, newIndex) {
        var oldStatus = Utilities.findStatus(task.statusId);
        oldStatus.tasks.remove(task);
        for (var i = 0; i < oldStatus.tasks().length; i++) {
            oldStatus.tasks()[i].sequenceNumber(i);
        }
        
        var newStatus = Utilities.findStatus(statusId);
        task.projectId = newStatus.projectId;
        task.statusId = newStatus.id;
        task.sequenceNumber(newIndex);
        newStatus.tasks.splice(newIndex, 0, task);
        for (var j = 0; j < newStatus.tasks().length; j++) {
            newStatus.tasks()[j].sequenceNumber(j);
        }
    };

    SortingService.UpdateSortable = function() {
        $(".sortable-status").sortable({
            connectWith: ".sortable-status",
            stop: function(event, ui) {
                var tasks = ui.item.parent().children();
                var newIndex;
                for (var i = 0; i < tasks.length; i++) {
                    if ($(tasks[i]).attr("task-id") == ui.item.attr("task-id")) {
                        newIndex = i;
                    }
                }
                var koTask = Utilities.findTask(ui.item.attr("task-id"));
                var newParentId = ui.item.parent().attr("status-id");
                $(ui.item).remove();
                SortingService.updateTask(koTask, newParentId, newIndex);
            }
        });
        $(".sortable-status").disableSelection();
        $(".sortable-project").sortable({
            connectWith: ".sortable-project",
            stop: function(event, ui) {
                var projects = $(".sortable-project").children();
                var newIndex;
                for (var i = 0; i < projects.length; i++) {
                    if($(projects[i]).attr("project-id") == ui.item.attr("project-id")) {
                        newIndex = i;
                    }
                }
                var koProject = Utilities.findProject(ui.item.attr("project-id"));
                $(ui.item).remove();
                SortingService.updateProject(koProject, newIndex);
            }
        });
        $(".sortable-project").disableSelection();
    };

})(SortingService = window.SortingService || {});