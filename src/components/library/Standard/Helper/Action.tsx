export default function Standard_Action({ children, link }: { children: React.ReactNode, link: string }) {
    return (
        <a href={link} className="flex p3 text-adminBlue font-medium">
            <span>{children}</span>
            <img className="ml-24" /> {/*Looking for an arrow icon*/}
        </a>
    )
}