/**
 * @jest-environment jsdom
 */

 import { default as Lobby } from '.';
 import { render, screen } from '@testing-library/react';
 import React from 'react';
 import '@testing-library/jest-dom/extend-expect';
 
 describe('SearchForm', () => {

     beforeEach(() => {
        renderWithReduxProvider(<Lobby />);
         
     });
 
     test('it renders a form', () => {
         let form = screen.getByRole('container');
         expect(form).toBeInTheDocument();
         expect(form.className).toBe("container")
     });
     
 });
