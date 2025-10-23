"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const router = useRouter();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <div className='playerName'>{props.userName}</div>
      <Button variant='primary' onClick={() => router.push('/play')}>
        Play
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
