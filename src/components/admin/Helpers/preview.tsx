import { useEffect, useRef } from "react"

export default function BackendPreview({ context, className = "" }: { context: any, className?: string }) {
    const defaultClasses = "h-full w-full"
    const classes = [defaultClasses, className].join(" ")

    useEffect(() => {
        window.addEventListener("message", (message: any) => {
            if (message.data === "engage connection") {
                console.log("Preview Parent: Engagement Request Acknowledged")
                if (iframe.current) {
                    console.log("Preview Parent: Sending Initial Page Data:", context.pagedata)
                    iframe.current.contentWindow.postMessage({type: "pagedata", data: context.pagedata}, "*")
                }
            } else {
                context.setActiveSection(message.data)
            }
        })
    }, [])

    // Update Page
    useEffect(() => {
        iframe.current.contentWindow.postMessage({type: "pagedata", data: context.pagedata}, "*")
    }, [context.pagedata])

    useEffect(() => {
        iframe.current.contentWindow.postMessage({type: "activeSection", data: context.activeSection}, "*")
    }, [context.activeSection])

    const iframe: any = useRef(null);

    return (<div className="transform-[scale(0.9)] origin-top-left w-[111.11%] h-[111.11%]">
        <iframe ref={iframe} src="/admin/preview" className={classes} />
    </div>)
}