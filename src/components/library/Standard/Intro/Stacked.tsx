import Grid from "./../../Backend/Helpers/goldengrid";

function Standard_IntroStacked({ title, hook, paragraph }: { title: string, hook: string, paragraph: string }) {
    return (
        <Grid className="container pt-16 md:pt-18 lg:pt-19 pb-13 md:pb-11 lg:pb-24">
            <div className="col-start-1 col-end-5 md:col-end-13">
                <div className="mb-13 md:mb-21 lg:mb-20">
                    {/* <Breadcrumbs /> */}
                </div>
                <h1 className="text-lg mb-2 md:mb-4 lg:mb-3">{title}</h1>
                <p className="text-2xl font-bold mb-5 md:mb-6 lg:mb-7">{hook}</p>
                <p className="text-lg">{paragraph}</p>
            </div>
        </Grid>
    )
}

const bindings = {
    children: [],
    props: {
        title: "short string",
        hook: "short string",
        paragraph: "short string"
    }
}

export default [Standard_IntroStacked, bindings, "Intro Stacked", true]