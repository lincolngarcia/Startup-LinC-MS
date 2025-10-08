import "./play.css";
import Head from "next/head";

export default function Page() {
    return (
        <main>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Simon</title>
                <link rel="icon" href="favicon.ico" />

                <link rel="stylesheet" href="main.css" />
                <link rel="stylesheet" href="play.css" />

            </Head>
            <div className="bg-dark text-light">
                <header className="container-fluid">
                    <nav className="navbar fixed-top navbar-dark">
                        <a className="navbar-brand" href="#">Simon<sup>&reg;</sup></a>
                        <menu className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="index.html">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="play">Play</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="scores">Scores</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="about">About</a>
                            </li>
                        </menu>
                    </nav>
                </header>

                <main className="bg-secondary">
                    <div className="players">
                        Player
                        <span className="player-name">Mystery player</span>
                        <div id="player-messages">
                            <div className="event"><span className="player-event">Linus</span> scored 377</div>
                            <div className="event"><span className="player-event">Linus</span> started a new game</div>
                            <div className="event"><span className="system-event">game</span> connected</div>
                        </div>
                    </div>

                    <div className="game">
                        <div className="button-container">
                            <button className="button-top-left"></button>
                            <button className="button-top-right"></button>
                            <button className="button-bottom-left"></button>
                            <button className="button-bottom-right"></button>
                            <div className="controls center">
                                <div className="game-name">Simon<sup>&reg;</sup></div>
                                <div className="score center">--</div>
                                <button className="btn btn-primary">Reset</button>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="bg-dark text-white-50">
                    <div className="container-fluid">
                        <span className="text-reset">Author Name(s)</span>
                        <a className="text-reset" href="https://github.com/webprogramming260/simon-css">Source</a>
                    </div>
                </footer>
            </div>
        </main>
    )
}
