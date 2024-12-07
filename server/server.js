const path =require('path') 
const express =require('express') 
const dotenv =require('dotenv') 
const cookieParser =require('cookie-parser')
const cors = require('cors')
const connectToMongoDB =require('./config/db')
const {app, server} =require('./socket/socket')

const authRoutes =require('./routes/auth.routes.js')
const messageRoutes =require('./routes/message.routes.js')
const userRoutes =require('./routes/user.routes.js') 
dotenv.config();


app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



server.listen(process.env.PORT, () => {
	connectToMongoDB();
    console.log(`MongoDB Connected`);
	console.log(`Server Running on port ${process.env.PORT}`);
});