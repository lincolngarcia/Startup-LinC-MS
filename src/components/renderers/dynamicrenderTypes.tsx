import Library from "../library/library";

export default function dynamicRenderTypes(parent: any, path: number[] = [], handleInputChange: any): React.ReactNode {
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
}