import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainPage from '../pages/MainPage';

describe('MainPage component', () => {
    it('renders title correctly', () => {
        render(<MainPage />);
        expect(
            screen.getByText("Welcome to Grandma's Shop")
        ).toBeInTheDocument();
    });

    it('renders subtitle correctly', () => {
        render(<MainPage />);
        expect(
            screen.getByText("We'll remind you of your grandma's cooking.")
        ).toBeInTheDocument();
    });
});
