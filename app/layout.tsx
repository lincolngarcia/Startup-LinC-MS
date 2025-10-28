"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import Link from "next/link";
import { usePathname } from "next/navigation"
import React from "react";
import { AuthState } from "./_login/authState";

const inter = Inter({ subsets: ["latin"] });

// RootLayout is used by the app router and must render html/body
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname()

  const [userName, setUserName] = React.useState('');
  const [authState, setAuthState] = React.useState<AuthState>(AuthState.Unknown);

  React.useEffect(() => {
    const name = typeof window !== 'undefined' ? localStorage.getItem('userName') || '' : '';
    setUserName(name);
    setAuthState(name ? AuthState.Authenticated : AuthState.Unauthenticated);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Simon PWA</title>
      </head>
      <body className={inter.className}>
        <div className='body bg-dark text-light' style={{"display": "flex", "flexDirection": "column"}}>
          <header className='container-fluid'>
            <nav className='navbar navbar-dark'>
              <div className='navbar-brand'>
                Simon<sup>&reg;</sup>
              </div>
              <menu className='navbar-nav'>
                <li className='nav-item'>
                  <Link className={'nav-link' + (pathname === '/' ? ' active' : '')} href='/'>
                    Login
                  </Link>
                </li>
                {authState === AuthState.Authenticated && (
                  <li className='nav-item'>
                    <Link className={'nav-link'} href='/play'>
                      Play
                    </Link>
                  </li>
                )}
                {authState === AuthState.Authenticated && (
                  <li className='nav-item'>
                    <Link className={'nav-link'} href='/scores'>
                      Scores
                    </Link>
                  </li>
                )}
                <li className='nav-item'>
                  <Link className={'nav-link'} href='/about'>
                    About
                  </Link>
                </li>
              </menu>
            </nav>
          </header>
          {children}
          <footer className='bg-dark text-dark text-muted'>
            <div className='container-fluid'>
              <span className='text-reset'>Author Name(s)</span>
              <a className='text-reset' href='https://github.com/webprogramming260/simon-react'>
                Source
              </a>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
