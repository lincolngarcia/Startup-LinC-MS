import Standard_BulletList from "../Helper/BulletList";

function ImageLeft({ image, Tagline, Title, Paragraph, Bullets, Action }: {image: string, Tagline: string, Title: string, Paragraph: string, Bullets: string[], Action: React.ReactNode}) {
    // Underscores removed from class names and all numeric values divided by 4 (rounded)
    return (
        <div className="container lg:flex lg:gap-32 mt-14 md:mt-19 lg:mt-25 mb-14 md:mb-19 lg:mb-25">
            <img src={image} className="w-full aspect square vmb-10 md:mb-9" alt="" />
            <div>
                <p className="hidden lg:block p1 mb-7">
                    {Tagline}
                </p>
                <h4 className="h1 mb-8">{Title}</h4>
                <p className="p1 mb-5">{Paragraph}</p>
                <div className="block mb-15 list-disc list-inside p1">
                    <Standard_BulletList items={Bullets} />
                </div>
                <div className="mt-15">
                    {Action}
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