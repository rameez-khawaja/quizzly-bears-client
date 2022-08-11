import React, {useState, useEffect} from 'react'
import {motion, AnimatePresence} from "framer-motion"

const audioTune = new Audio('./the-catchy-tune.mp3');


const Header = () => {

    return (
        <>
        <audio media-player="audioPlayer" autoplay preload="auto" id="audioElement"
                crossOrigin="anonymous" src={audioTune}></audio>
        <section className="container">
            <header className="text-center py-3 mx-5">
                <div>
                    <motion.h1
        className='text-light display-5'
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 0.7 }}
        exit={{ opacity: 0, scale: 0, x: "-100vh"}}
        whileHover={{ scale: 0.8 }}
        transition={{
            delay: 0.3,
            x: { duration: 2 },
            default: { ease: "linear" }
          }}
      >Quizzly Bears
      </motion.h1>
                </div>
                <hr className="mx-5 bg-dark"/>
             </header>

        </section>
      </>

     );
}

export default Header;
