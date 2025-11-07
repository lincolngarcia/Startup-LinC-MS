import { useEffect, useRef } from "react"

export default function BackendPreview({pagedata, className}: {pagedata:any, className:string}) {
    const defaultClasses = "h-full w-full"
    const classes = [defaultClasses, className].join(" ")

    useEffect(() => {
        window.addEventListener("message", (message: any) => {
            if (message.data === "engage connection") {
                if (iframe.current) {
                    iframe.current.contentWindow.postMessage(pagedata, "*")
                }
            }
        })
    }, [pagedata])

    const iframe: any = useRef(null);

    return <iframe ref={iframe} src="/admin/preview" className={classes}/>
}