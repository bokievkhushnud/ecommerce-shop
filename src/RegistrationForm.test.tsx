import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import RegistrationForm from './pages/RegistrationForm'; // Adjust the import path as needed

describe('Checkbox Interaction Test', () => {
  it('should toggle checkboxes and update corresponding state', () => {
    render(<RegistrationForm />);

    const defaultShippingCheckbox = screen.getByLabelText(
      'Set as default address'
    );
    // const useAsBillingCheckbox = screen.getByLabelText('Also use this address as my billing address');

    fireEvent.click(defaultShippingCheckbox);
    // fireEvent.click(useAsBillingCheckbox);

    expect(defaultShippingCheckbox).toBeChecked();
    // expect(useAsBillingCheckbox).toBeChecked();
  });
});
