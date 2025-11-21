
import { useNavigate } from 'react-router-dom';

function Standard_Menu() {
    return (
        <>
            <div className="pb-16"></div>
            <div className="z-100 container flex justify-between pt-8 items-start fixed max-w-[1200px] mx-auto top-0 left-0 right-0 bg-white">
                <button onClick={() => window.location.href= "/login"}>
                    <p className="text-adminBlue font-bold text-xl border-b border-adminBlue">
                        LinC-MS
                    </p>
                </button>
                <div className="flex justify-between text-lg text-gray font-medium">
                    <a href="mailto:lincolngarciadevelopment@gmail.com" className="hidden lg:block pt-1 lg:mr-14">Donate pls</a>
                    <a href='https://github.com/lincolngarcia/Startup-LinC-MS' className="hidden lg:block pt-1 lg:mr-14">Github</a>
                    <a href='/login' className="hidden lg:block pt-1 lg:mr-22">Login</a>
                    <img src="/svg/hamburger.svg" className="relative -top-1 h-12 cursor-pointer" />
                </div>
            </div>
        </>
    )
}

const bindings = {
    children: [],
    props: {}
}

export default [Standard_Menu, bindings, "Menu", false]