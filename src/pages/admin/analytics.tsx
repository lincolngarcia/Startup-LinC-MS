import RootLayout from "@/src/app/layout"
import NeumorphicFlat from "@/src/app/components/Backend/Neumorphic/flat"
import NeumorphicPressed from "@/src/app/components/Backend/Neumorphic/pressed"
import BackendMenu from "@/src/app/components/Backend/menu";
import Grid from "@/src/app/components/Backend/Helpers/goldengrid"
import BackendHeader from "@/src/app/components/Backend/header";
import BackendFooter from "@/src/app/components/Backend/footer";


export default function Page() {
    return (
        <div className="bg-adminGray h-screen flex flex-col">
            <BackendHeader title="Analytics Dashboard" />
            <main className="grow h-full">
                <Grid className="h-full">
                    <BackendMenu className="col-start-1 col-end-3" active="Analytics" />
                    <NeumorphicFlat className="p-4 m-4 col-start-4 col-end-7">
                        <section>
                            <h2>Overview</h2>
                            {/* Placeholder for overview stats */}
                            <div>[Overview stats will appear here]</div>
                        </section>
                        <section>
                            <h2>Traffic</h2>
                            {/* Placeholder for traffic chart */}
                            <div>[Traffic chart will appear here]</div>
                        </section>
                        <section>
                            <h2>User Engagement</h2>
                            {/* Placeholder for engagement metrics */}
                            <div>[Engagement metrics will appear here]</div>
                        </section>
                    </NeumorphicFlat>
                </Grid>
            </main>
            <BackendFooter />
        </div>
    );
};

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}
