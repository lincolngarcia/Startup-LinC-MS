import Library from "@/src/app/components/library";

export default function DyanmicRender(parent: any, parentKey = "component"): React.ReactNode {
    return parent.map((component: any, index: number) => {
        if (component.componentTag) {
            console.log(`found a tag: ${component.componentTag}`)
            const Tag = Library[component.componentTag][0];
            const key = `${parentKey}-${index}`;
            console.log(`key is ${key}`);
            console.log(`tagName is ${component.componentTag}`)
            if (Tag) {
                return <Tag key={key} {...component.props}>
                    {DyanmicRender(component.children, key)}
                </Tag>
            }
        }else if (component.content) {
            console.log(`content found: ${component.content}`);
            return component.content
        }
    })
}