import './Home.css'
import MenuItem from '../../components/MenuItem'

export default function Home() {
    
    return (
        <div>
            <h1>HOME</h1>
            <p>Yummm! Check out our delicious new food!</p>
            <div className="menu-container">
                <MenuItem />
            </div>
        </div>
    )
}