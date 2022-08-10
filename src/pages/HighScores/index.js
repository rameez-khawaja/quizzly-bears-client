import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom'
import './styles.css'
import axios from "axios";

const HighScores = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();
  useEffect(async () => {
    const scoreData = await axios.get("http://localhost:3000/highscores");
    setScores(scoreData.data);
  }, []);

  function sendToHome() {
    navigate('/');
  }

  const renderHighScores = scores.map((rank, index) => {
console.log(scores)
    return (
      <motion.div key={index}
        className="card d-flex flex-row mx-2 mt-3 mb-2 p-2 bg-danger shadow highScoreCard"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 0.9 }}
        exit={{ opacity: 0, scale: 0, x: "-100vh" }}
        whileHover={{ scale: 0.95 }}
        whileTap={{ scale: 0.85 }}
        transition={{
          default: {
            duration: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
          },
          scale: {
            type: "spring",
            damping: 10,
            stiffness: 400,
            restDelta: 0.001
          }
        }}
      >

        <h1 className="mx-3 my-auto">{index + 1}</h1>
        <h1 className="mx-2 my-auto text-dark">{rank.username}</h1>
        <h1 className="mx-2 my-auto text-dark">{rank.score}</h1>

      </motion.div >
    )
  })

  return (
    <main className="d-flex flex-column justify-content-center">

      <motion.h1
        className='title card py-sm-2 px-sm-3 mb-4  bg-warning'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 0.7 }}
        exit={{ opacity: 0, scale: 0.5}}
        whileHover={{ scale: 0.8 }}
        whileTap={{ scale: 0.75 }}
        transition={{
          default: {
            duration: 0.3,
            ease: [0, 0.71, 0.2, 1.01]
          },
          scale: {
            type: "spring",
            damping: 10,
            stiffness: 400,
            restDelta: 0.001
          }
        }}
      >
        Highscores


      </motion.h1>
      <motion.div className="card d-flex flex-column pt-4 px-4 pb-1 shadow"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5}}
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
      >




        <motion.button onClick={sendToHome} className="btn mx-auto text-light leaderboard-home"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 0.8 }}
          exit={{ opacity: 0, scale: 0.5}}
          whileHover={{ scale: 0.85 }}
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
          }}>Home</motion.button>

        {renderHighScores}

      </motion.div >
    </main >
  );
};

export default HighScores;
