import React, { useState, useRef, useEffect } from 'react';
import Lama from './images/lama.jpg';
import GuestList from './GuestList.js';
import { v4 as uuidv4 } from 'uuid';
uuidv4();

// const localStorageKey = 'guestApp.guests';

function App() {
  const [guests, setGuests] = useState([]);
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const localStorageKey = 'guestApp.guests';

  useEffect(() => {
    const storedGuests = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedGuests) setGuests(storedGuests);
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(guests));
  }, [guests]);

  function checkGuests(id) {
    const newGuests = [...guests];
    const guest = newGuests.find((guest) => guest.id === id);
    guest.attending = !guest.attending;
    setGuests(newGuests);
  }

  function selectGuests(id) {
    const newGuests = [...guests];
    const guest = newGuests.find((guest) => guest.id === id);
    guest.selected = !guest.selected;
    setGuests(newGuests);
  }

  function addGuest(e) {
    const firstName = firstNameRef.current.value;
    if (firstName === '') return;
    setGuests((previousGuests) => {
      return [
        ...previousGuests,
        {
          id: uuidv4(),
          firstName: firstName,
          lastName: lastName,
          attending: false,
          selected: false,
        },
      ];
    });
    firstNameRef.current.value = null;
    const lastName = lastNameRef.current.value;
    if (lastName === '') return;
    console.log(lastName);
    lastNameRef.current.value = null;
  }

  function clearGuests() {
    const newGuests = guests.filter((guest) => !guest.selected);
    setGuests(newGuests);
  }
  return (
    <>
      <GuestList
        guests={guests}
        checkGuests={checkGuests}
        selectGuests={selectGuests}
      />
      <input ref={firstNameRef} type="Text"></input>
      <input ref={lastNameRef} type="Text"></input>
      <button onClick={addGuest}>Add Guest</button>
      <button onClick={clearGuests}>Delete Selected </button>
      <div>{guests.length} Guests in total</div>
      <div>
        <h1> Hello there</h1>
        <img src={Lama} alt=""></img>
        <h1>Today is a gooood day!.</h1>
      </div>
    </>
  );
}

export default App;
