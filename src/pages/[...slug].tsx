

// Import Component Libraries
import { useEffect, useState } from "react"
import StandardExports from "../app/components/Standard/Standard"

import pagedata from "@/database/homepage.json"

import RootLayout from "./layout"
import "../app/global.css"

export default function Page() {
    const library: any = {
        ...StandardExports
    }

    function renderChildren(parent: any): React.ReactNode {
        console.log(`rendering parent:`, parent)
        return parent.map((component: any, index: number) => {
            const Tag = library[component.componentTag];

            if (Tag) {
                return <Tag {...component.props}>
                    {parent.map((child: any) => renderChildren(child.children))}
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
