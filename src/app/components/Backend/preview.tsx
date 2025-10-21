export default function BackendPreview({src, className}: {src:string, className:string}) {
    const defaultClasses = "h-full w-full"
    const classes = [defaultClasses, className].join(" ")
    return <iframe src={src} className={classes}/>
}