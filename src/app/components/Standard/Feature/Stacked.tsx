function Standard_FeatureStacked({children}: {children: React.ReactNode}) {
    return (
        <div className="container flex gap-6 justify-center ">
            {children}
        </div>
    )
}

const bindings = {
    children: true,
    props: {}
}

export default [Standard_FeatureStacked, bindings]
