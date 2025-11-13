import DynamicRenderOverride from "../components/renderers/dynamicrenderOverride"
import { useEffect, useState } from "react";

export default function Preview() {
    useEffect(() => {
        window.addEventListener('message', (event) => {
            console.log("recieved message")
            setPageData(event.data)
        })
        console.log("Preview Child: Requesting Engagment")
        window.parent.postMessage("engage connection")
    }, [])

    const [pagedata, setPageData] = useState([] as any);
    if (pagedata.children) {
        return (
            <div className="min-w-screen">
                <div className="max-w-[1200px] m-auto p-4">
                    {DynamicRenderOverride(pagedata.children)}
                </div>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}