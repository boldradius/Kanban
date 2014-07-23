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
     self.statusForTaskModel = null;
     self.projectForTaskModel = null;
     self.observeTask(self.taskForModal);

     self.addTask = function(status, project) {

         self.statusForTaskModel = status;
         self.projectForTaskModel = project;
         self.clearObservedTask(self.taskForModal);

         //TODO: model popup to get data

         $(taskModalName).modal({
             keyboard: false
         });
     };

     self.doneAddTask = function () {
         $(taskModalName).modal('hide');

         var status = self.statusForTaskModel;
         var project = self.projectForTaskModel;

         var task = BoldRadiusKanban.Model.Task(self.taskForModal.name(), self.taskForModal.description(), project.client_id, status.client_id);

         status.tasks.push(task); //This line belongs in a 'model helper'
     };

     self.editTask = function (status, project) {

         //TODO: model popup to get data

         $(taskModalName).modal({
             keyboard: false
         });
     };

     self.addProject = function(name) {

         var project = BoldRadiusKanban.Model.Project(name);

         self.board.projects.push(project);
     };

     self.updateStatus = function(taskId, statusId) {
         var task = self.findTask(taskId);
         var status = self.findStatus(statusId);
         var alertString = "Task Project Id: " + task.projectId + " Status Project Id: " + status.projectId;
         alert(alertString);
     };

     self.findTask = function(taskId) {
         for (var i = 0; i < self.board.projects().length; i++) {
             for (var j = 0; j < self.board.projects()[i].statuses().length; j++) {
                 for (var k = 0; k < self.board.projects()[i].statuses()[j].tasks().length; k++) {
                     if (self.board.projects()[i].statuses()[j].tasks()[k].client_id == taskId) {
                         return self.board.projects()[i].statuses()[j].tasks()[k];
                     }
                 }
             }
         }
     };

     self.findStatus = function (statusId) {
         for (var i = 0; i < self.board.projects().length; i++) {
             for (var j = 0; j < self.board.projects()[i].statuses().length; j++) {
                 if (self.board.projects()[i].statuses()[j].client_id == statusId) {
                     return self.board.projects()[i].statuses()[j];
                 }
             }
         }
     };

     return self;

};

