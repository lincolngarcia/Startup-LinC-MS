function Standard_FeatureStacked({children}: {children: React.ReactNode}) {
    return (
        <div className="container flex flex-col items-center justify-center md:flex-row md:gap-16 lg:gap-25">
            {children}
        </div>
    )
}

const bindings = {
    children: [
        "standard_featurestackedcard",
        "standard_featurestackedcard"
    ],
    props: {},
}

export default [Standard_FeatureStacked, bindings, "Feature Stacked", true]
