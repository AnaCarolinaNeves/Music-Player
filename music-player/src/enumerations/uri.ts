import axios from "axios";

export enum URI {
    ADD_SONG = "/createSong",
    UPDATE_SONG = "/updateSong",
    DELETE_SONG = "/deleteSong",
    GET_SONG = "/song",
    GET_ALL_SONGS = "/allSongs"
}

export const api = axios.create({
    baseURL: 'http://localhost:3001'
    //withCredentials: true
});
