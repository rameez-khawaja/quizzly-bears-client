import React, { useState, useEffect } from 'react';
import { useSelector, useDispach } from 'react-redux';
import { Navigate } from 'react-router-dom';
import he from 'he';


export default function QuestionCard({ questions }) {
  const quizState = useSelector((state) => state.quizState)
  const socket = useSelector((state) => state.socket)
  const player = useSelector((state) => state.player)
  const { question, category, difficulty, correct_answer, incorrect_answers } = questions



  return (
    <div>"Ich bin eine Question card"</div>
  )
}
