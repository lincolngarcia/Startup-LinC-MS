export default function Standard_BulletList({ items }: { items: string[] }) {
    return (
        <ul className="list-disc pl-5 hidden lg:block mb-15, list-inside">
            {items && items.length ? items.map((item, index) => (
                <li key={index}>{item}</li>
            )) : null}
        </ul>
    );
}
