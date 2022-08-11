/**
 * @jest-environment jsdom
 */

import { default as Chat } from '.';
import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';

jest.mock('socket.io-client');

describe('SearchForm', () => {
    let propsMock;
    let socket
    
    beforeEach(() => {
        propsMock = jest.fn();
        socket = new MockedSocket();
        socketIOClient.mockReturnValue(socket);
        render(<Chat socket={socket} username={propsMock} room={propsMock} />);
        
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('it renders a button', () => {
        let button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button.textContent).toBe("Send")
    });
    test('it renders a chat box', () => {
        let chatBox = screen.getByRole('textbox');
        expect(chatBox).toBeInTheDocument();
        expect(chatBox.placeholder).toBe("Chat... chat! chat....");
    });
});


// describe('App', () => {
//     test('it renders the landing page with the Join Game Button', () => {
//         renderWithReduxProvider(<App />)
//         const joinGameBtn = screen.getByRole('button', { name: 'Join Game'} )
//         expect(joinGameBtn.textContent).toBe('Join Game')
//     })
// })
