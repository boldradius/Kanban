
(function (BoldRadiusKanban) {

    BoldRadiusKanban.currentClientId = 0;

    BoldRadiusKanban.getNextClient = function() {

        return "client_" + ++BoldRadiusKanban.currentClientId;
    };

    BoldRadiusKanban.Model = {
        Status: function(name, sequencyNumber) {

            return {
                client_id: BoldRadiusKanban.getNextClient(),
                name: name,
                sequenceNumber: sequencyNumber
            };
        },

        Project: function(name) {

            return {
                client_id: BoldRadiusKanban.getNextClient(),
                name: name,
                tasks: []
            };
        },

        Task: function(name, description, projectId, statusId) {
            return {
                client_id: BoldRadiusKanban.getNextClient(),
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
            client_id: "client_1",
            name: "Project 1",
            statuses: [
                {
                    client_id: "client_2",
                    name: "Ready",
                    tasks: [
                        {
                            client_id: "client_3",
                            description: "Project 1 Task 1"
                        },
                        {
                            client_id: "client_4",
                            description: "Project 1 Task 4"
                        }
                    ]
                },
                {
                    client_id: "client_5",
                    name: "Doing",
                    tasks: [
                        {
                            client_id: "client_6",
                            description: "Project 1 Task 2"
                        },
                        {
                            client_id: "client_7",
                            description: "Project 1 Task 5"
                        },
                        {
                            client_id: "client_16",
                            description: "Project 1 Task 6"
                        }
                    ]
                },
                {
                    client_id: "client_8",
                    name: "Done",
                    tasks: [
                        {
                            client_id: "client_10",
                            description: "Project 1 Task 3"
                        }
                    ]
                }
            ]
        },
        {
            client_id: "client_9",
            name: "Project 2",
            statuses: [
                {
                    client_id: "client_11",
                    name: "Ready",
                    tasks: [
                        {
                            client_id: "client_12",
                            description: "Project 2 Task 1"
                        }
                    ]
                },
                {
                    client_id: "client_13",
                    name: "Doing",
                    tasks: [
                        {
                            client_id: "client_14",
                            description: "Project 2 Task 2"
                        }
                    ]
                },
                {
                    client_id: "client_15",
                    name: "Done",
                    tasks: [
                        {
                            client_id: "client_16",
                            description: "Project 2 Task 3"
                        }
                    ]
                }
            ]
        }
    ],
    statuses: [
        { client_id: "client_17", name: "Ready" },
        { client_id: "client_18", name: "Doing" },
        { client_id: "client_19", name: "Done" }
    ]
};