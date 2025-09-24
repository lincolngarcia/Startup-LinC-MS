"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
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
          <h1>Welcome to Simon</h1>
          <form method="get" action="/play">
            <div>
              <span>@</span>
              <input type="text" placeholder="your@email.com" />
            </div>
            <div>
              <span>🔒</span>
              <input type="password" placeholder="password" />
            </div>
            <button type="submit">Login</button>
            <button type="submit">Create</button>
          </form>
        </main>

        <footer>
          <hr />
          <span className="text-reset">Author Name(s)</span>
          <br />
          <a href="https://github.com/webprogramming260/simon-html">GitHub</a>
        </footer>
    </main >
  );
}
