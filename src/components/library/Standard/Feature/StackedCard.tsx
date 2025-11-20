import StandardAction from "../../Standard/Helper/Action";
import { Children } from "react";

function Standard_FeatureStackedCard(
    {action="", description, image, title}: 
    { action?: string, description: any, image: string, title: string}) {

    return (
        <div className="mt-4 mb-6 w-lg">
            <div className="relative overflow-hidden h-[164px] mb-8 bg-gray">
                <img src={image} alt={`${image ? image.split('/').pop() : ""}`} width="200" height="400" className="h-full w-full object-cover  m-auto" />
                <p className="h5 absolute left-7 top-7 text-white">
                    {title}
                </p>
            </div>

            <p className="p4 font-bold">{title}</p>
            <div className="p5">{description}</div>
            {/*
            {action ? <StandardAction link={action}>Learn More</StandardAction> : <></>}
            */}
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