import React, { useEffect, useState } from 'react';
import OfferList from '../components/OfferList';
import { useOffer } from '../hooks/useOffers';
import useUser from '../hooks/useUser';
import './Shop.css';

const Shop: React.FC = () => {
  const { offers, loading, error } = useOffer();
  const { user } = useUser();

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (error) {
      setHasError(true);
    }
  }, [error]);

  return (
    <div className="shop-container">
      <h1>Welcome to the Shop!</h1>
      {loading && <p>Loading offers...</p>}
      {hasError && (
        <p className="error-message">
          Failed to load offers. Please try again later.
        </p>
      )}
      {user && offers && <OfferList offers={offers} user={user} />}
    </div>
  );
};

export default Shop;
