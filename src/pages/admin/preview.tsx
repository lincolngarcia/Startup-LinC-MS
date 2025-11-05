<<<<<<< HEAD
import RootLayout from "../layout";
=======
import RootLayout from "@/src/app/layout";
>>>>>>> fe89115e7885ce53467a022bf75a3bb66ff6884f
import DynamicRender from "@/src/app/components/Backend/Helpers/dyanmicrender";
import { useEffect, useState } from "react";

export default function Page() {
    useEffect(() => {
        window.addEventListener('message', (event) => {
            setPageData(event.data)
        })
    }, [])

    const [pagedata, setPageData] = useState([] as any);

    if (pagedata.children) {
        return (
            <div className="min-w-screen">
                <div className="max-w-[1200px] m-auto p-4">
                    {DynamicRender(pagedata.children)}
                </div>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}
Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}