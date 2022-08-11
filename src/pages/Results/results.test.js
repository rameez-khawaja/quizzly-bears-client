/**
 * @jest-environment jsdom
 */

 import { default as Results } from '.';
 import { render, screen } from '@testing-library/react';
 import React from 'react';
 import '@testing-library/jest-dom/extend-expect';
 import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';

jest.mock('socket.io-client');

 
 describe('SearchForm', () => {
    let socket
     beforeEach(() => {
        socket = new MockedSocket();
        socketIOClient.mockReturnValue(socket);
        renderWithReduxProvider(<Results socket={socket}/>);
         
     });
 
     test('it renders a form', () => {
         let form = screen.getByRole('heading');
         expect(form).toBeInTheDocument();
         expect(form.textContent).toBe("Game Results")
     });
     
 });
