import './Home.css'
import MenuItem from '../../components/MenuItem'
import FeeCalculator from '../../components/FeeCalculator'
import { useState } from 'react'
import CustomerSelection from '../../components/CustomerSelection'

export default function Home() {

    const items = [
        {
            item: "Chicken Burger",
            price: 8.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/cheeseburger.webp"
        },
        {
            item: "Veggie Burger",
            price: 8.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/cheeseburger.webp"
        },
        {
            item: "Curly Fries",
            price: 3.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/cheeseburger.webp"
        },
        {
            item: "Chicky Nuggies",
            price: 5.99,
            description: "Lorem ipsum dolor sit amet.",            
            imgUrl: "/cheeseburger.webp"
        },
        {
            item: "Fritz Cola",
            price: 2.99,
            description: "Lorem ipsum dolor sit amet.",
            imgUrl: "/cheeseburger.webp"
        }
]

    const [customerSelection, setCustomerSelection] = useState(null)
    console.log(customerSelection)
    
    return (
        <div className="content-container">
            <h1>HOME</h1>
            <p>Yummm! Check out our delicious new food!</p>
            <div className="order-body">
                <CustomerSelection customerSelection={customerSelection} />
                <MenuItem items={items} setCustomerSelection={setCustomerSelection} customerSelection={customerSelection} />
                <FeeCalculator />
                
            </div>
            
        </div>
        
    )
}