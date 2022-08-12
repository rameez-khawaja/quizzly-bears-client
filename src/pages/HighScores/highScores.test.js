/**
 * @jest-environment jsdom
 */

 import { default as HighScores } from '.';
 import { render, screen } from '@testing-library/react';
 import React from 'react';
 import '@testing-library/jest-dom/extend-expect';
 import { BrowserRouter as Router } from 'react-router-dom'
 
 describe('SearchForm', () => {

     beforeEach(() => {
        render(<HighScores />);
         
     });
 
     test('it renders a form', () => {
         let form = screen.getByText('Home');
         expect(form).toBeInTheDocument();
         expect(form.textContent).toBe("Home")
     });
     
 });
