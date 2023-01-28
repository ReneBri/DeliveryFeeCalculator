import React from 'react'
import './MenuItem.css'

export default function MenuItem() {

    const items = [
        {
            item: "Chicken Burger",
            price: 8.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus pulvinar nisi sed commodo. Pellentesque nec mauris varius, vehicula arcu id, aliquam quam. Donec eros neque, fermentum id bibendum mattis, dignissim in dolor. Donec ligula odio, eleifend et egestas in, tristique quis diam. ",
            imgUrl: "/cheeseburger.webp"
        },
        {
            item: "Veggie Burger",
            price: 8.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus pulvinar nisi sed commodo. Pellentesque nec mauris varius, vehicula arcu id, aliquam quam. Donec eros neque, fermentum id bibendum mattis, dignissim in dolor. Donec ligula odio, eleifend et egestas in, tristique quis diam. ",
            imgUrl: "/cheeseburger.webp"
        },
        {
            item: "Curly Fries",
            price: 3.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus pulvinar nisi sed commodo. Pellentesque nec mauris varius, vehicula arcu id, aliquam quam. Donec eros neque, fermentum id bibendum mattis, dignissim in dolor. Donec ligula odio, eleifend et egestas in, tristique quis diam. ",
            imgUrl: "/cheeseburger.webp"
        },
        {
            item: "Chicky Nuggies",
            price: 5.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus pulvinar nisi sed commodo. Pellentesque nec mauris varius, vehicula arcu id, aliquam quam. Donec eros neque, fermentum id bibendum mattis, dignissim in dolor. Donec ligula odio, eleifend et egestas in, tristique quis diam. ",
            imgUrl: "/cheeseburger.webp"
        },
        {
            item: "Fritz Cola",
            price: 2.99,
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce faucibus pulvinar nisi sed commodo. Pellentesque nec mauris varius, vehicula arcu id, aliquam quam. Donec eros neque, fermentum id bibendum mattis, dignissim in dolor. Donec ligula odio, eleifend et egestas in, tristique quis diam. ",
            imgUrl: "/cheeseburger.webp"
        }
]

    console.log(items[1].item)

  return (
    <>
        {items.map((item) => (
            <React.Fragment key={item.item}>
                <div className="card">
                    <div className="card-image">
                        <img src={item.imgUrl}/>     
                    </div>
                    <div className="item-text">
                        <h3>{item.item}</h3>
                        <hr></hr>
                        <p>{item.description}</p>
                        <p>${item.price}</p>
                        <button>Add Item</button>
                    </div>
                </div>
            </React.Fragment>
        ))}
    </>
  )
}
