import { parseISO, formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';

/**
 * Converts an ISO string date to a relative time format like '4 minutes ago'.
 * @param isoDate The ISO string date from the backend.
 * @returns The formatted relative time string.
 */
export function formatCreatedAt(isoDate: string): string {
  if (!isoDate) {
      return "Date not available"; // Return a default or a placeholder text
  }

  try {
      const date: Date = parseISO(isoDate);
      return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid date"; // Handle parsing errors gracefully
  }
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
