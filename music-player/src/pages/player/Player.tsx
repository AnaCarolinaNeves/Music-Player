import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import './player.css';
import { Repeat, SkipStart, SkipEnd, Play, MusicNoteList, X } from 'react-bootstrap-icons';
import { api, URI } from '../../enumerations/uri'; 
import { Song } from '../../types/song';

function Player() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await api.get<Song[]>(URI.GET_ALL_SONGS);
                setSongs(response.data);
            } catch (error) {
                console.error('Erro ao buscar músicas:', error);
            }
        };
        fetchSongs();
    }, []);

    useEffect(() => {
        const audioElement = document.getElementById('main-audio') as HTMLAudioElement;
        if (audioElement) {
            audioElement.load(); // Carrega a nova música quando currentSongIndex muda
        }
    }, [currentSongIndex]);

    const playPauseHandler = () => {
        const audioElement = document.getElementById('main-audio') as HTMLAudioElement;
        if (audioElement) {
            if (isPlaying) {
                audioElement.pause();
            } else {
                audioElement.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextSongHandler = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    };

    const prevSongHandler = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    };

    const getFullPath = (path: string) => {
        return `${api.defaults.baseURL}/${path}`;
    };

    return (
        <>
            <div className="player-container">
                <Header />
                <div id="body">
                    <div className="wrapper">
                        <div className="top-bar">
                            <span>Now Playing</span>
                        </div>
                        <div className="img-area">
                            <img src={songs[currentSongIndex]?.imgPath ? getFullPath(songs[currentSongIndex].imgPath) : 'default_image_url'} alt="Song cover" />
                        </div>
                        <div className="song-details">
                            <p className="name">{songs[currentSongIndex]?.title || 'Song Name'}</p>
                            <p className="artist">{songs[currentSongIndex]?.artista || 'Artist Name'}</p>
                        </div>
                        <div className="progress-area">
                            <div className="progress-bar">
                                <audio id="main-audio" src={songs[currentSongIndex]?.audioPath ? getFullPath(songs[currentSongIndex].audioPath) : ''}></audio>
                            </div>
                            <div className="song-timer">
                                <span className="current-time">0:00</span>
                                <span className="max-duration">0:00</span>
                            </div>
                        </div>
                        <div className="controls">
                            <i id="repeat-plist"><Repeat size={32} title="Playlist looped" /></i>
                            <i id="prev" onClick={prevSongHandler}><SkipStart size={32} /></i>
                            <div className="play-pause" onClick={playPauseHandler}>
                                <i className="material-icons play"><Play size={32} /></i>
                            </div>
                            <i id="next" onClick={nextSongHandler}><SkipEnd size={32} /></i>
                            <i id="more-music"><MusicNoteList size={32} /></i>
                        </div>
                        <div className="music-list">
                            <div className="header">
                                <div className="row">
                                    <i className="list"><MusicNoteList size={32} /></i>
                                    <span>Music list</span>
                                </div>
                                <i id="close"><X size={32} />close</i>
                            </div>
                            <ul>
                                {songs.map((song, index) => (
                                    <li key={index} onClick={() => setCurrentSongIndex(index)}>
                                        <div className="row">
                                            <span>{song.title}</span>
                                            <p>{song.artista}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Player;
