import { Request, Response } from 'express';
import  AppDataSource from '../data-source';
import { Song } from '../entities/Song';

// Repositório para a entidade Song
const songRepository = AppDataSource.getRepository(Song);

export const getAllSongs = async (req: Request, res: Response): Promise<Response> => {
    try {
        const songs = await songRepository.find();
        return res.json(songs);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar músicas', error });
    }
};

export const getSongById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const song = await songRepository.findOneBy({ id: Number(req.params.id) });
        if (!song) {
            return res.status(404).json({ message: 'Música não encontrada' });
        }
        return res.json(song);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar música', error });
    }
};

export const addSong = async (req: Request, res: Response): Promise<Response> => {
    try {
        const newSong = songRepository.create(req.body);
        await songRepository.save(newSong);
        return res.status(201).json(newSong);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao adicionar música', error });
    }
};

export const updateSong = async (req: Request, res: Response): Promise<Response> => {
    try {
        const song = await songRepository.findOneBy({ id: Number(req.params.id) });
        if (!song) {
            return res.status(404).json({ message: 'Música não encontrada' });
        }
        songRepository.merge(song, req.body);
        const updatedSong = await songRepository.save(song);
        return res.json(updatedSong);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao atualizar música', error });
    }
};

export const deleteSong = async (req: Request, res: Response): Promise<Response> => {
    try {
        const song = await songRepository.findOneBy({ id: Number(req.params.id) });
        if (!song) {
            return res.status(404).json({ message: 'Música não encontrada' });
        }
        await songRepository.delete(song.id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar música', error });
    }
};
