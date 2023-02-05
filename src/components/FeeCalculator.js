// hooks
import { useState, React, useEffect } from 'react'

// styles
import './FeeCalculator.css'


export default function FeeCalculator({customerSelection, setCustomerSelection}) {

    // gets date values for automatic time/date detection on the order time
    const getInitialDateTime = () => {
        
        const date = new Date()
        const timeArray = [
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
            date.getHours(),
            date.getMinutes()   
        ]
        // formats the time/date so that each will start with a 0 if under 10
        const formattedTimeArray = timeArray.map((item) => {
            if(item < 10){
                return item = "0" + item
            }else{
                return item
            }
        })
        // creating this string to feed into the time/date input for an up to date initial value
        return `${formattedTimeArray[0]}-${formattedTimeArray[1]}-${formattedTimeArray[2]}T${formattedTimeArray[3]}:${formattedTimeArray[4]}`
}
    
   

    // declare states for user inputs
    const [cartValue, setCartValue] = useState(Number(0).toFixed(2))
    const [deliveryDistance, setDeliveryDistance] = useState(0)
    const [numberOfItems, setNumberOfItems] = useState(0)
    const [orderTime, setOrderTime] = useState(getInitialDateTime)
    const [isTestMode, setIsTestMode] = useState(false)

    // declare states for delivery fee calculations
    const [cartValueCost, setCartValueCost] = useState(0)
    const [deliveryDistanceCost, setDeliveryDistanceCost] = useState(0)
    const [numberOfItemsCost, setNumberOfItemsCost] = useState(0)
    const [deliverySubTotal, setDeliverySubTotal] = useState(0)
    const [fridayRushSurcharge, setFridayRushSurcharge] = useState(false)

    // handling button for test mode
    const handleTestMode = () => {
        isTestMode ? setIsTestMode(false) : setIsTestMode(true)
    }

    // handling button for cart reset
    const handleCartReset = () => {
        setCustomerSelection(null)
        setDeliveryDistance(0)
        setOrderTime(getInitialDateTime)
        setDeliveryDistanceCost(0)
        setCartValue(Number(0).toFixed(2))
        setNumberOfItems(0)
        setNumberOfItemsCost(0)
    }
    

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
        if(orderTime){
            let date = new Date(orderTime)
            let day = date.getDay()
            let hour = date.getHours()
            
            if(day === 5){
                if(hour === 15 || hour === 16 || hour === 17 || hour === 18){
                    setFridayRushSurcharge(true)
                }else{
                    setFridayRushSurcharge(false)
                }
            }else{
                setFridayRushSurcharge(false)
            }
        }
    }, [numberOfItems, cartValue, deliveryDistance, orderTime, fridayRushSurcharge])


    // calculating the delivery subtotal
    useEffect(() => {
        let subtotal = Number(cartValueCost) + Number(numberOfItemsCost) + Number(deliveryDistanceCost)
        subtotal = Number(subtotal).toFixed(2)
        if(cartValue >= 100){
            setDeliverySubTotal("FREE")
        }else if(fridayRushSurcharge){
            subtotal = Number(subtotal *= 1.2).toFixed(2)
            if(subtotal > 15){
                setDeliverySubTotal(Number(15).toFixed(2))
            }else{
                setDeliverySubTotal(subtotal)
            }
        }else if(subtotal > 15){
            setDeliverySubTotal(Number(15).toFixed(2))
        }else{
            setDeliverySubTotal(subtotal)
        }
        
    }, [cartValueCost, numberOfItemsCost, deliveryDistanceCost, orderTime, fridayRushSurcharge, cartValue])
    

  return (
    <div className="fee-calculator">

        <div className="button-container">
            <button onClick={handleTestMode}>Test Mode</button>
            <button onClick={handleCartReset}>Reset Cart</button>
        </div>
    
        <form className="delivery-fee-calc">

            <label>
                <span>Cart Value:</span>
                <input 
                    type="number" 
                    onChange={(e) => setCartValue(e.target.value)}
                    value={cartValue}
                    min="0"
                />
                <p>{isTestMode && cartValueCost + "€"}</p>
            </label>

            <label>
                <span>Delivery Distance:</span>
                <input 
                    type="range" 
                    min="0" 
                    max="5000"
                    onChange={(e) => setDeliveryDistance(e.target.value)}
                    value={deliveryDistance}
                />
                <p>{deliveryDistance}m</p>
                <p>{isTestMode && deliveryDistanceCost + "€"}</p>
            </label>

            <label>
                <span>Items in Cart:</span>
                <input 
                    type="number" 
                    onChange={(e) => setNumberOfItems(e.target.value)}
                    value={numberOfItems}
                />
                <p>{isTestMode && numberOfItemsCost + "€"}</p>
            </label>

            <label>
                <span>Order Time:</span>
                <input 
                    type="datetime-local" 
                    onChange={(e) => setOrderTime(e.target.value)}
                    value={orderTime}
                />
                <p>{isTestMode && "Friday surcharge: " + fridayRushSurcharge.toString()}</p>
            </label>
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
                        <td>{deliverySubTotal !== "FREE" ? deliverySubTotal + "€" : deliverySubTotal}</td>
                    </tr>
                    <tr>
                        <td>Total:</td>
                        <td>{deliverySubTotal !== "FREE" ? Number(Number(deliverySubTotal) + Number(cartValue)).toFixed(2) : cartValue}€</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="customer-selection">
        </div>
    </div>
  )
}
