import { useState } from "react";
import dynamicRenderTypes from "../renderers/dynamicrenderTypes";

export default function BackendEditor({ context }: { context: any }) {
    console.log(context.activeSection)

    const pagedata = context.pagedata
    const activeSection = context.activeSection.split("-")[1]
    const subChildren = pagedata.children[activeSection].children || []

    function createInputUpdateHandler() {
        let activeRequest:any = false;   // Promise of the active fetch
        let nextData: any = null;        // Holds data for the next queued request
        let nextScheduled = false;  // Whether a next request is scheduled

        async function sendRequest(data: any) {
            try { 
                activeRequest = fetch("/api/pages", {
                    method: "post",
                    body: JSON.stringify(data),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })

                await activeRequest;
            } catch (err) {
                console.error("Fetch failed:", err);
            } finally {
                activeRequest = null;

                // If there’s a next request scheduled, trigger it
                if (nextScheduled) {
                    const dataToSend = nextData;
                    nextData = null;
                    nextScheduled = false;
                    sendRequest(dataToSend);
                }
            }
        }

        return function onInputChange(data: any) {
            context.setPagedata(data)
            // Case 1: No active request → send immediately
            if (!activeRequest) {
                sendRequest(data);
                return;
            }

            // Case 2: Active request but no next scheduled → queue one
            if (!nextScheduled) {
                nextData = data;
                nextScheduled = true;
                return;
            }

            // Case 3: Active request and next scheduled → update the next data
            nextData = data;
        };
    }

    const [updatePage, setUpdatePage] = useState(() => createInputUpdateHandler())

    if (!pagedata || pagedata.children.length === 0) {
        return <p>Select a page.</p>
    }

    return (
        <div className="scroll">
            {dynamicRenderTypes(subChildren, [], handleInputChange)}
        </div>
    );

    function handleInputChange(event: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;
        const pathStr = target.dataset.path;
        const prop = target.dataset.prop;

        if (!pathStr || !prop) return;

        const value = (target.type === "checkbox") ? String((target as HTMLInputElement).checked) : target.value;

        const newPagedata = { ...pagedata };

        const path: number[] = JSON.parse(pathStr);

        let node: any = newPagedata;
        for (const idx of path) {
            if (!node.children || !node.children[idx]) {
                console.warn("Invalid path while updating pagedata", path);
                return;
            }
            node = node.children[idx];
        }

        if (node.props) {
            node.props = node.props || {};
            node.props[prop] = value;
        } else if (node.content || node.content === "") {
            node.content = value
        }

        updatePage(newPagedata);
    }
}

const InputLibrary: any = {
    "short string": <input type="text" />,
}