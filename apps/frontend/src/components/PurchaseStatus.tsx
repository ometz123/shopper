import React from 'react';
import { IPurchase } from '@shopper/shared/types';

interface PurchaseStatusProps {
  purchase: IPurchase | null;
  purchaseSuccess?: boolean;
  purchaseDisable?: boolean;
  purchaseError: string | null;
}

export const PurchaseStatus: React.FC<PurchaseStatusProps> = ({
  purchase,
  purchaseSuccess,
  purchaseDisable,
  purchaseError,
}) => {
  return (
    <>
      { purchaseError && (
        <p className="error-message">{purchaseError}</p>
      )}
      {purchase && purchaseSuccess && !purchaseError && !purchaseDisable && (
        <p className="success-message" style={{ color: 'green' }}>
          Purchase successful!
        </p>
      )}
    </>
  );
};
