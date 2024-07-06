import { Route, Routes } from "react-router-dom";
import AddSong from "./pages/addSong/AddSong";
import MySong from "./pages/player/Player";

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MySong />} />
                <Route path="/addSong" element={<AddSong />} />
            </Routes>
        </>
    )
}

export default Rotas