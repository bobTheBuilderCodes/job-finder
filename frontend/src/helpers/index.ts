import { jwtDecode } from 'jwt-decode';
// import * as jwtDecode from 'jwt-decode';
// import jwtDecode from 'jwt-decode';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../app/store';
import { useEffect } from 'react';

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

// export function isAuthenticated() {
//   const token = localStorage.getItem('userToken');
//   if (!token) {
//       return false;
//   }

//   // Optionally verify token validity if possible (e.g., check token expiration for JWT)
//   // For simplicity, we assume here the token, if present, is valid
//   return true;
// }


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








const UserDetails = () => {
  const loggedinUser = useSelector((state: RootState) => state.user.userData);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);



  return {loggedinUser, isLoggedIn}
}

export default UserDetails




// export const loggedinUser = useSelector((state: RootState) => state.user.userData);
  // export const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);