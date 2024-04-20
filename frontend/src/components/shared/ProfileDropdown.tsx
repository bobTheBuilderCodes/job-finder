// src/components/ProfileDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import { clearUser } from '../../app/userSlice';

interface ProfileDropdownProps {
  avatarUrl: string;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ avatarUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  // Listen for clicks outside of the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const logoutHandler = () => {
dispatch(clearUser())
navigate("/")

  }

  return (
    <div ref={containerRef} className="relative">
      <img
        src={avatarUrl}
        alt="Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1">
         
         
          <Link to="profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
          <p onClick={logoutHandler}  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Log Out</p>
          <Link to="contact-admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Contact Admin</Link>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
