import RootLayout from "../pages/layout"
import Standard_FeatureStacked from "./components/Standard/Feature/Stacked";
import Standard_FeatureStackedCard from "./components/Standard/Feature/StackedCard";

export default function Page() {
    return (
        <div className="min-w-screen">
            <div className="max-w-[1200px] m-auto p-4">
                <Standard_FeatureStacked>
                    <Standard_FeatureStackedCard
                        image="/content-image.jpeg"
                        title="Welcome to the Homepage"
                        action="Learn more"
                        description={<p>This is a description. It descripts. Que mas quiere que te diga?</p>}
                    />
                    <Standard_FeatureStackedCard
                        image="/content-image.jpeg"
                        title="Welcome to the Homepage"
                        action="Learn more"
                        description={<p>This is a description. It descripts. Que mas quiere que te diga?</p>}
                    />
                </Standard_FeatureStacked>

                <div className="h1"><a className="text-adminBlue" href="https://github.com/lincolngarcia/Startup-LinC-MS">Github Repository</a></div>
            </div>
        </div>
    )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}