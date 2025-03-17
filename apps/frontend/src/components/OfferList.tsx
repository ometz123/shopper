import React, { useEffect } from 'react';
import OfferCard from './OfferCard';
import { IOffer, IUser } from '@shopper/shared/types';
import './OfferList.css';

interface OfferListProps {
  offers: IOffer[] | null;
  user: IUser | null;
}

const OfferList: React.FC<OfferListProps> = ({ offers, user }) => {

  return (
    <div className="offer-list">
      {Array.isArray(offers) && user && offers.length > 0 ? (
        offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} user={user} />
        ))
      ) : (
        <p>No offers available at the moment.</p>
      )}
    </div>
  );
};

export default OfferList;
