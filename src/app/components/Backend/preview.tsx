import { useEffect, useRef } from "react"

export default function BackendPreview({pagedata, className}: {pagedata:any, className:string}) {
    const defaultClasses = "h-full w-full"
    const classes = [defaultClasses, className].join(" ")

    // Initialize Page
    useEffect(() => {
        window.addEventListener("message", (message: any) => {
            if (message.data === "engage connection") {
                console.log("recieved engagement message")
                if (iframe.current) {
                    console.log("sending:", pagedata)
                    iframe.current.contentWindow.postMessage(pagedata, "*")
                }
            }
        })
    }, [])

    // Update Page
    useEffect(() => {
        console.log("pagedata updated")
        iframe.current.contentWindow.postMessage(pagedata, "*")
    }, [pagedata])

    const iframe: any = useRef(null);

    return <iframe ref={iframe} src="/admin/preview" className={classes}/>
}