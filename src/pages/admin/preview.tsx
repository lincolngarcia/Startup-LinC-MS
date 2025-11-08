import AdminLayout from '@/src/pages/layout';
import DynamicRender from "@/src/app/components/Backend/Helpers/dyanmicrender";
import { useEffect, useState } from "react";

export default function Page() {
    useEffect(() => {
        window.addEventListener('message', (event) => {
            console.log("page data recieved", event)
            setPageData(event.data)
        })
        console.log("sending engagement message")
        window.parent.postMessage("engage connection")
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
        console.log("pagedata", pagedata)
        return <div>Loading...</div>
    }
}

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <AdminLayout>
            {page}
        </AdminLayout>
    )
}