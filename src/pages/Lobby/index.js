import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { startQuiz } from "../../actions";
import { Chat } from "../../components";
import {motion} from 'framer-motion'
import pic1 from '../../images/avatars/avatar1.png';
import pic2 from '../../images/avatars/avatar2.png';
import pic3 from '../../images/avatars/avatar3.png';
import pic4 from '../../images/avatars/avatar4.png';
const picArr = [pic1, pic2, pic3, pic4]
const Lobby = () => {
    const data = useSelector((state) => state.quizState);
    const user = useSelector((state) => state.player);
    const socket = useSelector((state) => state.socket);
console.log(data)
    const dispatch = useDispatch();

    const colors = ["lightred", "lightgreen", "lightblue", "orange", "yellow", "pink"];

    function handleClick() {
        dispatch(startQuiz());
        let newState = {
            ...data,
            gameStarted: true,
        };
        socket.emit("send state to players", newState);
    }

    return (
        <section>
            {data.users && (
                <div className="container text-center bg-transparent">
                    <div className="container d-flex justify-content-center bg-transparent">
                        <motion.div className="py-2 text-center col-12 mx-auto"
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
                                        }}>
                            <div className="py-2 text-center col-8 mx-auto shadow border border-primary bg-light rounded">
                            <motion.div className="display-4 player-title"
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
                                        }}>
                                    {data.host}'s Quizzly Game!{" "}
                                </motion.div>
                                <h2 className="text-primary">Waiting for all players...</h2>
                                <div className="d-flex flex-column justify-content-center mt-2">
                                <p className="my-auto mx-auto border-bottom border-dark">Questions: 10</p>
                                <p className="my-auto mx-auto border-bottom border-dark">Category: {data.category}</p>
                                <p className="my-auto mx-auto border-bottom border-dark">Difficulty: {data.difficulty}</p>
                            </div>
                            </div>
                            <section className="row flex-lg-row py-4">

                            <section className="col-5 d-flex flex-row justify-content-center">
                                <div id="message-container"></div>
                                <Chat socket={socket} username={user} room={data.room} />
                            </section>
                            <div className="col-5 d-flex flex-column">
                                {data.users.map((user, index) => {

                                    let color = colors[Math.floor(Math.random() * colors.length)];

                                    return (
                                        <section className="d-flex flex-row justify-content-center">
                                            <motion.div className="card mx-auto bg-transparent p-1 m-1 position-relative"
                                            key={user.name}
                                            style={{ backgroundColor: color, height:"100px", width: "100px"}}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.85 }}
                                        transition={{
                                            default: {
                                                duration: 0.3,
                                                ease: [0, 0.71, 0.2, 1.01],
                                            },
                                            scale: {
                                                type: "spring",
                                                damping: 10,
                                                stiffness: 200,
                                                restDelta: 0.001
                                            }
                                        }}


                                        ><img src={picArr[index]} alt="mypic" className="shadow border rounded-circle"/></motion.div>
                                        <motion.div
                                        className="card mx-auto my-auto w-auto border border-dark rounded p-1 shadow"
                                        key={user.name}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        style={{backgroundColor: color}}
                                        whileHover={{ scale: 1.15 }}
                                        whileTap={{ scale: 0.85 }}
                                        transition={{
                                            default: {
                                                duration: 0.3,
                                                ease: [0, 0.71, 0.2, 1.01],
                                            },
                                            scale: {
                                                type: "spring",
                                                damping: 10,
                                                stiffness: 200,
                                                restDelta: 0.001
                                            }
                                        }}
                                        >
                                            {" "}

                                            <h3 className="mx-auto my-auto p-1">{user.name}</h3>{" "}
                                        </motion.div>
                                        </section>
                                    );
                                })}
                            </div>

                            </section>
                            {data.host === user ? (
                                <div className="container d-flex flex-column align-items-center">
                                    <div className="card text-center my-2 mx-auto shadow border border-primary bg-light rounded">
                                        <div className="p-1">
                                            Share room ID: <b>{data.room}</b>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleClick}
                                        className="btn btn-danger btn-lg my-auto py-auto shadow"
                                    >
                                        START GAME
                                    </button>
                                </div>
                            ) : (
                                <div className="container d-flex flex-column align-items-center">
                                    <div className="card text-center my-1 mx-auto shadow border border-primary bg-light rounded">
                                        <div className="p-1 mb-2">
                                            Share room ID: <b>{data.room}</b>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            )}
            {data.gameStarted && <Navigate to="/play" />}
        </section>
    )
}

export default Lobby;
