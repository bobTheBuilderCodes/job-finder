import { jwtDecode } from 'jwt-decode';

import { parseISO, formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { RootState } from '../app/store';
import { useEffect } from 'react';

/**
 
 * @param isoDate 
 * @returns 
 */
export function formatCreatedAt(isoDate: string): string {
  if (!isoDate) {
      return "Date not available"; 
  }

  try {
      const date: Date = parseISO(isoDate);
      return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
      console.error("Error parsing date:", error);
      return "Invalid date"; 
  }
}




export const toastify = (message: string, options = {}) => {
  toast(message, {
    position: "top-right",
    autoClose: 5001,
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


