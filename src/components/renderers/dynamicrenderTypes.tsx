import Library from "../library/library";

export default function dynamicRenderTypes(parent: any, path: number[], handleInputChange: any): React.ReactNode {
    console.log("iam", parent)
    const inputs = []
    if (parent.componentTag) {
        const type = Library[parent.componentTag][1];
        console.log(type)
        Object.entries(type.props).map(([propname, prototype]: any) => {
            inputs.push(
                <div className="pb-1 whitespace-nowrap overflow-hidden" key={`${parent.componentTag}-${path}-${propname}`}>
                    <input
                        className="border"
                        placeholder={propname}
                        type="text"
                        data-path={JSON.stringify(path)}
                        data-prop={propname}
                        value={parent.props[propname]}
                        onChange={handleInputChange}
                    />
                    <label className="p-1 overflow-hidden">{Library[parent.componentTag][2]}</label>
                    <br /> {/*is this neccessary*/}
                </div>
            )
        })
    }

    if (parent.content) {
        inputs.push(
            <div className="pb-1 whitespace-nowrap overflow-hidden" key={`content-${path.join("-")}`}>
                <input
                    className="border"
                    placeholder="text"
                    type="text"
                    data-path={JSON.stringify(path)}
                    data-prop="text"
                    value={parent.content}
                    onChange={handleInputChange}
                />
                <label className="p-1">Text</label>
                <br />
            </div>
        )
    }

    if (parent.children && parent.children.length) {
        inputs.push(
            <div key={`children-wrap-${path.join("-")}`}>
                {
                    parent.children.map((child: any, index: any) => {
                        inputs.push(dynamicRenderTypes(child, [...path, index], handleInputChange))
                    })
                }
            </div>
        )
    }

    return inputs.flatMap(x => x)

    /*
    return parent.flatMap((component: any, index: number) => {

        const currentPath = [...path, index];
        const inputs: any = []

        if (component.componentTag) {
            const type = Library[component.componentTag][1];
            inputs.push(...Object.entries(type.props).map(([propname, proptype]: any) => {
                return (
                    <div className="pb-1 whitespace-nowrap overflow-hidden" key={`${component.componentTag}-${currentPath.join("-")}-${propname}`}>
                        <input
                            className="border"
                            placeholder={propname}
                            type="text"
                            data-path={JSON.stringify(currentPath)}
                            data-prop={propname}
                            value={component.props?.[propname] ?? ""}
                            onChange={handleInputChange}
                        />
                        <label className="p-1 overflow-hidden">{Library[component.componentTag][2]}</label>
                        <br />
                    </div>
                )
            }))
        }

        if (Object.keys(component).includes("content")) {
            return (
                <div className="pb-1 whitespace-nowrap overflow-hidden" key={`content-${currentPath.join("-")}`}>
                    <input
                        className="border"
                        placeholder="text"
                        type="text"
                        data-path={JSON.stringify(currentPath)}
                        data-prop="text"
                        value={component.content}
                        onChange={handleInputChange}
                    />
                    <label className="p-1">Text</label>
                    <br />
                </div>
            )
        }

        if (component.children && component.children.length) {
            inputs.push(
                <div key={`children-wrap-${currentPath.join("-")}`}>
                    {dynamicRenderTypes(component.children, currentPath, handleInputChange)}
                </div>
            )
        }

        return inputs
    })
        */
}