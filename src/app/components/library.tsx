import React from "react";
import StandardExports from "./Standard/Standard";

const Library: any = {
    ...StandardExports,
    "a": [
        (
            { children, href, className }:
                { children: React.ReactNode, href: string, className: string }
        ) => <a href={href} className={className}>{children}</a>,
        { children: true, props: { href: "string" } }
    ],
    "p": [
        (
            { children, className }:
                { children: React.ReactNode, className: string }
        ) => <p className={className}>{children}</p>,
        { children: true, props: { } }
    ],
    "div": [
        (
            { children, className }:
                { children: React.ReactNode, className: string }
        ) => <div className={className}>{children}</div>,
        { children: true, props: { } }
    ],
}

export default Library;