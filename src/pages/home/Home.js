// hooks
import { useState } from 'react'

// styles
import './Home.css'

// components
import MenuItem from '../../components/MenuItem'
import FeeCalculator from '../../components/FeeCalculator'
import CustomerSelection from '../../components/CustomerSelection'


export default function Home() {

    // Hi, I apologise that this isn't in TypeScript. I found out a week before 
    // it's due date that this intern program exists and didn't have enough time 
    // to both learn Typescript and create this project. If I make it through to 
    // interviews and am given 4-5 days notice, I will happily do any technical 
    // interview questions in TypeScript.

    // sets favorite icon to red
    const [isFavourite, setIsFavourite] = useState(false)

    // menu items array to be passed into the MenuItem component
    const items = [
        {
            item: "Chicken Burger",
            price: 8.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/images/chickenburger.avif"
        },
        {
            item: "Veggie Burger",
            price: 8.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/images/cheeseburger.avif"
        },
        {
            item: "Curly Fries",
            price: 3.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/images/curly-fries.avif"
        },
        {
            item: "Chicky Nuggies",
            price: 5.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/images/fries.avif"
        },
        {
            item: "Coca-Cola",
            price: 2.99,
            description: "Lorem ipsum dolor sit amet.",
            imgUrl: "/images/cola.avif"
        }
]

    // state for customer cart
    const [customerSelection, setCustomerSelection] = useState(null)
    
    return (
        <div className="content-container">
            <div className="hero-container">
                <h1>Rene's Burgers</h1>
                <p>The Best Damn Burgers in all of Berlin!!</p>
                <div className="info-bar">
                    <div className="lefthand-container">
                        <div className="happiness-meter">
                            <i className="material-symbols-outlined gold">star</i>
                            <p>10/10</p>
                        </div>
                        <div className="price-meter">
                            <i className="material-symbols-outlined">euro</i>
                            <i className="material-symbols-outlined">euro</i>
                            <i className="material-symbols-outlined">euro</i>
                            <i className="material-symbols-outlined faint">euro</i>
                            <i className="material-symbols-outlined faint">euro</i>
                        </div>
                    </div>
                <i 
                    className={isFavourite ? "material-symbols-outlined red fav" : "material-symbols-outlined faint fav"}
                    onClick={(e) => {isFavourite ? setIsFavourite(false) : setIsFavourite(true)}}>favorite</i>
                </div>
            </div>
            <div className="order-body">
                <CustomerSelection customerSelection={customerSelection} />
                <MenuItem items={items} setCustomerSelection={setCustomerSelection} customerSelection={customerSelection} />
                <FeeCalculator customerSelection={customerSelection} setCustomerSelection={setCustomerSelection} />
            </div>
            
        </div>
        
    )
}