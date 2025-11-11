import Library from "../library/library"

export default function DyanmicRender(parent: any, parentKey = "component"): React.ReactNode {
    return parent.map((component: any, index: number) => {
        if (component.componentTag) {
            const Tag = Library[component.componentTag][0];
            const key = `${parentKey}-${index}`;
            if (Tag) {
                return <Tag key={key} {...component.props}>
                    {DyanmicRender(component.children, key)}
                </Tag>
            }
        }else if (component.content) {
            return component.content
        }
    })
}