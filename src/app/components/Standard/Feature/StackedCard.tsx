import Standard_Action from "../../Standard/Helper/Action";
import Image from "next/image";

export default function Standard_FeatureStackedCard(
    {action="", description, image, title}: 
    { action?: string, description: React.ReactNode, image: string, title: string}) {

    return (
        <div className="_mt-4 _mb-6 _w-128">
            <div className="_relative _overflow-hidden _h-[164px] _mb-8 _bg-gray">
                <Image src={image} alt={`${image.split('/').pop()}`} width="200" height="400" className="_h-full _w-full _object-cover  _m-auto" />
                <p className="_h5 _absolute _left-7 _top-7 _text-white">
                    {title}
                </p>
            </div>

            <p className="_p4 _font-bold">{title}</p>
            <div className="_p5">{description}</div>
            {/*
            {action ? <Standard_Action link={action}>Learn More</Standard_Action> : <></>}
            */}
        </div>
    )
}