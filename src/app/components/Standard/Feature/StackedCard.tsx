import { AnyARecord } from "node:dns";
import StandardAction from "../../Standard/Helper/Action";
import Image from "next/image";

export default function Standard_FeatureStackedCard(
    {action="", description, image, title}: 
    { action?: string, description: any, image: string, title: string}) {

    return (
        <div className="mt-4 mb-6 w-128">
            <div className="relative overflow-hidden h-[164px] mb-8 bg-gray">
                <Image src={image} alt={`${image.split('/').pop()}`} width="200" height="400" className="h-full w-full object-cover  m-auto" />
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