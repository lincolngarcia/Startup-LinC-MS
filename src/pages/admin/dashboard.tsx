import { useRouter } from 'next/router';
import RootLayout from '../layout';

// Import Components
import Grid from '../../app/components/Backend/goldengrid';
import NeumorphicPressed from '../../app/components/Backend/Neumorphic/pressed';

export default function Page() {
    const router = useRouter();

    return (
        <Grid className="_h-screen _bg-adminGray">
            <nav className="md:_col-span-2 lg:_col-span-3 _p-4 _bg-white _rounded-lg _shadow-md">
                <ul>
                    <li><NeumorphicPressed className="_w-4/5 text-center">Home</NeumorphicPressed></li>
                    <li><a href="/admin/analytics">Analytics</a></li>
                    <li>Pages</li>
                    <li>Settings</li>
                </ul>
            </nav>
            <Grid className="md:_col-start-3 md:_col-end-9 lg:_col-start-4 lg:_col-end-13">
                <div className="md:_col-span-5">
                    <h1>Welcome to the Dashboard</h1>
                    <p>This is the main content area. You can display reports, data visualizations, or page content here.</p>
                </div>

                <div className="md:_col-start-6 md:_col-span-4 lg:_col-start-8 _h-full">
                    <h3>Editor</h3>
                    <div className="_h-4/5">
                        <textarea className="_h-4/5 _w-full" placeholder="write content here"></textarea>
                        <input placeholder="edit"></input><button>Upload</button>
                    </div>
                    <div className="_flex _justify-between _mt-2">
                        <button>Edit Pages</button>
                        <button>Delete Pages</button>
                        <button>New Page</button>
                    </div>
                    <div>
                        <button onClick={() => router.push("/")}>View Live Site</button>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}
