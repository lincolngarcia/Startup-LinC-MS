import Library from "../library/library"

export default function DyanmicRenderOverride(parent: any, parentKey = "component"): React.ReactNode {
    function handleClick(e: any, key:any) {
            e.preventDefault()
            window.parent.postMessage(key)
    }

    return parent.map((component: any, index: number) => {
        if (component.componentTag) {
            const Tag = Library[component.componentTag][0];
            const key = `${parentKey}-${index}`;
            if (Tag) {
                return <Tag key={key} {...component.props}>
                   <div onClick={(e) => handleClick(e, key)} className="w-full h-full cursor-pointer">
                        {DyanmicRenderOverride(component.children, key)}
                    </div>
                </Tag>
            }
        } else if (component.content) {
            return component.content
        }
    })
}