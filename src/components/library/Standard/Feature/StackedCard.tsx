import StandardAction from "../../Standard/Helper/Action";
import { Children } from "react";

function Standard_FeatureStackedCard(
    { action = "", description, image, title }:
        { action?: string, description: any, image: string, title: string }) {

    return (
        <div className="mt-18 mb-25 w-72 md:w-75 lg:w-135">
            <div className="relative overflow-hidden h-90 md:h-100 lg:h-160 mb-8 bg-gray">
                <img src={image} alt={`${image ? image.split('/').pop() : ""}`} width="200" height="400" className="h-full w-full object-cover rounded-3xl m-auto" />
                <p className="h5 absolute left-7 bottom-7 text-white">
                    {title}
                </p>
            </div>

            <p className="text-lg font-bold">{title}</p>
            <p className="text">{description}</p>
            {action ? <StandardAction link={action}>Learn More</StandardAction> : <></>}
        </div>
    )
}

const bindings = {
    children: [],
    props: {
        action: "short string",
        description: "short string",
        image: "short string",
        title: "short string"
    }
}

export default [Standard_FeatureStackedCard, bindings, "Feature Stacked Card", false]