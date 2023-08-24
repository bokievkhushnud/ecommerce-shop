import { Screen } from '@testing-library/react';

declare module '@testing-library/react' {
  interface Screen {
    getByLabelText: (
      ...args: Parameters<Screen['getByLabelText']>
    ) => ReturnType<Screen['getByLabelText']>;
  }
}

declare const customScreen: Screen;

export default customScreen;
