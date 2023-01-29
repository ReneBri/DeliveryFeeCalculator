import { useState, React, useEffect } from 'react'
import './FeeCalculator.css'

export default function FeeCalculator({customerSelection}) {

    // declare states for user inputs
    const [cartValue, setCartValue] = useState(0)
    const [deliveryDistance, setDeliveryDistance] = useState(0)
    const [numberOfItems, setNumberOfItems] = useState(0)
    const [orderTime, setOrderTime] = useState("")

    // declare states for delivery fee calculations
    const [cartValueCost, setCartValueCost] = useState(0)
    const [deliveryDistanceCost, setDeliveryDistanceCost] = useState(0)
    const [numberOfItemsCost, setNumberOfItemsCost] = useState(0)
    const [orderTimeCost, setOrderTimeCost] = useState(0)
    
    // updates cartValue & numberOfItems when each new item is added
    useEffect(() => {
        if(customerSelection){
            // sets size of cart based on arr.length
            setNumberOfItems(customerSelection.length)
            // gets cart value from array amd rounds to two decimal points
            let valueStore = customerSelection.reduce((acc, curr) => {
                return acc + curr.price
            }, 0)
            let valueToTwoDecimals = Number(valueStore).toFixed(2)
            setCartValue(valueToTwoDecimals)
        }
    }, [customerSelection])

    // calculating delivery cost
    useEffect(() => {
        // calculating the cart value fee
        if(numberOfItems && cartValue < 10){
            let cost = Number(10 - cartValue).toFixed(2)
            setCartValueCost(cost)
        }else{
            setCartValueCost(0)
        }
        //calculating the number of items fee
        if(numberOfItems && numberOfItems >= 5){
            let cost = Number((numberOfItems - 4) * .50).toFixed(2)
            setNumberOfItemsCost(cost)
            if(numberOfItems >= 12){
                setNumberOfItemsCost(Number.parseFloat(cost) + 1.20)
            }
        }
        // calculating the delivery distance fee
        if(numberOfItems && deliveryDistance < 1000){
            setDeliveryDistanceCost(2)
        }else if(numberOfItems && deliveryDistance > 1000){
            // declaring my recursive function here
            const distanceRecursion = (n) => {
                if(n <= 500){
                    return 1
                }else{
                    return 1 + distanceRecursion(n - 500)
                }
            }
            // using the recursive function here
            let cost = distanceRecursion(deliveryDistance - 1000)
            setDeliveryDistanceCost(2 + cost)
        }
            
        
    }, [numberOfItems, cartValue, deliveryDistance])

    // figuring out my recursion here
    

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
                <p>{cartValueCost}</p>
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
                <p>{deliveryDistanceCost}€</p>
            </label>

            <label>
                <span>items in cart:</span>
                <input 
                    type="number" 
                    onChange={(e) => setNumberOfItems(e.target.value)}
                    value={numberOfItems}
                />
                <p>{numberOfItemsCost}</p>
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
