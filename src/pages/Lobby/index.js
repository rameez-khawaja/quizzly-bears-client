import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { startQuiz } from "../../actions";
import { Chat } from "../../components";
import { motion } from 'framer-motion'
import './styles.css'
import pic1 from '../../images/avatars/avatar1.png';
import pic2 from '../../images/avatars/avatar2.png';
import pic3 from '../../images/avatars/avatar3.png';
import pic4 from '../../images/avatars/avatar4.png';
const picArr = [pic1, pic2, pic3, pic4]
const Lobby = () => {
    const data = useSelector((state) => state.quizState);
    const user = useSelector((state) => state.player);
    const socket = useSelector((state) => state.socket);
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
        <section className='container'>
            {data.users && (
                <div className='row justify-content-md-center'>
                    <motion.div className="col-10 mx-auto py-2 text-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{
                            default: {
                                duration: 2,
                                ease: [0, 0.71, 0.2, 1.01],
                            },
                            scale: {
                                type: "spring",
                                damping: 10,
                                stiffness: 400,
                                restDelta: 0.001
                            }
                        }}>
                        <motion.div className="waiting-container py-2 text-center col-8 w-100 shadow border border-secondary bg-transparent rounded"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
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
                            }}><div className="display-4 player-title waiting">
                                {data.host}'s Quizzly Game!{" "}
                            </div>
                            <h2 className="waiting mb-2">Waiting for all players...</h2>
                            <div className="d-flex flex-row justify-content-center mt-2">
                                <p className="waiting my-auto mx-auto border-dark"
                                >Questions: 10</p>
                                <p className="waiting my-auto mx-auto border-dark">Category: {data.category}</p>
                                <p className="waiting my-auto mx-auto border-dark">Difficulty: {data.difficulty}</p>
                            </div>
                        </motion.div>
                        <div className='row mb-3'>
                            <div className="col-sm-8 justify-content-center mt-4">
                                <motion.div id="message-container"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
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
                                    }}> <Chat socket={socket} username={user} room={data.room} />

                                </motion.div>
                            </div>
                            <div className='col-4 d-flex flex-sm-column flex-row mt-4'>

                                {data.users.map((user, index) => {

                                    let color = colors[Math.floor(Math.random() * colors.length)];

                                    return (
                                        <div key={Math.random()} className="m-3">
                                            <motion.div className="card mx-auto bg-transparent p-1 m-1"
                                                key={user.name}
                                                style={{ backgroundColor: color, height: "100px", width: "100px" }}
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.5 }}
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
                                            ><img src={picArr[index]} alt="mypic" className="shadow border rounded-circle" />
                                                <h4 className="mx-auto my-auto p-1 text-light">{user.name}</h4>{" "}
                                            </motion.div>
                                        </div>)
                                })
                                }
                            </div>

                        </div>
                        {data.host === user ? (
                            <div className="row mt-5 mb-5">
                                <motion.div className="col"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
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
                                    <div className="p-1">
                                    <b>Share your room with friends: <span className="border border-light rounded p-1">{data.room}</span></b>
                                    </div>
                                </motion.div>
                                <motion.button
                                    onClick={handleClick}
                                    className="col btn btn-danger"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
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
                                    }}
                                >START GAME</motion.button>
                            </div>
                        ) : (
                            <div className="row mt-5 mb-5">
                                <motion.div className="col"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
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
                                    <div className="p-1">
                                    <b>Share your room with friends: <span className="border border-light rounded p-1">{data.room}</span></b>
                                    </div>
                                </motion.div>
                            </div>)}
                    </motion.div>
                </div>

            )}
            {data.gameStarted && <Navigate to="/play" />}
        </section>

    )
}

export default Lobby;
