import { Router, Request, Response } from 'express';
import cors = require("cors");
import { getAllSongs, getSongById, addSong, updateSong, deleteSong } from '../controllers/SongController';

const router = Router();

router.use(cors());

router.get('/allSongs', getAllSongs);
router.get('/song/:id', getSongById);
router.post('/createSong', addSong);
router.put('/updateSong/:id', updateSong);
router.delete('/deleteSong/:id', deleteSong);

router.use((req: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default router;
