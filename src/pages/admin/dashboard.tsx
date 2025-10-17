import { useRouter } from 'next/router';

// Import Components
import Grid from '../../app/components/Backend/Helpers/goldengrid';
import NeumorphicPressed from '../../app/components/Backend/Neumorphic/pressed';
import BackendMenu from '../../app/components/Backend/Menu';

import NeumorphicFlat from '@/src/app/components/Backend/Neumorphic/flat';
import RootLayout from '../layout';
import BackendHeader from '@/src/app/components/Backend/header';
import BackendFooter from '@/src/app/components/Backend/footer';

export default function Page() {
    const router = useRouter();

    return (
        <div className="_min-h-screen _flex _flex-col">
            <BackendHeader title="Dashboard" />
            <main className="_h-full _bg-adminGray _grow">
                <Grid>
                    <BackendMenu className="_col-start-1 _col-end-2" active="Home" />
                    <NeumorphicFlat className="_col-start-8 _col-end-13 _h-full">
                        <h3>Editor</h3>
                        <div className="_h-4/5">
                            <textarea className="_h-4/5 _w-full" placeholder="write content here"></textarea>
                            <input placeholder="edit"></input><NeumorphicFlat><button className="_w-full">upload</button></NeumorphicFlat>
                        </div>
                        <div className="_flex _justify-between _mt-2">
                            <NeumorphicFlat><button>Edit Pages</button></NeumorphicFlat>
                            <NeumorphicFlat><button>Delete Pages</button></NeumorphicFlat>
                            <NeumorphicFlat><button>New Page</button></NeumorphicFlat>
                        </div>
                        <div>
                            <br />
                            <NeumorphicFlat><button className="_w-full" onClick={() => router.push("/")}>View Live Site</button></NeumorphicFlat>
                        </div>
                    </NeumorphicFlat>
                </Grid >
            </main>
            <BackendFooter />
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
