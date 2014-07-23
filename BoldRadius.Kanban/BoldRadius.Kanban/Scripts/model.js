
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
            id: BoldRadiusKanban.getNextClient(),
            name: "Project 1",
            statuses: [
                {
                    id: BoldRadiusKanban.getNextClient(),
                    name: "Ready",
                    projectId: BoldRadiusKanban.getNextClient(),
                    tasks: [
                        {
                            id: BoldRadiusKanban.getNextClient(),
                            name: "Name " + BoldRadiusKanban.getNextClient(),
                            description: "Project 1 Task 1",
                            statusId: BoldRadiusKanban.getNextClient(),
                            projectId: BoldRadiusKanban.getNextClient()
                        },
                        {
                            id: BoldRadiusKanban.getNextClient(),
                            name: "Name " + BoldRadiusKanban.getNextClient(),
                            description: "Project 1 Task 4",
                            statusId: BoldRadiusKanban.getNextClient(),
                            projectId: BoldRadiusKanban.getNextClient()
                        }
                    ]
                },
                {
                    id: BoldRadiusKanban.getNextClient(),
                    name: "Doing",
                    projectId: BoldRadiusKanban.getNextClient(),
                    tasks: [
                        {
                            id: BoldRadiusKanban.getNextClient(),
                            name: "Name " + BoldRadiusKanban.getNextClient(),
                            description: "Project 1 Task 2",
                            statusId: BoldRadiusKanban.getNextClient(),
                            projectId: BoldRadiusKanban.getNextClient()
                        },
                        {
                            id: BoldRadiusKanban.getNextClient(),
                            name: "Name " + BoldRadiusKanban.getNextClient(),
                            description: "Project 1 Task 5",
                            statusId: BoldRadiusKanban.getNextClient(),
                            projectId: BoldRadiusKanban.getNextClient()
                        },
                        {
                            id: BoldRadiusKanban.getNextClient(),
                            name: "Name " + BoldRadiusKanban.getNextClient(),
                            description: "Project 1 Task 6",
                            statusId: BoldRadiusKanban.getNextClient(),
                            projectId: BoldRadiusKanban.getNextClient()
                        }
                    ]
                },
                {
                    id: BoldRadiusKanban.getNextClient(),
                    name: "Done",
                    projectId: BoldRadiusKanban.getNextClient(),
                    tasks: [
                        {
                            id: BoldRadiusKanban.getNextClient(),
                            name: "Name " + BoldRadiusKanban.getNextClient(),
                            description: "Project 1 Task 3",
                            statusId: BoldRadiusKanban.getNextClient(),
                            projectId: BoldRadiusKanban.getNextClient()
                        }
                    ]
                }
            ]
        },
        {
            id: BoldRadiusKanban.getNextClient(),
            name: BoldRadiusKanban.getNextClient(),
            statuses: [
                {
                    id: BoldRadiusKanban.getNextClient(),
                    name: "Ready",
                    projectId: BoldRadiusKanban.getNextClient(),
                    tasks: [
                        {
                            id: BoldRadiusKanban.getNextClient(),
                            name: "Name " + BoldRadiusKanban.getNextClient(),
                            description: "Project 2 Task 1",
                            statusId: BoldRadiusKanban.getNextClient(),
                            projectId: BoldRadiusKanban.getNextClient()
                        }
                    ]
                },
                {
                    id: BoldRadiusKanban.getNextClient(),
                    name: "Doing",
                    projectId: BoldRadiusKanban.getNextClient(),
                    tasks: [
                        {
                            id: BoldRadiusKanban.getNextClient(),
                            name: "Name " + BoldRadiusKanban.getNextClient(),
                            description: "Project 2 Task 2",
                            statusId: BoldRadiusKanban.getNextClient(),
                            projectId: BoldRadiusKanban.getNextClient()
                        }
                    ]
                },
                {
                    id: BoldRadiusKanban.getNextClient(),
                    name: "Done",
                    projectId: BoldRadiusKanban.getNextClient(),
                    tasks: [
                        {
                            id: BoldRadiusKanban.getNextClient(),
                            name: "Name " + BoldRadiusKanban.getNextClient(),
                            description: "Project 2 Task 3",
                            statusId: BoldRadiusKanban.getNextClient(),
                            projectId: BoldRadiusKanban.getNextClient()
                        }
                    ]
                }
            ]
        }
    ],
    statuses: [
        { id: BoldRadiusKanban.getNextClient(), name: "Ready" },
        { id: BoldRadiusKanban.getNextClient(), name: "Doing" },
        { id: BoldRadiusKanban.getNextClient(), name: "Done" }
    ]
};