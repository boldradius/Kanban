/// <reference path="model.js" />
/// <reference path="knockout-3.1.0.js" />



 function KanbanViewModel(board) {

     var taskModalName = '#taskModal';
     var projectModalName = '#projectModal';

     var self = this;

     self.board = board;

     self.board.statuses = ko.observableArray(self.board.statuses);

     self.board.projects = ko.observableArray(self.board.projects);

     for (var i = 0; i < self.board.projects().length; i++) {

         var project = self.board.projects()[i];

         project.statuses = ko.observableArray(project.statuses);

         for (var j = 0; j < project.statuses().length; j++) {

             var status = project.statuses()[j];

             status.tasks = ko.observableArray(status.tasks);
         }
     }

     self.addStatus = function(name, sequenceNumber) {
         var status = BoldRadiusKanban.Model.Status(name, sequenceNumber);

         self.board.statuses.push(status);
     };

     self.observeTask = function(task) {
         task.name = ko.observable(task.name);
         task.description = ko.observable(task.description);
     };

     self.observeProject = function (thisProject) {
         thisProject.name = ko.observable(thisProject.name);
     };

     self.clearObservedTask = function(task) {
         task.name(null);
         task.description(null);
     };

     self.clearObservedProject = function (project) {
         project.name(null);
     };

     self.taskForModal = BoldRadiusKanban.Model.Task(null, null, 0, 0);
     self.statusForTaskModal = null;
     self.projectForTaskModal = null;
     self.observeTask(self.taskForModal);
     self.taskModalInEditMode = false;
     self.taskObjectForEdit = null;

     self.projectForModal = BoldRadiusKanban.Model.Project(null);
     self.observeProject(self.projectForModal);
     self.projectModalInEditMode = false;
     self.projectObjectForEdit = null;

     self.addTask = function(status, project) {
         self.taskModalInEditMode = false;

         self.statusForTaskModal = status;
         self.projectForTaskModal = project;

         self.clearObservedTask(self.taskForModal);

         $(taskModalName).modal({
             keyboard: false
         });
     };

     self.editTask = function (task, status, project) {
         self.taskModalInEditMode = true;
         self.taskObjectForEdit = task;

         self.statusForTaskModal = status;
         self.projectForTaskModal = project;

         self.taskForModal.name(task.name);
         self.taskForModal.description(task.description);


         $(taskModalName).modal({
             keyboard: false
         });
     };

     self.doneAddTask = function () {
         $(taskModalName).modal('hide');

         var status = self.statusForTaskModal;
         var project = self.projectForTaskModal;

         if (self.taskModalInEditMode) {
             self.taskObjectForEdit.name(self.taskForModal.name());
             self.taskObjectForEdit.description(self.taskForModal.description());
         } else {
             var task = BoldRadiusKanban.Model.Task(self.taskForModal.name(), self.taskForModal.description(), project.id, status.id);
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
             board.projects.push(project); //This line belongs in a 'model helper'
         }
     };

     self.updateStatus = function(taskId, statusId) {
         var task = self.findTask(taskId);
         var newStatus = self.findStatus(statusId);
         task.projectId = newStatus.projectId;
         task.statusId = newStatus.id;
         $("[task-id='" + taskId + "']").remove();
         newStatus.tasks.push(task);
     };

     self.findTask = function(taskId) {
         for (var i = 0; i < self.board.projects().length; i++) {
             for (var j = 0; j < self.board.projects()[i].statuses().length; j++) {
                 for (var k = 0; k < self.board.projects()[i].statuses()[j].tasks().length; k++) {
                     if (self.board.projects()[i].statuses()[j].tasks()[k].id == taskId) {
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
             project.statuses.push(status);
         }
     }

     return self;

};

