
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
                sequenceNumber: sequencyNumber
            };
        },

        Project: function(name) {

            return {
                id: BoldRadiusKanban.getNextClient(),
                name: name,
                tasks: []
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



var board = {
    projects: [
        {
            id: "client_1",
            name: "Project 1",
            statuses: [
                {
                    id: "client_2",
                    name: "Ready",
                    tasks: [
                        {
                            id: "client_3",
                            description: "Project 1 Task 1"
                        },
                        {
                            id: "client_4",
                            description: "Project 1 Task 4"
                        }
                    ]
                },
                {
                    id: "client_5",
                    name: "Doing",
                    tasks: [
                        {
                            id: "client_6",
                            description: "Project 1 Task 2"
                        },
                        {
                            id: "client_7",
                            description: "Project 1 Task 5"
                        },
                        {
                            id: "client_16",
                            description: "Project 1 Task 6"
                        }
                    ]
                },
                {
                    id: "client_8",
                    name: "Done",
                    tasks: [
                        {
                            id: "client_10",
                            description: "Project 1 Task 3"
                        }
                    ]
                }
            ]
        },
        {
            id: "client_9",
            name: "Project 2",
            statuses: [
                {
                    id: "client_11",
                    name: "Ready",
                    tasks: [
                        {
                            id: "client_12",
                            description: "Project 2 Task 1"
                        }
                    ]
                },
                {
                    id: "client_13",
                    name: "Doing",
                    tasks: [
                        {
                            id: "client_14",
                            description: "Project 2 Task 2"
                        }
                    ]
                },
                {
                    id: "client_15",
                    name: "Done",
                    tasks: [
                        {
                            id: "client_16",
                            description: "Project 2 Task 3"
                        }
                    ]
                }
            ]
        }
    ],
    statuses: [
        { id: "client_17", name: "Ready" },
        { id: "client_18", name: "Doing" },
        { id: "client_19", name: "Done" }
    ]
};