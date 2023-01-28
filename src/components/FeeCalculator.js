import { useState } from 'react'
import './FeeCalculator.css'

export default function FeeCalculator() {

    const [cartValue, setCartValue] = useState(0)
    const [deliveryDistance, setDeliveryDistance] = useState(0)
    const [numberOfItems, setNumberOfItems] = useState(0)
    const [orderTime, setOrderTime] = useState("")
    

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
                <tr>
                    <th>Food:</th>
                    <th>XXXXX€</th>
                </tr>
                <tr>
                    <th>Delivery:</th>
                    <th>XXXXX€</th>
                </tr>
                <tr>
                    <th>Total:</th>
                    <th>XXXXX€</th>
                </tr>
            </table>
        </div>
    </div>
  )
}
