
(function (BoldRadiusKanban) {

    BoldRadiusKanban.currentClientId = 0;

    BoldRadiusKanban.getNextClient = function() {

        return "client_" + ++BoldRadiusKanban.currentClientId;
    };

    BoldRadiusKanban.Model = {
        Status: function(name, sequencyNumber) {

            return {
                id: BoldRadiusKanban.getNextClient(),
                name: name,
                sequenceNumber: sequencyNumber,
                tasks: []
            };
        },

        Project: function(name) {

            return {
                id: BoldRadiusKanban.getNextClient(),
                name: name,
                statuses:[]
            };
        },

        Task: function(name, description, projectId, statusId) {
            return {
                id: BoldRadiusKanban.getNextClient(),
                name: name,
                description: description,
                projectId: projectId,
                statusId: statusId
            };
        }
    };

})(BoldRadiusKanban = window.BoldRadiusKanban || {});
