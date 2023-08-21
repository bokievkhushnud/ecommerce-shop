import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotFound from '../pages/NotFound';
import { MemoryRouter } from 'react-router-dom';
import { Matcher, MatcherOptions } from '@testing-library/react';

describe('NotFound component', () => {
    let getByText: (
        text: Matcher,
        options?: MatcherOptions | undefined,
        waitForElementOptions?: unknown
    ) => HTMLElement;

    beforeEach(() => {
        const component = render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        );
        getByText = component.getByText;
    });

    it('renders without crashing', () => {
        const header = getByText('404: Page Not Found');
        expect(header).toBeInTheDocument();
    });

    it('displays explanatory message', () => {
        const message = getByText(
            /Oops! It looks like the page you're looking for doesn't exist./i
        );
        expect(message).toBeInTheDocument();
    });

    it('provides a Back to Home button', () => {
        const button = getByText('Back to Home');
        expect(button).toBeInTheDocument();
    });
});
