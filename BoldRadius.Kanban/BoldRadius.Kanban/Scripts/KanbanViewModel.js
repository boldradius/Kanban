

var KanbanViewModel = {

    board: {
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
                },
            ]
    }
};

ko.applyBindings(KanbanViewModel);