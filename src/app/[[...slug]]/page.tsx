

// Import Component Libraries
import { useEffect, useState } from "react"
import StandardExports from "../components/Standard/Standard"

import pagedata from "@/database/_.json"

import RootLayout from "../../pages/layout"
import "../../app/global.css"

export default function Page() {
    const library: any = {
        ...StandardExports
    }

    function renderChildren(parent: any, parentKey="component-"): React.ReactNode {
        console.log(`rendering parent:`, parent)
        return parent.map((component: any, index: number) => {
            const Tag = library[component.componentTag];
            const key = `${parentKey}-${index}`;
            if (Tag) {
                return <Tag key={key} {...component.props}>
                    {parent.map((child: any) => renderChildren(child.children, key))}
                </Tag>
            }
        })
    }

    return (
        <div className="min-w-screen">
            <div className="max-w-[1200px] m-auto p-4">
                {renderChildren(pagedata.children)}
            </div>
        </div>
    )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}
