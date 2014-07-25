(function (DataAccess) {

    DataAccess.loadBoard = function () {
        //Fetch the board from the data source.
        //Map the board data to the expected model object.
    };

    DataAccess.createTask = function (task) {
        //Map task to data source object.
        //Post to data source.
        //Return updated task object.
    };

    DataAccess.updateTask = function(task) {
        //Map task to data source object.
        //Post to data source.
        //Return updated task object.
    };

    DataAccess.deleteTask = function(taskId) {
        //Post to data source.
    };

    DataAccess.createProject = function(project) {
        //Map to data source object.
        //Post to data source.
        //Return updated project object.
    };

    DataAccess.updateTaskSequence = function(tasks) {
        //Map to data source object.
        //Post to data source.
    };

    DataAccess.updateProjectSequence = function(projects) {
        //Map to data source object.
        //Post to data source.
    };

})(DataAccess = window.DataAccess || {});