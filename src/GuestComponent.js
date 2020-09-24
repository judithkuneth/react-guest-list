import React from 'react';

export default function GuestComponent({ guest, checkGuests, selectGuests }) {
  function checkGuestsClick() {
    checkGuests(guest.id);
  }

  function checkGuestsSelect() {
    selectGuests(guest.id);
  }
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={guest.attending}
          onChange={checkGuestsClick}
        ></input>
        {guest.firstName} {guest.lastName}
        <input
          type="checkbox"
          checked={guest.selected}
          onChange={checkGuestsSelect}
        ></input>
      </label>
    </div>
  );
}
