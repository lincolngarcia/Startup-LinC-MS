import { useState } from "react";
import dynamicRenderTypes from "../renderers/dynamicrenderTypes";

export default function BackendEditor({ context }: { context: any }) {
    const pagedata = context.pagedata

    function updatePage(newData: any) {
        context.setPagedata(newData);
        fetch("/api/pages", {
            method: "post",
            body: JSON.stringify(newData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    if (!pagedata || pagedata.children.length === 0) {
        return <p>Select a page.</p>
    }

    return (
        <div className="scroll">
            {dynamicRenderTypes(pagedata.children, [], handleInputChange)}
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