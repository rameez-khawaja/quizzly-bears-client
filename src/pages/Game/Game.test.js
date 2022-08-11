/**
 * @jest-environment jsdom
 */

 import { default as Game } from '.';
 import { render, screen } from '@testing-library/react';
 import React from 'react';
 import '@testing-library/jest-dom/extend-expect';
 
 describe('SearchForm', () => {

     beforeEach(() => {
        renderWithReduxProvider(<Game />);
         
     });
 
     test('it renders a form', () => {
         let form = screen.getByRole('heading');
         expect(form).toBeInTheDocument();
     });
     
 });
