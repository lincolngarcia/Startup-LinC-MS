import Library from "@/src/app/components/library";

export default function DyanmicRender(parent: any, parentKey="component-"): React.ReactNode {
    return parent.map((component: any, index: number) => {
        const Tag = Library[component.componentTag][0];
        const key = `${parentKey}-${index}`;
        if (Tag) {
            return <Tag key={key} {...component.props}>
                {parent.map((child: any) => DyanmicRender(child.children, key))}
            </Tag>
        }
    })
}