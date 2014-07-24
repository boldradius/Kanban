/// <reference path="model.js" />
/// <reference path="knockout-3.1.0.js" />



 function KanbanViewModel(board) {

     var taskModalName = '#taskModal';
     var projectModalName = '#projectModal';

     var self = this;

     self.board = board;

     self.observeTask = function (task) {
         task.name = ko.observable(task.name);
         task.description = ko.observable(task.description);
         task.id = ko.observable(task.id);
         task.userId = ko.observable(task.userId);
     };

    

     self.board.statuses = ko.observableArray(self.board.statuses);

     self.board.projects = ko.observableArray(self.board.projects);

     for (var i = 0; i < self.board.projects().length; i++) {

         var project = self.board.projects()[i];

         project.statuses = ko.observableArray(project.statuses);

         for (var j = 0; j < project.statuses().length; j++) {

             var status = project.statuses()[j];

             for (var k = 0; k < status.tasks.length; k++) {

                 self.observeTask(status.tasks[k]);
             }

             status.tasks = ko.observableArray(status.tasks);
         }
     }

     self.addStatus = function(name, sequenceNumber) {
         var status = BoldRadiusKanban.Model.Status(name, sequenceNumber);

         self.board.statuses.push(status);
     };



     self.observeProject = function (thisProject) {
         thisProject.name = ko.observable(thisProject.name);
         thisProject.statuses = ko.observableArray(thisProject.statuses);
     };

     self.clearObservedTask = function(task) {
         task.name(null);
         task.description(null);
         task.id(null);
         task.userId(null);
     };

     self.clearObservedProject = function (clearProject) {
         clearProject.name(null);
     };

     
     self.taskForModal = BoldRadiusKanban.Model.Task(null, null, 0, 0);
     self.statusForTaskModal = null;
     self.projectForTaskModal = null;
     self.observeTask(self.taskForModal);
     self.taskModalInEditMode = ko.observable(false);
     self.taskObjectForEdit = null;

     self.projectForModal = BoldRadiusKanban.Model.Project(null);
     self.observeProject(self.projectForModal);
     self.projectModalInEditMode = false;
     self.projectObjectForEdit = null;

     self.addTask = function(status, project) {
         self.taskModalInEditMode(false);

         self.statusForTaskModal = status;
         self.projectForTaskModal = project;

         self.clearObservedTask(self.taskForModal);

         $(taskModalName).modal({
             keyboard: false
         });
     };

     self.editTask = function (task, status, project) {
         self.taskModalInEditMode(true);
         self.taskObjectForEdit = task;

         self.statusForTaskModal = status;
         self.projectForTaskModal = project;

         self.taskForModal.name(task.name());
         self.taskForModal.description(task.description());
         self.taskForModal.id(task.id());
         self.taskForModal.userId(task.userId());


         $(taskModalName).modal({
             keyboard: false
         });
     };

     self.doneAddTask = function () {
         $(taskModalName).modal('hide');

         var status = self.statusForTaskModal;
         var project = self.projectForTaskModal;

         if (self.taskModalInEditMode()) {
             self.taskObjectForEdit.name(self.taskForModal.name());
             self.taskObjectForEdit.description(self.taskForModal.description());
             self.taskObjectForEdit.userId(self.taskForModal.userId());
         } else {
             var task = BoldRadiusKanban.Model.Task(self.taskForModal.name(), self.taskForModal.description(), project.id, status.id);
             self.observeTask(task);
             status.tasks.push(task); //This line belongs in a 'model helper'
         }
     };



     self.addProjectClicked = function() {

         self.projectModalInEditMode = false;

         self.clearObservedProject(self.projectForModal);

         $(projectModalName).modal({
             keyboard: false
         });
     };

     self.doneAddProject = function () {
         $(projectModalName).modal('hide');

         if (self.projectModalInEditMode) {
             self.projectObjectForEdit.name(self.projectForModal.name());
             self.projectObjectForEdit.description(self.projectForModal.description());
         } else {
             var project = BoldRadiusKanban.Model.Project(self.projectForModal.name());
             self.addProjectStatuses(project, self.board.statuses());
             project.sequenceNumber = self.board.projects()[self.board.projects().length-1].sequenceNumber + 1;
             self.observeProject(project);
             board.projects.push(project); //This line belongs in a 'model helper'
         }
     };

     self.updateProject = function (projectId, sequenceNumber) {
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
         alert(projectToUpdate.sequenceNumber);
         self.board.projects.sort(function (left, right) { return left.sequenceNumber == right.sequenceNumber ? 0 : (left.sequenceNumber < right.sequenceNumber ? -1 : 1) });
     };

     self.updateTask = function(taskId, statusId, sequenceNumber) {
         var task = self.findTask(taskId);
         var newStatus = self.findStatus(statusId);
         task.projectId = newStatus.projectId;
         task.statusId = newStatus.id;
         task.sequenceNumber = sequenceNumber;
         $("[task-id='" + taskId + "']").remove();
         newStatus.tasks.push(task);
     };

     self.findTask = function(taskId) {
         for (var i = 0; i < self.board.projects().length; i++) {
             for (var j = 0; j < self.board.projects()[i].statuses().length; j++) {
                 for (var k = 0; k < self.board.projects()[i].statuses()[j].tasks().length; k++) {
                     if (self.board.projects()[i].statuses()[j].tasks()[k].id() == taskId) {
                         return self.board.projects()[i].statuses()[j].tasks()[k];
                     }
                 }
             }
         }
     };

     self.findStatus = function (statusId) {
         for (var i = 0; i < self.board.projects().length; i++) {
             for (var j = 0; j < self.board.projects()[i].statuses().length; j++) {
                 if (self.board.projects()[i].statuses()[j].id == statusId) {
                     return self.board.projects()[i].statuses()[j];
                 }
             }
         }
     };

     self.findProject = function(projectId) {
         for (var i = 0; i < self.board.projects().length; i++) {
             if (self.board.projects()[i].id == projectId) {
                 return self.board.projects()[i];
             }
         }
     };

     self.addProjectStatuses = function(project, statuses) {
         for (var i = 0; i < statuses.length; i++) {

             var status = BoldRadiusKanban.Model.Status(statuses[i].name, i);

             status.tasks = ko.observableArray(status.tasks);

             project.statuses.push(status);
         }
     };

     self.archiveTask = function (mytastk) {
         $(taskModalName).modal('hide');
         for (var i = 0; i < self.board.projects().length; i++) {
             for (var j = 0; j < self.board.projects()[i].statuses().length; j++) {
                 for (var k = 0; k < self.board.projects()[i].statuses()[j].tasks().length; k++) {
                     if (self.board.projects()[i].statuses()[j].tasks()[k].id() == mytastk()) {
                         self.board.projects()[i].statuses()[j].tasks.remove(self.board.projects()[i].statuses()[j].tasks()[k]);
                     }
                 }
             }
     }
         //tell server to archive task
     };

     self.updateSortable = function() {
         $(".sortable-status").sortable({
             connectWith: ".sortable-status",
             receive: function(event, ui) {
                 viewModel.updateTask(ui.item.attr("task-id"), ui.item.parent().attr("status-id"));
             }
         });
         $(".sortable-status").disableSelection();
         $(".sortable-project").sortable({
             connectWith: ".sortable-project",
             receive: function (event, ui) {
                 var followerSequence = ui.item.next().attr("sequence-number");
                 var newSequence;
                 if (followerSequence != null) {
                     newSequence = parseInt(followerSequence) + 1;
                 } else {
                     newSequence = viewModel.board.projects().length;
                 }
                 viewModel.updateProject(ui.item.attr("project-id"), newSequence);
             }
         });
         $(".sortable-project").disableSelection();
     };

     return self;

};

