import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/layouts/Navigation';

describe('Navigation component', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <Navigation />
            </MemoryRouter>
        );
    });
});
