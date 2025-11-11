import { render, screen, fireEvent } from '@testing-library/react';
import MessageInput from '../app/chat/components/MessageInput';
test('calls onSend with typed message', () => {
    const send = jest.fn();
    render(<MessageInput onSend={send} />);
    const input = screen.getByTestId('message-input');
    const btn = screen.getByTestId('send-button');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(btn);
    expect(send).toHaveBeenCalledWith('Hello');
});