import { useRouter } from 'next/router';
import RootLayout from '../layout';

// Import Components
import Grid from '../../app/components/Backend/Helpers/goldengrid';
import NeumorphicPressed from '../../app/components/Backend/Neumorphic/pressed';
import BackendMenu from '../../app/components/Backend/Menu';

import NeumorphicFlat from '@/src/app/components/Backend/Neumorphic/flat';

export default function Page() {
    const router = useRouter();

    return (
        <Grid className="_h-screen _bg-adminGray">
            <BackendMenu className="_col-start-4 _col-end-13" />
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
        </Grid>
        </Grid >
    )
}

Page.getLayout = function getLayout(page: React.ReactNode) {
    return (
        <RootLayout>
            {page}
        </RootLayout>
    )
}
