import "./about.css"
import RootLayout from "@/app/layout"

export default function Page() {
    return (
        <RootLayout>

            <main>
                <head>
                    <title>About</title>
                </head>
                <header className="container-fluid">
                    <nav className="navbar fixed-top navbar-dark">
                        <a className="navbar-brand" href="#">Simon<sup>&reg;</sup></a>
                        <menu className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="index">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="play">Play</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="scores">Scores</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="about">About</a>
                            </li>
                        </menu>
                    </nav>
                </header>

                <main className="container-fluid bg-secondary text-center">
                    <div>
                        <div id="picture" className="picture-box"><img src="placeholder.jpg" alt="random" /></div>

                        <p>
                            Simon is a repetitive memory game where you follow the demonstrated color sequence until you make a mistake.
                            The longer the sequence you repeat, the greater your score.
                        </p>

                        <p>
                            The name Simon is a registered trademark of Milton-Bradley. Our use of the name and the game is for non-profit
                            educational use only. No part of this code or program should be used outside of that definition.
                        </p>

                        <div id="quote" className="quote-box bg-light text-dark">
                            <p className="quote">Words are cheap. Show me the code.</p>
                            <p className="author">Linus Torvalds</p>
                        </div>
                    </div>
                </main>

                <footer className="bg-dark text-white-50">
                    <div className="container-fluid">
                        <span className="text-reset">Author Name(s)</span>
                        <a className="text-reset" href="https://github.com/webprogramming260/simon-css">Source</a>
                    </div>
                </footer>
            </main>
        </RootLayout>
    )
}