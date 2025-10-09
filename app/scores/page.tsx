import "./scores.css"

export default function Page() {
    return (
        <main className="bg-dark text-light">
            <header className="container-fluid">
                <nav className="navbar fixed-top navbar-dark">
                    <a className="navbar-brand" href="#">Simon<sup>&reg;</sup></a>
                    <menu className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/play">Play</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="/scores">Scores</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about">About</a>
                        </li>
                    </menu>
                </nav>
            </header>

            <main className="container-fluid bg-secondary text-center">
                <table className="table table-warning table-striped-columns">
                    <thead className="table-dark">
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

            <footer className="bg-dark text-white-50">
                <div className="container-fluid">
                    <span className="text-reset">Author Name(s)</span>
                    <a className="text-reset" href="https://github.com/webprogramming260/simon-css">Source</a>
                </div>
            </footer>
        </main>
    )
}
