import React from 'react';
import Header from '../../components/header/Header';
import './player.css';
import image2 from '../../images/01.png';
import { Repeat, SkipStart, SkipEnd, Play, MusicNoteList, ThreeDots, ChevronDown, X } from 'react-bootstrap-icons';

function Player() {
    return (
        <>
            <div className="player-container">
                <Header />
                <div id="body">
                    <div className="wrapper">
                        <div className="top-bar">
                            {/* <i className="material-icons"><ChevronDown size={32} /></i> */}
                            <span>Now Playing</span>
                            {/* <i className="material-icons"><ThreeDots size={32} /></i> */}
                        </div>
                        <div className="img-area">
                            <img src={image2} alt="Song cover" />
                        </div>
                        <div className="song-details">
                            <p className="name">Song Name</p>
                            <p className="artist">Artist Name</p>
                        </div>
                        <div className="progress-area">
                            <div className="progress-bar">
                                <audio id="main-audio" src=""></audio>
                            </div>
                            <div className="song-timer">
                                <span className="current-time">0:00</span>
                                <span className="max-duration">0:00</span>
                            </div>
                        </div>
                        <div className="controls">
                            <i id="repeat-plist"><Repeat size={32} title="Playlist looped" /></i>
                            <i id="prev"><SkipStart size={32} /></i>
                            <div className="play-pause">
                                <i className="material-icons play"><Play size={32} /></i>
                            </div>
                            <i id="next"><SkipEnd size={32} /></i>
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
                                {/* here li list are coming from js */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Player;
