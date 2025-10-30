export default function BackendPreview({pagedata, className}: {pagedata:any, className:string}) {
    const defaultClasses = "h-full w-full"
    const classes = [defaultClasses, className].join(" ")
    return <iframe src="/admin/preview" className={classes}/>
}