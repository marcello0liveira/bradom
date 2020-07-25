import React, { useState } from 'react';
import list from './data';

function App() {
  const [value, setValue] = useState('');
  return (
    [
    <input value={value} onChange={ev => setValue(ev.target.value)} />,
    <li className="red">
      {
        list
        .filter(item => value ? value === item.substr(0, value.length) : true)
        .map(item => (<li>{item}</li>))
      }
              
    </li>
    ]
  );
}

export default App;
