/// <reference path="model.js" />
/// <reference path="knockout-3.1.0.js" />



 function KanbanViewModel(board) {

     var taskModalName = '#taskModal';

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

     self.clearObservedTask = function(task) {
         task.name(null);
         task.description(null);
     };

     self.taskForModal = BoldRadiusKanban.Model.Task(null, null, 0, 0);
     self.statusForTaskModal = null;
     self.projectForTaskModal = null;
     self.observeTask(self.taskForModal);
     self.taskModalInEditMode = false;
     self.taskObjectForEdit = null;

     self.addTask = function(status, project) {
         
         self.statusForTaskModal = status;
         self.projectForTaskModal = project;

         self.clearObservedTask(self.taskForModal);

         $(taskModalName).modal({
             keyboard: false
         });
     };

     self.editTask = function (task, status, project) {
         self.statusForTaskModal = status;
         self.projectForTaskModal = project;

         self.taskForModal.name(task.name);
         self.taskForModal.description(task.description);

         self.taskObjectForEdit = task;

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



     self.addProject = function(name) {

         var project = BoldRadiusKanban.Model.Project(name);

         self.board.projects.push(project);
     };

     return self;

};

