const express = require("express");//Importing express
const app = express();
const mongoose = require("mongoose");//Importing mongoose
const UserModel = require('./models/Users');
const PORT = process.env.PORT || 3002;
require("dotenv").config(); // Load environment variables from .env file
const DB = process.env.DATABASE_URL;

let cors = require("cors");//Cross-origin resource sharing (basically, connecting the frontend to the database)

app.use(express.json());//To allow express to use the json formats
app.use(cors());

mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  }
);


//API calls for express--> (request,response)
//Updated syntax
//.get for fetching data from the database
app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Do not use await and async as it takes more wait time for the document to be fetched 
app.post("/createUser", (req, res) => {
  const user = req.body;//requesting for new user input from frontend
  const newUser = new UserModel(user);//adding new user to usermodel
  newUser.save();

  res.json(user);//asking for response back from server
});


app.listen(PORT, () => {
  console.log("Server is running perfectly!");
});