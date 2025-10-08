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
                <div id="picture" className="picture-box"><img width="400px" src="https://raw.githubusercontent.com/webprogramming260/simon-html/refs/heads/main/placeholder.jpg" alt="random" /></div>

                <p>
                    Simon is a repetitive memory game where you follow the demonstrated color sequence until you make a mistake. The
                    longer the sequence you repeat, the greater your score.
                </p>

                <p>
                    The name Simon is a registered trademark of Milton-Bradley. Our use of the name and the game is for non-profit
                    educational use only. No part of this code or program should be used outside of that definition.
                </p>

                <div id="quote">
                    <div>Words are cheap. Show me the code.</div>
                    <div>- Linus Torvalds</div>
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
