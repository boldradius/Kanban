/// <reference path="model.js" />
/// <reference path="knockout-3.1.0.js" />



 function KanbanViewModel(board) {

     var self = this;

     self.board = board;

     //self.board.statuses = ko.observableArray([]);

     self.add_status = function(name, sequenceNumber) {
         var status = BoldRadiusKanban.Model.Status(name, sequenceNumber);

         self.board.statuses.push(status);
     };

     self.add_task = function(data, event) {

     };

     self.add_project = function(name) {

         var project = BoldRadiusKanban.Model.Project(name);

         self.board.projects.push(project);
     };

     return self;

};

