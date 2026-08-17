import express from 'express';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/taskRoutes.js";
import categoryRoutes from "./routes/categoryRouter.js";
import cors from "cors";

const app = express();


app.use(cors({
  origin: "http://localhost:3000",
   credentials: true,
}));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);



export default app;