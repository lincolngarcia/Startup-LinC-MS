import DynamicRenderPreview from "../components/renderers/dyanmicrenderPreview"
import { useEffect, useState } from "react";
import Library from "../components/library/library";

export default function Preview() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [pagedata, setPageData] = useState([] as any);

    useEffect(() => {
        window.addEventListener('message', (event) => {
            console.log("recieved message", event)
            if (event.data.type === "pagedata") {
                setPageData(event.data.data)
            } else if (event.data.type === "activeSection") {
                setActiveIndex(event.data.data)
            }
        })
        console.log("Preview Child: Requesting Engagment")
        window.parent.postMessage("engage connection")
    }, [])

    function handleOverride(e: any) {
        e.preventDefault()
        const elementIndex = getTopLevelChildOfPreviewPane(e.target)
        setActiveIndex(elementIndex);
        if (elementIndex >= 0) window.parent.postMessage(elementIndex)
        else console.log("Clicked outside of preview pane children", elementIndex)
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


    if (pagedata.children) {
        return (
            <div className="">
                <div className="max-w-[1200px] m-auto p-4 cursor-pointer flex flex-col items-center bg-white" onClick={handleOverride}>
                    {Library[pagedata.menu][0]()}
                    <div className="w-full h-full" id="preview-pane">
                    {DynamicRenderPreview(pagedata.children, activeIndex)}
                    </div>
                </div>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}