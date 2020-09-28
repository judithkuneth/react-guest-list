import React, { useState } from 'react';

export default function App2() {
  const baseUrl = 'http://localhost:5000';

  const [guests, setGuests] = useState([]);

  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();

  async function addNewGuests() {
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: `${firstName}`,
        lastName: `${lastName}`,
      }),
    });
    const createdGuest = await response.json();
  }

  function addGuest() {
    const timestamp = new Date().valueOf();
    return setGuests((previousGuests) => {
      return [
        ...previousGuests,
        {
          id: timestamp,
          attending: false,
          firstname: firstName,
          lastname: lastName,
          selected: false,
        },
      ];
    });
  }

  function changeAttendance(id) {
    const newGuests = [...guests];
    const guest = newGuests.find((a) => a.id === id);
    guest.attending = !guest.attending;
    setGuests(newGuests);
    console.log(id);
  }

  function selectDeselect(id) {
    const newGuests = [...guests];
    const guest = newGuests.find((a) => a.id === id);
    guest.selected = !guest.selected;
    setGuests(newGuests);
  }

  function removeSelected() {
    const newGuests = [...guests];
    const unSelectedGuests = newGuests.filter((guest) => !guest.selected);
    setGuests(unSelectedGuests);
  }

  const [guestList, setGuestList] = useState([]);

  async function getGuestList() {
    const response = await fetch(`${baseUrl}/`);
    const allGuests = await response.json();
    setGuestList(allGuests);
  }

  function mapGetGuestList() {
    console.log(guestList);
    return guestList.map((guest) => {
      return (
        <div key={guest.id}>
          {guest.firstName} {guest.lastName}
        </div>
      );
    });
  }

  function showGuestList() {
    return guests.map((guest) => {
      return (
        <div key={guest.id}>
          <input
            type="checkbox"
            onChange={() => changeAttendance(guest.id)}
            checked={guest.attending}
          ></input>
          {guest.firstname} {guest.lastname}
          <input
            type="checkbox"
            onChange={() => selectDeselect(guest.id)}
            checked={guest.selected}
          ></input>
        </div>
      );
    });
  }

  return (
    <>
      <h1>Guests coming:</h1>
      {showGuestList()}
      {mapGetGuestList()}
      <input
        id="firstname"
        onChange={(e) => {
          setFirstName(e.currentTarget.value);
        }}
        placeholder="name"
      ></input>
      <input
        id="secondname"
        placeholder="lastname"
        onChange={(e) => {
          setLastName(e.currentTarget.value);
        }}
      ></input>
      <button onClick={addGuest}>Add</button>
      <button onClick={removeSelected}>Remove selected</button>
      <button onClick={addNewGuests}>Add GuestList</button>
      <button onClick={getGuestList}>Get GuestList</button>
    </>
  );
}
