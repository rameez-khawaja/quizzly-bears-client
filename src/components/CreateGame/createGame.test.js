/**
 * @jest-environment jsdom
 */

 import { default as CreateGame } from '.';
 import { render, screen } from '@testing-library/react';
 import React from 'react';
 import '@testing-library/jest-dom/extend-expect';
 
 describe('SearchForm', () => {

     beforeEach(() => {

        renderWithReduxProvider(<CreateGame />);
         
     });
 
     test('it renders a form', () => {
         let form = screen.getByRole('form');
         expect(form).toBeInTheDocument();
         expect(form.className).toBe("card pb-2")
     });
     
     
 });
