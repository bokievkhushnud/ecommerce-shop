import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RegistrationForm from './pages/RegistrationForm';

describe('Checkbox Interaction Test', () => {
  it('should toggle checkboxes and update corresponding state', () => {
    render(<RegistrationForm />);

    const defaultShippingCheckbox = screen.getByLabelText(
      'Set as default address'
    );

    fireEvent.click(defaultShippingCheckbox);

    expect(defaultShippingCheckbox).toBeChecked();
  });
});
