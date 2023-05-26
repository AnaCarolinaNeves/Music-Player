import { Route, Routes } from "react-router-dom";
import AddSong from "./pages/addSong/AddSong";
import MySong from "./pages/mySongs/MySong";

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<AddSong />} />
                <Route path="/mySongs" element={<MySong />} />
            </Routes>
        </>
    )
}

export default Rotas