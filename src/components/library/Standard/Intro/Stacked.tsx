import Grid from "./../../Backend/Helpers/goldengrid";

function Standard_IntroStacked({title, hook, paragraph}: {title: string, hook: string, paragraph: string}) {
    return (
        <Grid className="container pt-16 md:pt-18 pb-14 md:pb:12 lg:pb-24">
            {/*<div className="col-start-1 col-end-5 md:col-end-13">breadcrumbs</div>*/}
            <h1 className="p1 mb-9 md:mb-14 lg:mb-13">{title}</h1>
            <p className="h1 mb-18 md:mb-23 lg_mb-28">{hook}</p>
            <p className="p1">{paragraph}</p>

        </Grid>
    )
}

const bindings = {
    children: false,
    props: {
        title: "short string",
        hook: "short string",
        paragraph: "short string"
    }
}

export default [Standard_IntroStacked, bindings, "Intro Stacked"]