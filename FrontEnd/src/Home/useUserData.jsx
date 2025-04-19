import { useState, useEffect } from 'react';

const useUserData = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));
  
    useEffect(() => {
      const handleStorageChange = () => {
        setUserData(JSON.parse(localStorage.getItem('userData')));
      };
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);
  
    return userData;
  };
  
  export default useUserData;