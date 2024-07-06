import * as express from "express";
import * as dotenv from "dotenv";
import songRoutes from "./routes/song";

dotenv.config();

// cria o servidor e coloca na variável app
const app = express();

// suporta parâmetros JSON no body da requisição
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(songRoutes);

const PORT = process.env.PORT || 3001;

// inicializa o servidor na porta especificada
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
