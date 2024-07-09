import * as express from "express";
import * as dotenv from "dotenv";
import * as path from "path";
import songRoutes from "./routes/song";

dotenv.config();

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta de uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(songRoutes);

// Middleware para tratar requisições desconhecidas
app.use((req, res) => res.json({ error: "Requisição desconhecida" }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
