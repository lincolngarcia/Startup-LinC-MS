<<<<<<< HEAD
=======
"use client";

>>>>>>> fe89115e7885ce53467a022bf75a3bb66ff6884f
// Import Component Libraries
import { useEffect, useState } from "react"

import DynamicRender from "@/src/app/components/Backend/Helpers/dyanmicrender"

import pagedata from "@/database/_.json"

<<<<<<< HEAD
import RootLayout from "../../pages/layout"
=======
import RootLayout from "@/src/app/layout"
>>>>>>> fe89115e7885ce53467a022bf75a3bb66ff6884f
import "../../app/global.css"

export default function Page() {
    return (
        <div className="min-w-screen">
            <div className="max-w-[1200px] m-auto p-4">
                {DynamicRender(pagedata.children)}
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
