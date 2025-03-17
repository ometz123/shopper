import React, { useEffect, useState } from 'react';
import OfferCard from './OfferCard';
import { IOffer, IPurchase, IUser } from '@shopper/shared/types';
import './OfferList.css';
import { usePurchaseOffer } from '../hooks/usePurchaseOffer';

interface OfferListProps {
  offers: IOffer[];
  user: IUser;
}

const OfferList: React.FC<OfferListProps> = ({ offers, user }) => {
  const { userOffersPurchases } = usePurchaseOffer();
  const [purchases, setPurchases] = useState<IPurchase[] | null>(null);
  const [offersWithPurchases, setOffersWithPurchases] = useState<
    (IOffer & { purchase: IPurchase | null })[]
  >([]);
  useEffect(() => {
    if (user && offers) {
      const fetchUserOfferPurchase = async () => {
        const purchasesData = await userOffersPurchases(
          user.id,
          offers.map((o) => o.id)
        );
        setPurchases(purchasesData);
      };

      fetchUserOfferPurchase();
    }
  }, [offers, user]);

  useEffect(() => {
    if (purchases) {
      const updatedOffers = offers.map((offer) => {
        const purchase: IPurchase | null =
          purchases.find((purchase) => purchase.offerId === offer.id) || null;
        return { ...offer, purchase };
      });
      setOffersWithPurchases(updatedOffers);
    }
  }, [purchases, offers]);

  // const offersWithPurchases = offers.map((offer) => {
  //   const purchase: IPurchase | null =
  //     purchases?.find((purchase) => purchase.offerId === offer.id) || null;
  //   return { ...offer, purchase };
  // });

  return (
    <div className="offer-list">
      {/*{ offers.length > 0 ? (*/}
      {/*  offers.map((offer) => (*/}
      {/*    <OfferCard key={offer.id} offer={offer} user={user} />*/}
      {/*  ))*/}
      {/*) : (*/}
      {/*  <p>No offers available at the moment.</p>*/}
      {/*)}*/}
      {offersWithPurchases.length > 0 ? (
        offersWithPurchases.map(({ purchase, ...offer }) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            user={user}
            userOfferPurchase={purchase}
          />
        ))
      ) : (
        <p>No offers available at the moment.</p>
      )}
    </div>
  );
};

export default OfferList;
