import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { IPurchase } from '@shopper/shared/types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const usePurchaseOffer = () => {
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean>(false);
  const [exceededLimit, setExceededLimit] = useState<boolean>(false);

  const purchaseOffer = async (
    userId: string,
    offerId: string,
    quantity: number
  ):Promise<IPurchase|null> => {
    setIsPurchasing(true);
    setPurchaseError(null);
    setPurchaseSuccess(false);
    setExceededLimit(false);

    try {
      const response = await axios.post<IPurchase>(`${BACKEND_URL}/purchases`, {
        userId,
        offerId,
        quantity,
      });
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        setPurchaseSuccess(true);
      } else {
        setPurchaseError('Some Error from server');
      }
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response && err.response.status === 406) {
          console.log(err);
          setExceededLimit(true);
          setPurchaseError('Purchase not allowed. Please check offer limits.');
          return err.response.data;
        } else {
          setPurchaseError(err.message || 'Error while purchasing the offer');
        }
      } else {
        setPurchaseError('Error while purchasing the offer');
      }
    } finally {
      setIsPurchasing(false);
    }
    return null
  };

  const userOfferPurchase = async (
    userId: string,
    offerId: string
  ): Promise<IPurchase | null> => {
    try {
      const response = await axios.get<IPurchase>(
        `${BACKEND_URL}/purchases/user/${userId}/offer/${offerId}`
      );
      return response.data;
    } catch (err) {
      console.log({ err });
      if (err instanceof AxiosError) {
        setPurchaseError(err.message || 'Error while fetching the offer');
      } else {
        setPurchaseError('Error while fetching the offer');
      }
      return null;
    }
  };

  const userOffersPurchases = async (
    userId: string,
    offerIds: string[]
  ): Promise<IPurchase[] | null> => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/purchases/user/${userId}`,
        offerIds
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log({ err });
      if (err instanceof AxiosError) {
        setPurchaseError(err.message || 'Error while fetching the offer');
      } else {
        setPurchaseError('Error while fetching the offer');
      }
      return null
    }
  };

  return {
    purchaseOffer,
    userOfferPurchase,
    userOffersPurchases,
    isPurchasing,
    purchaseError,
    purchaseSuccess,
    exceededLimit,
  };
};
