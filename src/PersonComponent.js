import React from 'react';

export default function PersonComponent(props) {
  return props.guests.map(function (a) {
    return (
      <div key={a.id}>
        {a.firstname} {a.lastname}
      </div>
    );
  });
}
