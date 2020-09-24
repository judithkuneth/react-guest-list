import React from 'react';
import GuestComponent from './GuestComponent';

export default function GuestList({ guests, checkGuests, selectGuests }) {
  return guests.map((guest) => {
    return (
      <GuestComponent
        key={guest.id}
        checkGuests={checkGuests}
        guest={guest}
        selectGuests={selectGuests}
      />
    );
  });
}
