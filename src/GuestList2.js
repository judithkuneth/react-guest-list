import React from 'react';
import Person from './person.js';

export default function GuestList2({ guests }) {
  return guests.map((person) => {
    return <Person person={person} />;
  });
}
