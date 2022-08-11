/**
 * @jest-environment jsdom
 */

 import { default as QuestionCard } from '.';
 import { render, screen } from '@testing-library/react';
 import React from 'react';
 import '@testing-library/jest-dom/extend-expect';
 
 describe('SearchForm', () => {
    let propsMock;
    let questionDetails = { question: "a", category: "b", difficulty: "c", correct_answer: "d", incorrect_answers:["a", "b", "c"] }
    
     beforeEach(() => {
        propsMock = jest.fn();
        renderWithReduxProvider(<QuestionCard questionDetails={questionDetails} questionNumber={propsMock} />);
         
     });
 
     test('it renders a bar', () => {
         let bar = screen.getByRole('bar');
         expect(bar).toBeInTheDocument();
         expect(bar.className).toBe("time-left progress-bar progress-bar-striped progress-bar-animated bg-warning rounded")
     });
     
 });
