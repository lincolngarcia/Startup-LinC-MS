import "./scores.css"

export default function Page() {
    return (
        <main>
            <title>Scores</title>

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
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>도윤 이</td>
                            <td>34</td>
                            <td>May 20, 2021</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Annie James</td>
                            <td>29</td>
                            <td>June 2, 2021</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Gunter Spears</td>
                            <td>7</td>
                            <td>July 3, 2020</td>
                        </tr>
                    </tbody>
                </table>
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
