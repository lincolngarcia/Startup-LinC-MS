export default function Page() {
    return (
        <main>

            <header>
                <h1>Simon<sup>&reg;</sup></h1>
                <nav>
                    <menu>
                        <li><a href="/">Home</a></li>
                        <li><a href="/play">Play</a></li>
                        <li><a href="/scores">Scores</a></li>
                        <li><a href="/about">About</a></li>
                    </menu>
                </nav>
                <hr />
            </header>

            <main>
                <div className="players">
                    Player:
                    <span className="player-name">Mystery player</span>
                </div>
                <ul className="notification">
                    <li className="player-name">Tim started a new game</li>
                    <li className="player-name">Ada started a new game</li>
                    <li className="player-name">Tim scored 337</li>
                </ul>

                <br />

                <div>
                    <label htmlFor="count">Score</label>
                    <input type="text" id="count" value="--" readOnly />
                </div>

                <br />

                <div>
                    <button>Reset</button>
                </div>

                <br />

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <button>
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <path d="M 95,5 95,95 5,95 Q 5,5 95,5" fill="green" />
                                        </svg>
                                    </button>
                                </td>
                                <td>
                                    <button>
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <path d="M5,5 5,95 95,95 Q 95,5 5,5" fill="red" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <button>
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <path d="M5,5 95,5 95,95 Q 5,95 5,5" fill="blue" />
                                        </svg>
                                    </button>
                                </td>
                                <td>
                                    <button>
                                        <svg aria-hidden="true" viewBox="0 0 100 100" height="100" width="100">
                                            <path d="M95,5 5,5 5,95 Q 95,95 95,5" fill="yellow" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>

            <footer>
                <hr />
                <span className="text-reset">Author Name(s)</span>
                <br />
                <a href="https://github.com/webprogramming260/simon-html">GitHub</a>
            </footer>
        </main>
    )
}