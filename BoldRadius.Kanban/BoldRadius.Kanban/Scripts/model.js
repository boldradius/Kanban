
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
            id: 1,
            name: "Project 1",
            statuses: [
                {
                    id: 2,
                    name: "Ready",
                    projectId: 1,
                    tasks: [
                        {
                            id: 3,
                            name: "Name " + 3,
                            description: "Project 1 Task 1",
                            statusId: 2,
                            projectId: 1
                        },
                        {
                            id: 4,
                            name: "Name " + 4,
                            description: "Project 1 Task 4",
                            statusId: 2,
                            projectId: 1
                        }
                    ]
                },
                {
                    id: 5,
                    name: "Doing",
                    projectId: 1,
                    tasks: [
                        {
                            id: 6,
                            name: "Name " + 6,
                            description: "Project 1 Task 2",
                            statusId: 5,
                            projectId: 1
                        },
                        {
                            id: 7,
                            name: "Name " + 7,
                            description: "Project 1 Task 5",
                            statusId: 5,
                            projectId: 1
                        },
                        {
                            id: 8,
                            name: "Name " + 8,
                            description: "Project 1 Task 6",
                            statusId: 5,
                            projectId: 1
                        }
                    ]
                },
                {
                    id: 9,
                    name: "Done",
                    projectId: 1,
                    tasks: [
                        {
                            id: 10,
                            name: "Name " + 10,
                            description: "Project 1 Task 3",
                            statusId: 9,
                            projectId: 1
                        }
                    ]
                }
            ]
        },
        {
            id: 11,
            name: "Project 2",
            statuses: [
                {
                    id: 12,
                    name: "Ready",
                    projectId: 11,
                    tasks: [
                        {
                            id: 13,
                            name: "Name " + 13,
                            description: "Project 2 Task 1",
                            statusId: 12,
                            projectId: 11
                        }
                    ]
                },
                {
                    id: 14,
                    name: "Doing",
                    projectId: 11,
                    tasks: [
                        {
                            id: 15,
                            name: "Name " + 15,
                            description: "Project 2 Task 2",
                            statusId: 14,
                            projectId: 11
                        }
                    ]
                },
                {
                    id: 16,
                    name: "Done",
                    projectId: 11,
                    tasks: [
                        {
                            id: 17,
                            name: "Name " + 17,
                            description: "Project 2 Task 3",
                            statusId: 16,
                            projectId: 11
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