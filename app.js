const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")


const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/" , (req, res) =>{
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,

                }
            }
        ]
    }
    
    const jsonData = JSON.stringify(data)
    const url = "https://us14.api.mailchimp.com/3.0/lists/432fd09e8e"
    const options = {
        method: "POST",
        auth: "NoahCrown:fa3df017005c66c5b5101e31fd88dca1-us14"
    }

    const request = https.request(url, options, (response) =>{
        const statusCode = response.statusCode
        if (statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data))
            
        })
    })

    request.write(jsonData)
    request.end()



})

app.post("/failure", (req,res) =>{
    res.redirect("/")
})




app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000.")
})



// API KEY 
// fa3df017005c66c5b5101e31fd88dca1-us14

// Audience ID 
// 