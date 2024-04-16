const express = require('express')
const bcrypt = require('bcrypt')
const path = require('path')
const { collection, mongoConn } = require('./config')

mongoConn()
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:3000'
}))

// Register User
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        saved: [],
        following: []
    }

    console.log(data)
    //  first check whether user already exist
    const existingUser = await collection.findOne({ email: data.email })
    if (existingUser) {
        res.send({ success: false })
        // res.send("Email already exist.Please try another name")
    }
    else {
        // hash the paswword using bcrypt
        const saltRounds = 10;//Number of saltrounds for bcrypt
        const hashPassword = await bcrypt.hash(data.password, saltRounds)
        data.password = hashPassword

        const userdata = await collection.insertMany(data);
        console.log(userdata)
        res.send({ success: true })
    }

})


// Login user
app.post("/login", async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        //  first check whether email exist
        const existingUser = await collection.findOne({ email: data.email })
        if (!existingUser) {
            // res.send("Email doesn't exist.Enter correct username")
            res.send({ success: false, message: "Email doesn't exist" })
            // res.redirect("localhost:5000/")
        } else {
            const isPasswordMatch = await bcrypt.compare(data.password, existingUser.password)
            if (isPasswordMatch) {
                res.send({ success: true, message: "Login Successfull", existingUser })
            }
            else {
                res.send({ success: false, message: "Wrong password entered" })
            }
        }
    }
    catch {
        // res.status(404)
        res.send('error wrong details entered')
    }

})



app.post("/login/save", async (req, res) => {
    const data = {
        email: req.body.email,
        name: req.body.name
    }
    const existingUser = await collection.updateOne(
        { email: data.email }, 
        {name: data.name}
    ).then((res) => {
        res.send({ success: true, message: "Login Saved", res: res })
    }).catch((err => {
        res.send({ success: false, message: "Login not Saved", err: err })
    }))
})

app.post("/login/delete", async (req, res) => {
    const data = {
        email: req.body.email,
    }
    const existingUser = await collection.deleteOne(
        { email: data.email }
    ).then((res) => {
        res.send({ success: true, message: "Login Deleted", res: res })
    }).catch((err => {
        res.send({ success: false, message: "Login not Deleted", err: err })
    }))
})


app.post("/saved", async (req, res) => {
    const data = {
        email: req.body.email
    }
    console.log(data)
    const user = await collection.findOne({ email: data.email })
    console.log(user)
    res.send({saved: user.saved})
})

app.post("/saved/add", async (req, res) => {
    const data = {
        email: req.body.email,
        card: req.body.card
    }
    await collection.updateOne({ email: data.email },{ $push: { saved: data.card }})
    res.send({success: true})
})

app.post("/saved/remove", async (req, res) => {
    const data = {
        email: req.body.email,
        card: req.body.card
    }
    await collection.updateOne({ email: data.email },{ $pull: { saved: data.card }})
    res.send({success: true})
})

app.post("/following", async (req, res) => {
    const data = {
        email: req.body.email
    }
    const user = await collection.findOne({ email: data.email })
    res.send({following: user.following})
})

app.post("/following/add", async (req, res) => {
    const data = {
        email: req.body.email,
        card: req.body.card
    }
    await collection.updateOne({ email: data.email },{ $push: { following: data.card }})
    res.send({success: true})
})

app.post("/following/remove", async (req, res) => {
    const data = {
        email: req.body.email,
        card: req.body.card
    }
    await collection.updateOne({ email: data.email },{ $pull: { following: data.card }})
    res.send({success: true})
})

const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on port:${port}`)
})