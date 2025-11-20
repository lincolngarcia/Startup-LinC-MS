import Library from "../library/library"

export default function DyanmicRenderPreview(parent: any, activeIndex: number, parentKey = "component", depth = 0): React.ReactNode {
    return parent.map((component: any, index: number) => {
        if (component.componentTag) {
            const Tag = Library[component.componentTag][0];
            const key = `${parentKey}-${index}`;

            if (Tag && depth == 0) {
                return (
                    <div className={"w-full h-full border border-dashed p-1 m-1" + (activeIndex == index ? " border-adminBlue" : "")} key={key + "-wrapper"}>
                        <Tag key={key} {...component.props}>
                            {DyanmicRenderPreview(component.children, -1, key, depth + 1)}
                        </Tag>
                    </div>
                )
            } else {
                return (
                    <Tag key={key} {...component.props}>
                        {DyanmicRenderPreview(component.children, -1, key, depth + 1)}
                    </Tag>
                )
            }
        } else if (component.content) {
            return component.content
        }
    })
}