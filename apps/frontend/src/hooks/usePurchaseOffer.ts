import { useState } from 'react';
import axios, { AxiosError } from 'axios';

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
  ) => {
    setIsPurchasing(true);
    setPurchaseError(null);
    setPurchaseSuccess(false);
    setExceededLimit(false);

    try {
      const response = await axios.post(`${BACKEND_URL}/purchases`, {
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
          return err.response.data ;
        } else {
          setPurchaseError(err.message || 'Error while purchasing the offer');
        }
      } else {
        setPurchaseError('Error while purchasing the offer');
      }
    } finally {
      setIsPurchasing(false);
    }
  };
  const validateStatus = (status: number) => {
    return status === 404 || status === 200;
  };
  const userOfferPurchase = async (userId: string, offerId: string) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/purchases/user/${userId}/offer/${offerId}`,
        {
          validateStatus,
        }
      );
      return response.data;
    } catch (err) {
      console.log({ err });
      if (err instanceof AxiosError) {
        setPurchaseError(err.message || 'Error while fetching the offer');
      } else {
        setPurchaseError('Error while fetching the offer');
      }
    }
  };

  return {
    purchaseOffer,
    userOfferPurchase,
    isPurchasing,
    purchaseError,
    purchaseSuccess,
    exceededLimit,
  };
};
