export default function StandardAction({ children, link }: { children: React.ReactNode, link: string }) {
    return (
        <a href={link} className="flex p3 text-adminRed font-medium">
            <span>{children}</span>
            <img className="ml-24" />
        </a>
    )
}