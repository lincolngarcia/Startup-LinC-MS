import Standard_Action from "../Helper/Action";
import Standard_BulletList from "../Helper/BulletList";

function ImageLeft({ image, Tagline, Title, Paragraph, Bullets, Action }: {image: string, Tagline: string, Title: string, Paragraph: string, Bullets: string[], Action: string}) {
    // Underscores removed from class names and all numeric values divided by 4 (rounded)
    return (
        <div className="container lg:flex lg:justify-between lg:gap-32 mt-14 md:mt-19 lg:mt-25 mb-14 md:mb-19 lg:mb-25">
            <img src={image} className="aspect-square lg:w-[45%] rounded-2xl mb-10 md:mb-9" alt="" />
            <div className="lg:w-1/2">
                <p className="hidden lg:block text-xl mb-7">
                    {Tagline}
                </p>
                <h4 className="text-2xl mb-8">{Title}</h4>
                <p className="text-xl mb-5">{Paragraph}</p>
                <div className="block mb-15 list-disc list-inside text-xl">
                    <Standard_BulletList items={Bullets} />
                </div>
                <div className="mt-15">
                    {Action ? <Standard_Action link={Action}>See More</Standard_Action> : null}
                </div>
            </div>
        </div>
    );
}

const bindings = {
    children: [

    ],
    props: {
        image: "short string",
        Tagline: "short string",
        Title: "short string",
        Paragraph: "short string",
        Bullets: "array of short string",
        Action: "short string"
    }
}

export default [ImageLeft, bindings, "Layout Image Left", true];