const express = require('express');
const app = express();
require('dotenv').config();
const {dbConnnect} = require('./config/database');
const {cloudinaryConnect} = require('./config/cloudinary');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookiesParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
const profileRoutes = require('./routes/profileRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes')
const contactUsRoutes = require('./routes/contactUsRoutes');
//Define PORT Number to Run Server
const PORT = process.env.PORT || 5000;

//DataBase Connection
dbConnnect()

//Define Middleware
app.use(express.json())

app.use(cookiesParser())

app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

//Cloudinary Connection
cloudinaryConnect()

//Define Routes
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course/', courseRoutes);
app.use('/api/v1/course/', cartRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/reach', contactUsRoutes);
//Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
})

//Server listen
app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
})