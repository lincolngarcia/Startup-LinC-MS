import Library from "../library/library";

export default function dynamicRenderTypes(parent: any, path: number[], handleInputChange: any): React.ReactNode {
    console.log("iam", parent)
    const inputs = []
    if (parent.componentTag) {
        const type = Library[parent.componentTag][1];
        console.log(type)
        Object.entries(type.props).map(([propname, prototype]: any) => {
            // Find out if the prototype exists in the regular libary
            // TODO: dynamic typing
            console.log(propname, prototype)
            inputs.push(InputLibrary[prototype](propname, prototype, parent, path, handleInputChange) || null);
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
}


const InputLibrary: any = {
    "short string": (propname: any, prototype: any, parent: any, path: any, handleInputChange: any) => (
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
    </div>),
    "array of short string": (propname: any, prototype: any, parent: any, path: any, handleInputChange: any) => (
        <div>This is where the bullet list should come in</div>
    )
}