import { useState, useEffect } from 'react';
import axios from 'axios';
import { IOffer } from '@shopper/shared/types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const useOffer = () => {
  const [offers, setOffers] = useState<IOffer[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get<IOffer[]>(`${BACKEND_URL}/offers`);
        setOffers(response.data);
      } catch (err) {
        setError('Failed to fetch offer');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading, error };
};
