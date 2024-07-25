import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Set to keep track of displayed messages
const displayedMessages = new Set<string>();

/**
 * Displays a toast message if it hasn't been displayed before.
 * @param {string} msg - The message to display.
 * @param {ToastOptions} options - Additional options for the toast.
 */
const showToastIfNotDisplayed = (msg: string, options: ToastOptions): void => {
  if (!displayedMessages.has(msg)) {
    // Display the toast
    toast(msg, options);

    // Add the message to the set to mark it as displayed
    displayedMessages.add(msg);
  }
};

const showToastIfDisplayed = (msg: string, options: ToastOptions): void => {
  toast(msg, options);
  displayedMessages.add(msg);
};

/**
 * Displays a success toast message.
 * @param {string} msg - The success message.
 */
export const successAlert = (msg: string): void =>
  showToastIfNotDisplayed(msg, { type: 'success' });

/**
 * Displays an info toast message.
 * @param {string} msg - The info message.
 */
export const infoAlert = (msg: string): void =>
  showToastIfNotDisplayed(msg, { type: 'info' });

/**
 * Displays a warning toast message.
 * @param {string} msg - The warning message.
 */
export const warningAlert = (msg: string): void =>
  showToastIfNotDisplayed(msg, { type: 'warning' });

export const warningAlert2 = (msg: string): void =>
  showToastIfDisplayed(msg, { type: 'warning' });

export const errorAlert2 = (msg: string): void =>
  showToastIfDisplayed(msg, { type: 'error' });

/**
 * Displays an error toast message.
 * @param {string} msg - The error message.
 */
export const errorAlert = (msg: string): void =>
  showToastIfNotDisplayed(msg, { type: 'error', style: { width: '20vw' } });
