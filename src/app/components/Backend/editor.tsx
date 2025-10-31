import dynamic from "next/dynamic";
import Library from "../library";
import { useEffect } from "react";

export default function BackendEditor({ pagedata, setPagedata }: { pagedata: any, setPagedata: any }) {
    useEffect(() => {
        console.log("loaded editor")
    }, [])

    if (!pagedata.children) {
        console.log("rerendering", pagedata)
        return <p>Select a page.</p>
    }

    function handleInputChange (event: any) {
        const target = event.target as HTMLInputElement | HTMLTextAreaElement;
        const pathStr = target.dataset.path;
        const prop = target.dataset.prop;
        if (!pathStr || !prop) return;

        const value = (target.type === "checkbox") ? String((target as HTMLInputElement).checked) : target.value;

        const newPagedata = JSON.parse(JSON.stringify(pagedata));

        const path: number[] = JSON.parse(pathStr);

        let node: any = newPagedata;
        for (const idx of path) {
            if (!node.children || !node.children[idx]) {
                console.warn("Invalid path while updating pagedata", path);
                return;
            }
            node = node.children[idx];
        }

        node.props = node.props || {};
        node.props[prop] = value;

        setPagedata(newPagedata);
    }

    function dynamicRenderTypes(parent: any, path: number[] = []): React.ReactNode {
        return parent.flatMap((component: any, index: number) => {
            const currentPath = [...path, index];
            const inputs: any = []
            const type = Library[component.componentTag][1];

            if (type.children) inputs.push(
                <textarea
                    key={`children-${currentPath.join("-")}`}
                    data-path={JSON.stringify(currentPath)}
                    data-prop="__children__"
                    placeholder="this element has children"
                    onChange={handleInputChange}
                />
            )

            inputs.push(...Object.entries(type.props).map(([propname, proptype]: any) => {
                return (
                    <div className="pb-1" key={`${component.componentTag}-${currentPath.join("-")}-${propname}`}>
                        <label className="p-1">{component.componentTag}</label>
                        <input
                            className="border-1"
                            placeholder={propname}
                            type="text"
                            data-path={JSON.stringify(currentPath)}
                            data-prop={propname}
                            value={component.props?.[propname] ?? ""}
                            onChange={handleInputChange}
                        /><br />
                    </div>
                )
            }))

            if (component.children && component.children.length) {
                inputs.push(
                    <div key={`children-wrap-${currentPath.join("-")}`}>
                        {dynamicRenderTypes(component.children, currentPath)}
                    </div>
                )
            }

            return inputs
        })
    }

    return (<div className="scroll">
        {dynamicRenderTypes(pagedata.children)}
    </div>);
}

const InputLibrary: any = {
    "short string": <input type="text" />,
}