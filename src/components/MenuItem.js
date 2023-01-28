import React from 'react'
import './MenuItem.css'

export default function MenuItem({items}) {


  return (
    <div className="menu-container">
        {items.map((item) => (
            <React.Fragment key={item.item}>
                <div className="card">
                    <div className="item-text">
                        <h3>{item.item}</h3>
                        <hr></hr>
                        <p>{item.description}</p>
                        <p>${item.price}</p>
                        <button>Add Item</button>
                    </div>
                    <img src={item.imgUrl}/>     
                </div>
            </React.Fragment>
        ))}
    </div>
  )
}
