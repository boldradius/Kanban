(function (BoldRadiusKanban) {

    (function(SortingService) {

        SortingService = {
            UpdateProject : function (projectId, sequenceNumber)
        {
            var projectToUpdate = self.findProject(projectId);
            if (projectToUpdate.sequenceNumber < sequenceNumber) {
                for (var i = 0; i < self.board.projects().length; i++) {
                    if (self.board.projects()[i].sequenceNumber <= sequenceNumber) {
                        --self.board.projects()[i].sequenceNumber;
                    }
                }
            } else {
                for (var i = 0; i < self.board.projects().length; i++) {
                    if (self.board.projects()[i].sequenceNumber >= sequenceNumber) {
                        ++self.board.projects()[i].sequenceNumber;
                    }
                }
            }


            projectToUpdate.sequenceNumber = sequenceNumber;
            $("[project-id='" + projectId + "']").remove();
            self.board.projects.push(projectToUpdate);
            self.board.projects.sort(function(left, right) { return left.sequenceNumber == right.sequenceNumber ? 0 : (left.sequenceNumber < right.sequenceNumber ? -1 : 1) });
        },

        UpdateTask : function(taskId, statusId, sequenceNumber) {
            var task = self.findTask(taskId);
            var newStatus = self.findStatus(statusId);
            task.projectId = newStatus.projectId;
            task.statusId = newStatus.id;
            task.sequenceNumber = sequenceNumber;
            $("[task-id='" + taskId + "']").remove();
            newStatus.tasks.push(task);
        },

        UpdateSortable : function() {
            $(".sortable-status").sortable({
                connectWith: ".sortable-status",
                receive: function(event, ui) {
                    BoldRadiusKanban.SortingService.UpdateTask(ui.item.attr("task-id"), ui.item.parent().attr("status-id"));
                }
            });
            $(".sortable-status").disableSelection();
            $(".sortable-project").sortable({
                connectWith: ".sortable-project",
                receive: function(event, ui) {
                    var followerSequence = ui.item.next().attr("sequence-number");
                    var newSequence;
                    if (followerSequence != null) {
                        newSequence = parseInt(followerSequence) + 1;
                    } else {
                        newSequence = viewModel.board.projects().length;
                    }
                    BoldRadiusKanban.SortingService.UpdateProject(ui.item.attr("project-id"), newSequence);
                }
            });
            $(".sortable-project").disableSelection();
        }
    };

    })(SortingService = BoldRadiusKanban.SortingService || {});

})(BoldRadiusKanban = window.BoldRadiusKanban || {});