import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of serachValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="testing" />);

    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('testing');
  });

  it('should call handleChange function on each key pressed', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="testing" />);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'new value';
    userEvent.type(input, value); // A função não altera o dado
    expect(input.value).toBe('testing');
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<TextInput searchValue="" handleChange={fn} />);
    expect(container).toMatchSnapshot();
  });
});
