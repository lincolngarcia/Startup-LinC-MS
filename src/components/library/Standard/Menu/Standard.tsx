function Standard_Menu() {
    return (
        <div className="container flex justify-between mt-8 items-start">
            <div>logo</div>
            <div className="flex justify-between text-lg text-gray font-medium">
              <a href='/' className="hidden lg:block pt-1 lg:mr-14">APPLY</a>
              <a href='/' className="hidden lg:block pt-1 lg:mr-14">VISIT</a>
              <a href='/' className="hidden lg:block pt-1 lg:mr-22">TALK WITH US</a>
              <img src="/svg/hamburger.svg" className="pt-1 h-12 cursor-pointer" />
            </div>
        </div>
    )
}

const bindings = {
    children: [],
    props: {}
}

export default [Standard_Menu, bindings, "Menu", false]