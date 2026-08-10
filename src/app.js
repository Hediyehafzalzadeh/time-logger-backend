import express from 'express';
import authRoutes from "./routes/authRoutes.js";

const app = express();



app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

app.use(express.json());

app.use("/api/auth", authRoutes);


export default app;