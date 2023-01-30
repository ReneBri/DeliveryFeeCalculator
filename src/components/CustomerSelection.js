import './CustomerSelection.css'
import MenuItem from './MenuItem'

export default function CustomerSelection({customerSelection}) {
  return (
    <div className="customer-selection-container">
        <h3>Your Cart</h3>
        <div className="selection-container">
            {!customerSelection && <p>Click "add item" to add items to your cart</p>}
            {customerSelection && customerSelection.map((item) => {
                return (
                    <div className="item-container" key={Math.random()}>
                        <p>{item.item}</p>
                        <p className="price">{item.price}</p>
                    </div>
                )
            })}
        </div>
    </div>
    
  )
}
