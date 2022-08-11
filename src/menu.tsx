
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import PubSub from 'pubsub-js'

interface Props {
  change: (id: number, value: string) => void
}

function getItem(label: string, key: any, children?: { key: any;  children: any; label: any;}[] | undefined) {
  return {
    key,
    children,
    label,
  };
}

const MenuCom = (props: Props) => {
  const [items, setItems] = useState([
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Navigation One', 'sub1' ,[
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
    getItem('Navigation Two', 'sub2', [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
    ]),
  ])

  const getLabel = (id: string ) => {
    let val: any;
    items.forEach(item => {
      if (item.children) {
        item.children.forEach(v => {
          if (v.key === id) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            val = v.label;
          }
        })
      } else {
        if (item.key === id) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          val = item.label;
        }
      }
    })
    return val;
  };

  const updateItem = (id: number, value: string ) => {
    items.forEach(item => {
      if (item.children) {
        item.children.forEach(v => {
          if (v.key === id) {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            v.label = value;
          }
        })
      } else {
        if (item.key === id) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          item.label = value;
        }
      }
    })
    setItems([...items]);
  };

  useEffect(() => {
      PubSub.subscribe('change',(mag,data) => {
        updateItem(data.id.toString(), data.value)
      })
  }, [])

  return (
    <div
      style={{
        width: 256,
      }}
    >
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        // onClick={(e) => console.log(e)}
        onSelect={(e) => {
          props.change(Number(e.key), getLabel(e.key))
        }}
        inlineCollapsed={false}
        items={items}
      />
    </div>
  );
};

export default MenuCom;