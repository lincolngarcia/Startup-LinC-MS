'use client';

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

import "./app.css"

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function App() {
  return (
    <main className="bg-dark text-light">
      {/*<title>Welcome to Simon</title>*/}
      <header className="container-fluid">
        <nav className="navbar fixed-top navbar-dark">
          <a className="navbar-brand" href="#">Simon<sup>&reg;</sup></a>
          <menu className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="play">Play</a>
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

      <main className="container-fluid bg-secondary text-center">
        <div>
          <h1>Welcome to Simon</h1>
          <form method="get" action="play">
            <div className="input-group mb-3">
              <span className="input-group-text">@</span>
              <input className="form-control" type="text" placeholder="your@email.com" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">🔒</span>
              <input className="form-control" type="password" placeholder="password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="submit" className="btn btn-secondary">Create</button>
          </form>
        </div>
      </main>

      <footer className="bg-dark text-white-50">
        <div className="container-fluid">
          <span className="text-reset">Author Name(s)</span>
          <a className="text-reset" href="https://github.com/webprogramming260/simon-css">Source</a>
        </div>
      </footer>

    </main>
  );
}
