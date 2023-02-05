// react fragment
import React from 'react'

// styles
import './MenuItem.css'


export default function MenuItem({items, setCustomerSelection, customerSelection}) {

    // adds item to customer cart
    const handleClick = (item) => {
        setCustomerSelection((prevSelection) => {
            if(prevSelection == null){
                return [item]
            }else{
            return [...prevSelection, item]
            }
        })
    }

    
  return (
    <div className="menu-container">
        {items.map((item) => (
            <React.Fragment key={item.item}>
                <div className="card">
                    <div className="item-text">
                        <h3>{item.item}</h3>
                        <hr></hr>
                        <p className="description">{item.description}</p>
                        <p className="price">${item.price}</p>
                        <button onClick={() => handleClick(item)}>Add Item</button>
                    </div>
                    <img src={item.imgUrl} alt="burger-img"/>     
                </div>
            </React.Fragment>
        ))}
    </div>
  )
}
