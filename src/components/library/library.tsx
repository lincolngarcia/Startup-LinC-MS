import StandardExports from "./Standard/Standard";

const Library: any = {
    ...StandardExports,
    "a": [
        (
            { children, href, className }:
                { children: React.ReactNode, href: string, className: string }
        ) => <a href={href} className={className}>{children}</a>,
        { children: true, props: { href: "string" } },
        "Link",
        false
    ],
    "p": [
        (
            { children, className }:
                { children: React.ReactNode, className: string }
        ) => <p className={className}>{children}</p>,
        { children: true, props: { } },
        "Text",
        false
    ],
    "div": [
        (
            { children, className }:
                { children: React.ReactNode, className: string }
        ) => <div className={className}>{children}</div>,
        { children: true, props: { } },
        "Container",
        false
    ],
}

export default Library;