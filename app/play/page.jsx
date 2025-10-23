import React from 'react';

import { Players } from './players';
import { SimonGame } from './simonGame';

export default function Play(props) {
  return (
    <main className="bg-secondary" style={{"flex-grow": "1"}}>
      <Players userName={props.userName} />
      <SimonGame userName={props.userName} />
    </main>
  );
}
