require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const express = require('express');
const cors = require("cors");

const domain = "http://localhost:5173";
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    const items = req.body.items;
    let lineItems = [];

    items.forEach(item => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: domain,
        cancel_url: domain,
    })

    res.send(JSON.stringify({
        url: session.url
    }))
})

app.listen(process.env.PORT || 3000, () => console.log("listening on port 3000"));