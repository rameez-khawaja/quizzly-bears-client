import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { startQuiz } from "../../actions";
import { Chat } from "../../components";

const Lobby = () => {
    const state = useSelector((state) => state);
    const data = useSelector((state) => state.quizState);
    const user = useSelector((state) => state.player);
    const socket = useSelector((state) => state.socket);
    console.log(state)

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
                        <div className="py-2 text-center col-8 mx-auto">
                            <div className="py-2 text-center col-8 mx-auto shadow border border-primary bg-light rounded">
                                <h1 className="display-4 player-title">
                                    {data.host}'s Quizzly Game!{" "}
                                </h1>
                                <h2 className="text-primary">Waiting for all players...</h2>
                            </div>
                            <div className="d-flex">
                                {data.users.map((user) => {

                                    let color = colors[Math.floor(Math.random() * colors.length)];

                                    return (
                                        <div
                                            className="card mx-auto border border-dark rounded p-1 m-1 shadow"
                                            key={user.name}
                                            style={{ backgroundColor: color }}
                                        >
                                            {" "}
                                            <h3><i class="fa-solid fa-shield text-danger"></i> {user.name} <i class="fa-solid fa-shield text-danger"></i></h3>{" "}
                                        </div>
                                    );
                                })}
                            </div>
                            <section className="d-flex flex-row justify-content-center">
                                <div id="message-container"></div>
                                <Chat socket={socket} username={user} room={data.roomName} />
                            </section>
                            {data.host === user ? (
                                <div className="container d-flex flex-column align-items-center">
                                    <div className="card text-center my-1 mx-auto shadow border border-primary bg-light rounded">
                                        <div className="p-1">
                                            Share room ID: <b>{data.roomName}</b>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleClick}
                                        className="btn btn-danger btn-sm my-auto py-auto shadow"
                                    >
                                        START GAME
                                    </button>
                                </div>
                            ) : (
                                <div className="container d-flex flex-column align-items-center">
                                    <div className="card text-center my-1 mx-auto shadow border border-primary bg-light rounded">
                                        <div className="p-1">
                                            Share room ID: <b>{data.roomName}</b>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {console.log(data)}
                </div>
            )}
            {data.gameStarted && <Navigate to="/game" />}
        </section>
    )
}

export default Lobby;
