import RootLayout from "../layout"

export default function Page() {
    return (
            <div className="_flex">
                <h1>Analytics Dashboard</h1>
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
