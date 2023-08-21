import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('App component', () => {
    it('renders without crashing', () => {
        render(<App />);
    });
});
