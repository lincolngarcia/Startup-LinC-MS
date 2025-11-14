import DynamicRenderPreview from "../components/renderers/dyanmicrenderPreview"
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

    function handleOverride(e: any) {
        e.preventDefault()
        const elementIndex = getTopLevelChildOfPreviewPane(e.target)
        if (elementIndex >= 0) window.parent.postMessage(elementIndex)
    }

    function getTopLevelChildOfPreviewPane(element: any): number {
        const root = document.getElementById("preview-pane");
        if (!root || !root.contains(element)) return -1;

        let current = element;
        let parent = element.parentElement;

        // Climb up until the next parent would not be inside #preview-pane
        while (parent && parent !== root) {
            current = parent;
            parent = parent.parentElement;
        }

        return Array.prototype.indexOf.call(root.children, current);
    }

    const [pagedata, setPageData] = useState([] as any);
    if (pagedata.children) {
        return (
            <div className="min-w-screen">
                <div className="max-w-[1200px] m-auto p-4 cursor-pointer" id="preview-pane" onClick={handleOverride}>
                    {DynamicRenderPreview(pagedata.children)}
                </div>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}