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
    "array of short string": (propname: any, prototype: any, parent: any, path: any, handleInputChange: any) => {
        const values: string[] = (parent.props && Array.isArray(parent.props[propname])) ? parent.props[propname] : [];

        const emit = (newValues: string[]) => {
            // create a synthetic event shaped like the real onChange handler expects
            const e: any = {
                target: {
                    dataset: { path: JSON.stringify(path), prop: propname },
                    value: newValues
                }
            };
            handleInputChange(e);
        };

        const setAt = (index: number, val: string) => {
            const next = values.slice();
            next[index] = val;
            emit(next);
        };

        const add = () => emit([...values, ""]);
        const removeAt = (index: number) => emit(values.filter((_, i) => i !== index));

        return (
            <div className="pb-1 whitespace-nowrap overflow-hidden" key={`${parent.componentTag}-${path}-${propname}`}>
                <ul id={`${parent.componentTag}-${path}-${propname}-ul`}>
                    <li>
                        {`${propname} `}
                        <button className="border p-1" onClick={add}>+</button>
                    </li>

                    {values.map((val: string, idx: number) => (
                        <li key={`${parent.componentTag}-${path}-${propname}-item-${idx}`}>
                            <input
                                className="border"
                                placeholder={`${propname} item`}
                                type="text"
                                data-path={JSON.stringify(path)}
                                data-prop={propname}
                                data-index={idx}
                                value={val}
                                onChange={(ev: any) => setAt(idx, ev.target.value)}
                            />
                            <button className="border p-1" onClick={() => removeAt(idx)}>–</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}