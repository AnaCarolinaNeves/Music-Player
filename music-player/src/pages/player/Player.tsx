import React, { useEffect, useState, useRef } from 'react';
import Header from '../../components/header/Header';
import './player.css';
import { SkipStart, SkipEnd, Play, Pause } from 'react-bootstrap-icons';
import { api, URI } from '../../enumerations/uri';
import { Song } from '../../types/song';

function Player() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

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
        if (audioRef.current) {
            const audioElement = audioRef.current;

            const updateTime = () => {
                setCurrentTime(audioElement.currentTime);
                setDuration(audioElement.duration);
            };

            const handleEnded = () => {
                setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
            };

            audioElement.load();
            audioElement.addEventListener('timeupdate', updateTime);
            audioElement.addEventListener('loadedmetadata', updateTime);
            audioElement.addEventListener('ended', handleEnded);

            return () => {
                audioElement.removeEventListener('timeupdate', updateTime);
                audioElement.removeEventListener('loadedmetadata', updateTime);
                audioElement.removeEventListener('ended', handleEnded);
            };
        }
    }, [currentSongIndex, songs]);

    useEffect(() => {
        if (audioRef.current) {
            const audioElement = audioRef.current;

            if (isPlaying) {
                const playPromise = audioElement.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                    }).catch((error) => {
                        console.error('Erro ao iniciar a reprodução:', error);
                    });
                }
            } else {
                audioElement.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current && isPlaying) {
            const audioElement = audioRef.current;
            audioElement.play().catch((error) => {
                console.error('Erro ao iniciar a reprodução:', error);
            });
        }
    }, [currentSongIndex, isPlaying]);

    const playPauseHandler = () => {
        setIsPlaying(!isPlaying);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const nextSongHandler = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
        setIsPlaying(true);
    };

    const prevSongHandler = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
        setIsPlaying(true);
    };

    const getFullPath = (path: string) => {
        return `${api.defaults.baseURL}/${path}`;
    };

    const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = event.currentTarget;
        const boundingRect = progressBar.getBoundingClientRect();
        const offsetX = event.clientX - boundingRect.left;
        const progressBarWidth = boundingRect.width;
        const seekTime = (offsetX / progressBarWidth) * duration;

        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
        }
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
                        <div className="progress-area" onClick={handleProgressClick}>
                            <div className="progress-bar" style={{
                                width: `${(currentTime / duration) * 100}%`
                            }} />
                            <div className="song-timer">
                                <span className="current-time">{formatTime(currentTime)}</span>
                                <span className="max-duration">{formatTime(duration)}</span>
                            </div>
                        </div>
                        <div className="controls">
                            <i id="prev" onClick={prevSongHandler}><SkipStart size={32} /></i>
                            <div className="play-pause" onClick={playPauseHandler}>
                                {isPlaying ? <i className="material-icons play"><Pause size={32} /></i> : <i className="material-icons play"><Play size={32} /></i>}
                            </div>
                            <i id="next" onClick={nextSongHandler}><SkipEnd size={32} /></i>
                        </div>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} id="main-audio" src={songs[currentSongIndex]?.audioPath ? getFullPath(songs[currentSongIndex].audioPath) : ''}></audio>
        </>
    );
}

export default Player;
