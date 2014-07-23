/// <reference path="model.js" />
/// <reference path="knockout-3.1.0.js" />



 function KanbanViewModel(board) {

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

     self.add_status = function(name, sequenceNumber) {
         var status = BoldRadiusKanban.Model.Status(name, sequenceNumber);

         self.board.statuses.push(status);
     };

     self.add_task = function(status, project) {

         //TODO: model popup to get data

         $('#myModal').modal({
             keyboard: false
         });

         var task = BoldRadiusKanban.Model.Task("new task", "new task description", project.id, status.id);

         status.tasks.push(task); //This line belongs in a 'model helper'
     };

     self.edit_task = function (status, project) {

         //TODO: model popup to get data

         $('#myModal').modal({
             keyboard: false
         });
     };

     self.add_project = function(name) {

         var project = BoldRadiusKanban.Model.Project(name);

         self.board.projects.push(project);
     };

     return self;

};

