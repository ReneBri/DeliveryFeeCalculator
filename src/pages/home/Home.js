import './Home.css'
import MenuItem from '../../components/MenuItem'
import FeeCalculator from '../../components/FeeCalculator'
import { useState } from 'react'
import CustomerSelection from '../../components/CustomerSelection'

export default function Home() {

    const [isFavourite, setIsFavourite] = useState(false)

    const items = [
        {
            item: "Chicken Burger",
            price: 8.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/images/cheeseburger.webp"
        },
        {
            item: "Veggie Burger",
            price: 8.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/images/cheeseburger.webp"
        },
        {
            item: "Curly Fries",
            price: 3.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/images/cheeseburger.webp"
        },
        {
            item: "Chicky Nuggies",
            price: 5.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/images/cheeseburger.webp"
        },
        {
            item: "Fritz Cola",
            price: 2.99,
            description: "Lorem ipsum dolor sit amet.",
            imgUrl: "/images/cheeseburger.webp"
        }
]

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