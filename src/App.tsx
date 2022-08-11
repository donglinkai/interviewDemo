import React, { useRef, useState } from 'react';
import './App.css';
import MenuCom from './menu';
import 'antd/dist/antd.css';
import { Button, Input } from 'antd';

import PubSub from 'pubsub-js'
function App() {
  const [value, setValue] = useState('');
  const idRef = useRef<number>();
  const edit = () => {
   PubSub.publish('change', { id: idRef.current, value })
  };

  const change = (id: number, value: string) => {
    setValue(value)
    idRef.current = id;
  }
  return (
    <div className="App">
      <div className='menu'>
        <MenuCom change={change}/>
      </div>
      <div className='form'>
        <Input value={value} onChange={e => setValue(e.target.value)}/>
         <Button onClick={edit}>编辑</Button>
      </div>

    </div>
  );
}

export default App;
