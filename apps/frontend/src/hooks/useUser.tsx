import { useState, useEffect } from 'react';
import axios from 'axios';
import { IUser } from '@shopper/shared/types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const useUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<IUser>(
          `${BACKEND_URL}/users/name/Test User`
        );
        setUser(response.data);
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useUser;