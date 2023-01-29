import { useState, React, useEffect } from 'react'
import './FeeCalculator.css'

export default function FeeCalculator({customerSelection}) {

    // get a date string for automatic time/date detection on the order time
    const date = new Date()
    const timeArray = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes()
    ]
    // formats the time/date so that each with start with a 0 if under 10
    const newArray = timeArray.map((item) => {
        if(item < 10){
            return item = "0" + item
        }else{
            return item
        }
    })
    // creating this string to feed into the time/date input for an up to date initial value
    const initialDateString = `${newArray[0]}-${newArray[1]}-${newArray[2]}T${newArray[3]}:${newArray[4]}`
   

    // declare states for user inputs
    const [cartValue, setCartValue] = useState(0)
    const [deliveryDistance, setDeliveryDistance] = useState(0)
    const [numberOfItems, setNumberOfItems] = useState(0)
    const [orderTime, setOrderTime] = useState(initialDateString)

    // declare states for delivery fee calculations
    const [cartValueCost, setCartValueCost] = useState(0)
    const [deliveryDistanceCost, setDeliveryDistanceCost] = useState(0)
    const [numberOfItemsCost, setNumberOfItemsCost] = useState(0)
    const [deliverySubTotal, setDeliverySubTotal] = useState(0)
    const [fridayRushSurcharge, setFridayRushSurcharge] = useState(false)
    
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

    // calculating various delivery costs
    useEffect(() => {
        // calculating the cart value fee
        if(numberOfItems > 0 && cartValue < 10){
            let cost = Number(10 - cartValue).toFixed(2)
            setCartValueCost(cost)
        }else{
            setCartValueCost(Number(0).toFixed(2))
        }
        //calculating the number of items fee
        if(numberOfItems > 0 && numberOfItems >= 5){
            let cost = Number((numberOfItems - 4) * .50).toFixed(2)
            setNumberOfItemsCost(cost)
            if(numberOfItems >= 12){
                setNumberOfItemsCost(Number.parseFloat(cost) + 1.20)
            }
        }
        // calculating the delivery distance fee
        if(numberOfItems > 0 && deliveryDistance < 1000){
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
        // setting the Friday rush surcharge to true or false
        if(numberOfItems > 0 && orderTime){
            let date = new Date(orderTime)
            let day = date.getDay()
            let hour = date.getHours()
            if(day === 5 && hour === 15 || hour === 16 || hour === 17 || hour === 18 || hour === 19 ){
                setFridayRushSurcharge(true)
            }else{
                setFridayRushSurcharge(false)
            }
        }

        
    }, [numberOfItems, cartValue, deliveryDistance, orderTime])

    // calculating the delivery subtotal
    useEffect(() => {
        let subtotal = Number(cartValueCost) + Number(numberOfItemsCost) + Number(deliveryDistanceCost)
        subtotal = Number(subtotal).toFixed(2)
        if(cartValue >= 100){
            setDeliverySubTotal("FREE")
        }else if(fridayRushSurcharge){
            subtotal = Number(subtotal *= 1.2).toFixed(2)
            if(subtotal > 15){
                setDeliverySubTotal(15)
            }else{
                setDeliverySubTotal(subtotal)
            }
        }else if(subtotal > 15){
            setDeliverySubTotal(15)
        }else{
            setDeliverySubTotal(subtotal)
        }
        
    }, [cartValueCost, numberOfItemsCost, deliveryDistanceCost, orderTime])
    

  return (
    <div className="fee-calculator">
        <form>

            <label>
                <span>cart value:</span>
                <input 
                    type="number" 
                    onChange={(e) => setCartValue(e.target.value)}
                    value={cartValue}
                    min="0"
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
                <p>{orderTime}</p>
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
                        <td>{deliverySubTotal}€</td>
                    </tr>
                    <tr>
                        <td>Total:</td>
                        <td>{Number(Number(deliverySubTotal) + Number(cartValue)).toFixed(2)}€</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="customer-selection">
        </div>
    </div>
  )
}
