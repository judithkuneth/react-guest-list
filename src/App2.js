import React, { useState, useRef } from 'react';
import GuestList2 from './GuestList2';
import { v4 as uuidv4 } from 'uuid';
uuidv4();
// import GuestList from './GuestList';

export default function App2() {
  const [guests, setGuests] = useState(['Guest 1', 'Guest 2']);
  const firstNameRef = useRef();

  function addGuest(e) {
    const firstName = firstNameRef.current.value;
    return setGuests((guests) => {
      return [...guests, { firstname: firstName }];
    });
  }

  return (
    <>
      <h1>Guests coming:</h1>
      <GuestList2 guests={guests} />
      <input ref={firstNameRef} placeholder="name"></input>
      <button onClick={addGuest}>Add</button>
      <button>Remove selected</button>
    </>
  );
}
