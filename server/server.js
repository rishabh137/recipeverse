import express from "express"
import 'dotenv/config.js'
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js'
import recipeRoutes from './routes/recipeRoute.js'
import path from "path"
import bodyParser from "body-parser"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '5mb' }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
