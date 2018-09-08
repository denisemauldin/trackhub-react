import React from 'react';

const inputToJSON = (data) => {
  data = JSON.stringify(data, null, 2)
  console.log('stuff and things will magincally happen :', data);
}

export default inputToJSON