import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainPage from '../pages/MainPage';

describe('MainPage component', () => {
    it('renders title correctly', () => {
        const { getByText } = render(<MainPage />);
        expect(getByText("Welcome to Grandma's Shop")).toBeInTheDocument();
    });

    it('renders subtitle correctly', () => {
        const { getByText } = render(<MainPage />);
        expect(
            getByText("We'll remind you of your grandma's cooking.")
        ).toBeInTheDocument();
    });
});
