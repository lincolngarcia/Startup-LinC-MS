export default function Standard_Action({ children, link }: { children: React.ReactNode, link: string }) {
    return (
        <a href={link} className="_flex _p3 _text-adminRed _font-medium">
            <span>{children}</span>
            <img className="_ml-24" />
        </a>
    )
}