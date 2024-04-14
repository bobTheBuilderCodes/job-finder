import { parseISO, formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';

/**
 * Converts an ISO string date to a relative time format like '4 minutes ago'.
 * @param isoDate The ISO string date from the backend.
 * @returns The formatted relative time string.
 */
export function formatCreatedAt(isoDate: string): string {
    const date: Date = parseISO(isoDate);
    return formatDistanceToNow(date, { addSuffix: true });
}

export const toastify = (message: string, options = {}) => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    ...options,
  });
};
