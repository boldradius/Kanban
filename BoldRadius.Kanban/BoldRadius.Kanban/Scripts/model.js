
(function (BoldRadiusKanban) {

    BoldRadiusKanban.Model = {
        Status: function(name, sequencyNumber) {

            return {
                id: null,
                name: name,
                sequenceNumber: sequencyNumber
            };
        },

        Project: function(name) {

            return {
                id: null,
                name: name,
                tasks: []
            };
        },

        Task: function(name, description, projectId, statusId) {
            return {
                id: null,
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
            name: "Project 1",
            statuses: [
                {
                    name: "Ready",
                    tasks: [
                        {
                            description: "Project 1 Task 1"
                        },
                        {
                            description: "Project 1 Task 4"
                        }
                    ]
                },
                {
                    name: "Doing",
                    tasks: [
                        {
                            description: "Project 1 Task 2"
                        },
                        {
                            description: "Project 1 Task 5"
                        },
                        {
                            description: "Project 1 Task 6"
                        }
                    ]
                },
                {
                    name: "Done",
                    tasks: [
                        {
                            description: "Project 1 Task 3"
                        }
                    ]
                }
            ]
        },
        {
            name: "Project 2",
            statuses: [
                {
                    name: "Ready",
                    tasks: [
                        {
                            description: "Project 2 Task 1"
                        }
                    ]
                },
                {
                    name: "Doing",
                    tasks: [
                        {
                            description: "Project 2 Task 2"
                        }
                    ]
                },
                {
                    name: "Done",
                    tasks: [
                        {
                            description: "Project 2 Task 3"
                        }
                    ]
                }
            ]
        }
    ],
    statuses: [
        { name: "Ready" },
        { name: "Doing" },
        { name: "Done" }
    ]
};