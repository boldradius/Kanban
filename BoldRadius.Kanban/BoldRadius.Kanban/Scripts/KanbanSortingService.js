(function (SortingService) {

    SortingService.updateProject = function(project, newIndex) {
        viewModel.board.projects.remove(project);
        viewModel.board.projects.splice(newIndex, 0, project);
        
        for (var i = 0; i < viewModel.board.projects().length; i++) {
            viewModel.board.projects()[i].sequenceNumber(i);
        }
    };

    SortingService.updateTask = function(taskId, statusId, sequenceNumber) {
        var task = viewModel.findTask(taskId);
        var newStatus = viewModel.findStatus(statusId);
        task.projectId = newStatus.projectId;
        task.statusId = newStatus.id;
        task.sequenceNumber = sequenceNumber;
        $("[task-id='" + taskId + "']").remove();
        newStatus.tasks.push(task);
    };

    SortingService.UpdateSortable = function() {
        $(".sortable-status").sortable({
            connectWith: ".sortable-status",
            receive: function(event, ui) {
                SortingService.updateTask(ui.item.attr("task-id"), ui.item.parent().attr("status-id"));
            }
        });
        $(".sortable-status").disableSelection();
        $(".sortable-project").sortable({
            connectWith: ".sortable-project",
            receive: function(event, ui) {
                var projects = $(".sortable-project").children();
                var newIndex;
                for (var i = 0; i < projects.length; i++) {
                    if($(projects[i]).attr("project-id") == ui.item.attr("project-id")) {
                        newIndex = i;
                    }
                }
                var koProject = viewModel.findProject(ui.item.attr("project-id"));
                $(ui.item).remove();
                SortingService.updateProject(koProject, newIndex);
            }
        });
        $(".sortable-project").disableSelection();
    };

})(SortingService = window.SortingService || {});