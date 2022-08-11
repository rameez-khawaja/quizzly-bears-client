import React from 'react';

import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';

import { quizzlyReducer } from '../reducers/index';

const TestProviders = ({ initState }) => {
    initState ||= {
        quizState: {},
        socket: {},
        player: ""
    }

    const testStore = createStore(() => quizzlyReducer(initState, { type: '@@INIT' }))
    // let testReducer = () => quizzlyReducer(initState, { type: '@@INIT' })
    // const testStore = createStore(testReducer)


    return ({ children }) => (
        <Provider store={testStore}>
            <Router>
            { children }
            </Router>
        </Provider>
    )

}

const renderWithReduxProvider = (ui, options={}) => {
    let TestWrapper = TestProviders(options)
    render(ui, { wrapper: TestWrapper, ...options })
}

import axios from 'axios';
jest.mock('axios')
axios.get.mockResolvedValue({ data: { message: [] }})

global.renderWithReduxProvider = renderWithReduxProvider;
global.React = React;
