import { Router } from 'express';
import * as cors from 'cors';
import * as multer from 'multer';
import { getAllSongs, getSongById, addSong, updateSong, deleteSong } from '../controllers/SongController';

const router = Router();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

router.use(cors(corsOptions));

const upload = multer({ dest: 'uploads/' }); 

router.get('/allSongs', getAllSongs);
router.get('/song/:id', getSongById);
router.post('/createSong', upload.fields([
    { name: 'imgPath', maxCount: 1 },
    { name: 'audioPath', maxCount: 1 }
]), addSong);
router.put('/updateSong/:id', updateSong);
router.delete('/deleteSong/:id', deleteSong);

router.use((req, res) => res.json({ error: "Requisição desconhecida" }));

export default router;
