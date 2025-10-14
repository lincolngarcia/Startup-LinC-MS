import RootLayout from "../layout"
import NeumorphicFlat from "@/src/app/components/Backend/Neumorphic/flat"
import NeumorphicPressed from "@/src/app/components/Backend/Neumorphic/pressed"
import BackendMenu from "@/src/app/components/Backend/Menu";
import Grid from "@/src/app/components/Backend/Helpers/goldengrid"


export default function Page() {
    return (
        <div className="_flex _bg-adminGray _min-h-screen">
            <h1>Analytics Dashboard</h1>
            <Grid>

                <BackendMenu className="_col-start-4 _col-end-13" />
                <NeumorphicFlat className="p-4 m-4">
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
