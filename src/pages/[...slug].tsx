

// Import Component Libraries
import { useEffect, useState } from "react"
import StandardExports from "../app/components/Standard/Standard"

//import Standard_FeatureStacked from "../app/components/Standard/Feature/Stacked"

export default function Page() {
    const library: any = {
        ...StandardExports
    }

    const old_pagedata: any = {
        "pagesettings": {},
        "components": [
            {
                "componentname": "standard_featurestacked",
                "props": {
                    "title": "Welcome to Our Website",
                    "subtitle": "Your gateway to amazing content",
                    "backgroundImage": "https://example.com/images/homepage-bg.jpg",
                    "callToActionText": "Get Started",
                    "callToActionLink": "/get-started"
                },
                "children": []
            },
            {
                "componentname": "standard_introstacked",
                "props": {
                    "title": "Welcome to Our Website",
                    "subtitle": "Your gateway to amazing content",
                    "backgroundImage": "https://example.com/images/homepage-bg.jpg",
                    "callToActionText": "Get Started",
                    "callToActionLink": "/get-started"
                },
                "children": []
            }
        ]
    }

    const pagedata: any = {
        "children": [
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
                            "description": "This is a description.It descripts.Que mas quiere que te diga?"
                        }
                    }
                ],
                "props": {
                }
            }
        ]
    }

    useEffect(() => {console.log(library)}, [])

    function renderChildren(parent: any): React.ReactNode {
        console.log(`rendering parent:`, parent)
        return parent.map((component: any, index: number) => {
            const Tag = library[component.componentTag];
            return <Tag {...component.props}>
                {parent.map((child: any) => renderChildren(child.children))}
            </Tag>
        })
    }

    return (
        <div>
            <p>Beginning Render Here</p>
            {renderChildren(pagedata.children)}
            <p>Render Finished</p>
        </div>
    )
}