import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeUser } from "../../actions";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { motion } from 'framer-motion';

const categoryMap = {
    "General Knowledge": 9,
    "Entertainment: Books": 10,
    "Entertainment: Comics": 29,
    "Entertainment: Film": 11,
    "Entertainment: Music": 12,
    "Entertainment: Musicals & Theatres": 13,
    "Entertainment: Television": 14,
    "Entertainment: Video Games": 15,
    "Entertainment: Japanese Anime & Manga": 31,
    "Entertainment: Cartoon & Animations": 32,
    "Entertainment: Board Games": 16,
    "Science & Nature": 17,
    "Science: Computers": 18,
    "Science: Mathematics": 19,
    "Mythology": 20,
    "Sports": 21,
    "Geography": 22,
    "History": 23,
    "Politics": 24,
    "Art": 25,
    "Celebrities": 26,
    "Animals": 27,
    "Vehicles": 28,
    "Science: Gadgets": 30
};

export default function CreateGame() {

    const [username, setUsername] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const [lobbyCode, setLobbyCode] = useState("");
    const [checkForm, setCheckForm] = useState(false);

    const dispatch = useDispatch();
    const socket = useSelector((state) => state.socket);

    function lobbyCodeGenerator() {
        let result = "";
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = 9;
        for (let i = 0; i < charactersLength; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    async function getQuestions(cat, diff) {
        const url = `https://opentdb.com/api.php?amount=10&category=${categoryMap[cat]}&difficulty=${diff}&type=multiple`;
        const { data } = await axios.get(url);
        return data.results;
    }

    const handleUsername = (e) => setUsername(e.target.value);
    const handleCategory = (e) => setCategory(e.target.value);
    const handleDifficulty = (e) => setDifficulty(e.target.value);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLobbyCode(lobbyCodeGenerator)
        const questions = await getQuestions(category, difficulty);
        socket.emit("create game", {
            room: lobbyCode,
            category,
            difficulty,
            host: username,
            questions,
        });
        dispatch(storeUser(username));
        setUsername("");
        setCategory("");
        setDifficulty("");
        setCheckForm(true);
    };
    const dropdownItems = Object.keys(categoryMap).map(item => <option key={item} value={item}>{item}</option>)

    return (

        <section className='col-12 py-5'>
            <div className='container bg-light card text-center py-3 col-lg-4 col-md-6 col-sm-8 col-12 w-auto'>
                <form onSubmit={handleFormSubmit} className="card pb-2">
                    <div className='py-2'>
                        <label>Username:</label>
                        <input label='Username' placeholder="Username" onChange={handleUsername} value={username} className="form-control border-secondary my-2 w-75 mx-auto" />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className="w-75 mx-lg-5" >
                            <label className="py-2">Category:</label>
                            <select value={category} onChange={handleCategory} className="form-select border border-secondary rounded">
                                <option defaultValue="Pick a Category">Pick a Category</option>
                                {dropdownItems}
                            </select>
                        </div>
                    </div>
                    <div className='mx-auto my-2'>
                        <label className='my-2'>Difficulty:</label>
                        <select value={difficulty} onChange={handleDifficulty} className="form-select border border-secondary rounded">
                            <option defaultValue="easy">Easy</option >
                            <option value="medium">Medium</option >
                            <option value="hard">Hard</option >
                        </select >
                    </div>

                    <div className='create-input'>
                    <motion.button className="btn btn-primary my-2"
                    type="submit"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                default: {
                                    duration: 0.3,
                                    ease: [0, 0.71, 0.2, 1.01],
                                },
                                scale: {
                                    type: "spring",
                                    damping: 10,
                                    stiffness: 400,
                                    restDelta: 0.001
                                }
                            }}>Create Game</motion.button>
                    </div>
                </form>
                {checkForm && <Navigate to='/lobby' />}
            </div>
        </section>
    )
}
