import { useEffect, useRef } from "react"

export default function BackendPreview({pagedata, className}: {pagedata:any, className:string}) {
    const defaultClasses = "h-full w-full"
    const classes = [defaultClasses, className].join(" ")

    useEffect(() => {
        window.addEventListener("message", (message: any) => {
            if (message.data === "engage connection") {
                console.log("Preview Parent: Engagement Request Acknowledged")
                if (iframe.current) {
                    console.log("Preview Parent: Sending Initial Page Data:", pagedata)
                    iframe.current.contentWindow.postMessage(pagedata, "*")
                }
            }
        })
    }, [])

    // Update Page
    useEffect(() => {
        iframe.current.contentWindow.postMessage(pagedata, "*")
    }, [pagedata])

    const iframe: any = useRef(null);

    return <iframe ref={iframe} src="/admin/preview" className={classes}/>
}