"use client";

import React from 'react';
import Link from 'next/link';
import { Login } from './login/page';
import Play from './play/page';
import { Scores } from './scores/page';
import { About } from './about/page';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function Page() {

  const [userName, setUserName] = React.useState('');
  const [authState, setAuthState] = React.useState<AuthState>(AuthState.Unknown);

  React.useEffect(() => {
    const name = typeof window !== 'undefined' ? localStorage.getItem('userName') || '' : '';
    setUserName(name);
    setAuthState(name ? AuthState.Authenticated : AuthState.Unauthenticated);
  }, []);

  return (
    <main>
      {/* Render the Login UI on the root route. Other pages are handled by their own files under /app */}
      <Login
        userName={userName}
        authState={authState}
        onAuthChange={(newUserName: string, newAuthState: AuthState) => {
          setAuthState(newAuthState);
          setUserName(newUserName);
          if (typeof window !== 'undefined') {
            if (newUserName) localStorage.setItem('userName', newUserName);
            else localStorage.removeItem('userName');
          }
        }}
      />
    </main>
  );
}