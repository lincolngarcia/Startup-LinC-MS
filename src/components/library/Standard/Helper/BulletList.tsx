function Standard_BulletList({ items }: { items: string[] }) {
    return (
        <ul className="list-disc pl-5 hidden lg:block mb-15, list-inside">
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}

const bindings = {
    children: [],
    props: {
        items: "array of short string"
    }
}

export default [Standard_BulletList, bindings, "Bullet List", false]