import React, { useState, useEffect } from 'react';

export default function App2() {
  const baseUrl = 'https://upleveled-api.herokuapp.com/';

  // const [guests, setGuests] = useState([]);

  let [firstName, setFirstName] = useState();
  let [lastName, setLastName] = useState();
  // let [attending, setAttending] = useState();

  let [guestList, setGuestList] = useState([]);

  const localStorageKey = 'guestApp.guests';

  useEffect(() => {
    const storedGuests = JSON.parse(localStorage.getItem(localStorageKey));
    if (storedGuests) setGuestList(storedGuests);
  }, []);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(guestList));
  }, [guestList]);

  async function getGuestList() {
    const response = await fetch(`${baseUrl}/`);
    const allGuests = await response.json();
    setGuestList(allGuests);
  }

  // let checkboxStatus = '';

  // function checkAttendance() {
  //   const status = guestList.map((guest) => guest.attending);
  //   console.log(status);
  //   if (status === true) return (checkboxStatus = 'attending');
  //   else return (checkboxStatus = 'not attending');
  // }
  // checkAttendance();

  function mapGetGuestList() {
    return guestList.map((guest) => {
      console.log(guest.attending);
      return (
        <div key={guest.id}>
          <input
            type="checkbox"
            value={guest.id}
            onChange={() => updateGuest(guest)}
          ></input>
          {guest.id}
          {guest.firstName}
          {guest.lastName}
          <input
            type="checkbox"
            value={guest.id}
            onChange={() => deleteGuest(guest)}
          ></input>
        </div>
      );
    });
  }

  // function addGuest() {
  //   const timestamp = new Date().valueOf();
  //   return setGuests((previousGuests) => {
  //     return [
  //       ...previousGuests,
  //       {
  //         id: timestamp,
  //         attending: false,
  //         firstname: firstName,
  //         lastname: lastName,
  //         selected: false,
  //       },
  //     ];
  //   });
  // }

  async function addNewGuest() {
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
    console.log(createdGuest);
    getGuestList();
  }

  async function updateGuest(guest) {
    const response = await fetch(`${baseUrl}/${guest.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: !guest.attending }),
    });
    const updatedGuest = await response.json();
    console.log(updatedGuest);
    getGuestList();
  }

  async function deleteGuest(guest) {
    const response = await fetch(`${baseUrl}/${guest.id}`, {
      method: 'DELETE',
    });
    const deletedGuest = await response.json();
    console.log(deletedGuest);
    getGuestList();
  }

  // function changeAttendance(id) {
  //   const newGuests = [...guests];
  //   const guest = newGuests.find((a) => a.id === id);
  //   guest.attending = !guest.attending;
  //   setGuests(newGuests);
  //   console.log(id);
  // }

  // function selectDeselect(id) {
  //   const newGuests = [...guests];
  //   const guest = newGuests.find((a) => a.id === id);
  //   guest.selected = !guest.selected;
  //   setGuests(newGuests);
  // }

  // function removeSelected() {
  //   const newGuests = [...guests];
  //   const unSelectedGuests = newGuests.filter((guest) => !guest.selected);
  //   setGuests(unSelectedGuests);
  // }

  // function showGuestList() {
  //   return guests.map((guest) => {
  //     return (
  //       <div key={guest.id}>
  //         <input
  //           type="checkbox"
  //           onChange={() => changeAttendance(guest.id)}
  //           checked={guest.attending}
  //         ></input>
  //         {guest.firstname} {guest.lastname}
  //         <input
  //           type="checkbox"
  //           onChange={() => selectDeselect(guest.id)}
  //           checked={guest.selected}
  //         ></input>
  //       </div>
  //     );
  //   });
  // }

  return (
    <>
      <button onClick={getGuestList}>Get Guestlist</button>
      <h1>Guests coming:</h1>
      {/* {showGuestList()} */}
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
      {/* <button onClick={addGuest}>Add</button>
      <button onClick={removeSelected}>Remove selected</button> */}
      <button onClick={addNewGuest}> Add to Guestlist</button>
    </>
  );
}
