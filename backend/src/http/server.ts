import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from '../routes/task.routes';
import authRouter from '../routes/auth.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send("hello world");
});

app.use('/api', router);
app.use("/api", authRouter)

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
