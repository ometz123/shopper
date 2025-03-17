import React, { useEffect, useState } from 'react';
import { IOffer, IPurchase, IUser } from '@shopper/shared/types';
import { usePurchaseOffer } from '../hooks/usePurchaseOffer';
import './OfferCard.css';

interface OfferCardProps {
  offer: IOffer;
  user: IUser;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, user }) => {
  const [purchaseDisable, setPurchaseDisable] = useState(false);
  const {
    purchaseOffer,
    isPurchasing,
    purchaseError,
    purchaseSuccess,
    exceededLimit,
    userOfferPurchase,
  } = usePurchaseOffer();
  const [purchase, setPurchase] = useState<IPurchase | null>(null);

  // Handle successful purchase
  useEffect(() => {
    if (exceededLimit) {
      setPurchaseDisable(true);
    }
  }, [purchaseSuccess]);

  useEffect(() => {
    const fetchUserOfferPurchase = async () => {
      const purchaseData = await userOfferPurchase(user.id, offer.id);
      setPurchase(purchaseData);
    };

    fetchUserOfferPurchase();
  }, []);

  const handlePurchase = async () => {
    setPurchase(await purchaseOffer(user.id, offer.id, 1));
  };

  return (
    <div className="offer-card">
      <img src={offer.imageUrl} alt={offer.name} className="offer-image" />
      <div className="offer-details">
        <h3>{offer.name}</h3>
        <p>{offer.description}</p>
        <p>Price: ${offer.price}</p>
        <p>Remaining Limit: {offer.limitPerUser - (purchase?.quantity || 0)}</p>

        {/* Purchase button */}
        <button
          onClick={handlePurchase}
          disabled={
            exceededLimit ||
            purchaseDisable ||
            offer.limitPerUser - (purchase?.quantity || 0) <= 0 ||
            isPurchasing
          }
          className="buy-button"
        >
          {isPurchasing
            ? 'Purchasing...'
            : purchaseDisable
            ? 'Purchased'
            : offer.limitPerUser - (purchase?.quantity || 0) <= 0
            ? 'Limit Exceeded'
            : 'Buy'}
        </button>

        {/* Display purchase error */}
        {purchase && purchaseError && (
          <p className="error-message">{purchaseError}</p>
        )}

        {/* Display success message */}
        {purchase && purchaseSuccess && !purchaseError && !purchaseDisable && (
          <p className="success-message" style={{ color: 'green' }}>
            Purchase successful!
          </p>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
