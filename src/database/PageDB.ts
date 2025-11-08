const PageDB:any = {
    "/": {
        "title": "Homepage",
        "children": [
            {
                "componentTag": "div",
                "children": [
                    {
                        "componentTag": "div",
                        "children": [
                            {
                                "content": "Welcome to Startup LinC"
                            }
                        ]
                    },
                    {
                        "componentTag": "a",
                        "children": [
                            {
                                "content": "Log In"
                            }
                        ],
                        "props": {
                            "href": "/login",
                            "className": "text-adminBlue"
                        }
                    }
                ],
                "props": {
                    "className": "flex w-full justify-between"
                }
            },
            {
                "componentTag": "standard_featurestacked",
                "children": [
                    {
                        "componentTag": "standard_featurestackedcard",
                        "children": [],
                        "props": {
                            "image": "/content-image.jpeg",
                            "title": "Welcome to the Homepage",
                            "action": "Learn more",
                            "description": "This is a description.It descripts.Que mas quiere que te diga?"
                        }
                    },
                    {
                        "componentTag": "standard_featurestackedcard",
                        "children": [],
                        "props": {
                            "image": "/content-image.jpeg",
                            "title": "Welcome to the Homepage",
                            "action": "Learn more",
                            "description": "This is a description.It descripts.Que mas quiere que te diga?",
                            "data-test": "yes"
                        }
                    }
                ],
                "props": {}
            },
            {
                "componentTag": "a",
                "children": [
                    {
                        "content": "Link to Github"
                    }
                ],
                "props": {
                    "href": "https://github.com/lincolngarcia/Startup-LinC-MS",
                    "className": "text-adminBlue"
                }
            }
        ]
    }
}

export default PageDB