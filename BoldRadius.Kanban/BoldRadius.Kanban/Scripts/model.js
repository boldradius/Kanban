
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

        Project: function(name, sequencyNumber) {

            return {
                id: BoldRadiusKanban.getNextClient(),
                name: name,
                sequenceNumber: sequencyNumber,
                statuses:[]
            };
        },

        Task: function(name, description, projectId, statusId, sequencyNumber) {
            return {
                id: BoldRadiusKanban.getNextClient(),
                name: name,
                description: description,
                projectId: projectId,
                statusId: statusId,
                sequenceNumber: sequencyNumber,
                userId: 0,
                userColour: "#CCCCCC"
            };
        },

        User: function(displayName, colourHex) {
            return {
                id: BoldRadiusKanban.getNextClient(),
                displayName: displayName,
                colourHex: colourHex
            };
        }
    };

})(BoldRadiusKanban = window.BoldRadiusKanban || {});
