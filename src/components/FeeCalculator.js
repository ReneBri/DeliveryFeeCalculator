import { useState, React, useEffect } from 'react'
import './FeeCalculator.css'

export default function FeeCalculator({customerSelection}) {

    const [cartValue, setCartValue] = useState(0)
    const [deliveryDistance, setDeliveryDistance] = useState(0)
    const [numberOfItems, setNumberOfItems] = useState(0)
    const [orderTime, setOrderTime] = useState("")
    
    useEffect(() => {
        if(customerSelection){
            setNumberOfItems(customerSelection.length)
            setCartValue(customerSelection.reduce((acc, curr) => {
                return acc + curr.price
            }, 0))
        }
    }, [customerSelection])

  return (
    <div className="fee-calculator">
        <form>

            <label>
                <span>cart value:</span>
                <input 
                    type="number" 
                    onChange={(e) => setCartValue(e.target.value)}
                    value={cartValue}
                />
            </label>

            <label>
                <span>delivery distance:</span>
                <input 
                    type="range" 
                    min="0" 
                    max="5000"
                    onChange={(e) => setDeliveryDistance(e.target.value)}
                    value={deliveryDistance}
                />
                <p>{deliveryDistance}m</p>
            </label>

            <label>
                <span>items in cart:</span>
                <input 
                    type="number" 
                    onChange={(e) => setNumberOfItems(e.target.value)}
                    value={numberOfItems}
                />
            </label>

            <label>
                <span>order time:</span>
                <input 
                    type="datetime-local" 
                    onChange={(e) => setOrderTime(e.target.value)}
                    value={orderTime}
                />
            </label>
            <button>submit</button>
        </form>

        <div className="delivery-totals">
            <table>
                <tbody>
                    <tr>
                        <td>Food:</td>
                        <td>{cartValue}€</td>
                    </tr>
                    <tr>
                        <td>Delivery:</td>
                        <td>XXXXX€</td>
                    </tr>
                    <tr>
                        <td>Total:</td>
                        <td>XXXXX€</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="customer-selection">
        </div>
    </div>
  )
}
