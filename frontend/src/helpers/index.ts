import { parseISO, formatDistanceToNow } from 'date-fns';

/**
 * Converts an ISO string date to a relative time format like '4 minutes ago'.
 * @param isoDate The ISO string date from the backend.
 * @returns The formatted relative time string.
 */
export function formatCreatedAt(isoDate: string): string {
    const date: Date = parseISO(isoDate);
    return formatDistanceToNow(date, { addSuffix: true });
}
