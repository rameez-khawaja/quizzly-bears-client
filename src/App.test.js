/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import App from './app'

describe('App', () => {
    test('it renders the landing page with the Join Game Button', () => {
        renderWithReduxProvider(<App />)
        const joinGameBtn = screen.getByRole('button', { name: 'Join Game'} )
        expect(joinGameBtn.textContent).toBe('Join Game')
    })
})
