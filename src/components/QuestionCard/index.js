import React, { useState, useEffect } from 'react';
import { useSelector, useDispach } from 'react-redux';
import { Navigate } from 'react-router-dom';
import he from 'he';


export default function QuestionCard({ question }) {

  console.log(question)

  const { category, difficulty, correct_answer, incorrect_answers } = question

  // console.log(category)
  // console.log(difficulty)
  // console.log(correct_answer)
  // console.log(incorrect_answers)

  return (
    <div>"Ich bin eine Question card"</div>
  )
}
