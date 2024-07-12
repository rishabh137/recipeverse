import express from "express"
import 'dotenv/config.js'
import cors from 'cors'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import recipeRoutes from './routes/recipeRoute.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import { fileURLToPath } from 'url';
import path from "path"
import bodyParser from "body-parser"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirnam = path.resolve()

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirnam, "/client/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirnam, "client", "build", "index.html"))
    })
}
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
