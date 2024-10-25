import React from 'react';
import { useRouter } from 'next/navigation';

interface UpgradePromptProps {
  message: string;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({ message }) => {
  const router = useRouter();

  const handleUpgrade = async () => {
    const formData = new FormData();
    formData.append('priceId', 'price_1QDBkXHmVldeJPIKWaaqdBON');

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push(response.url);
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <p className="text-red-500 mb-4">{message}</p>
      <button
        onClick={handleUpgrade}
        className="w-full bg-[#111111] text-white py-2 px-4 rounded-[40px] hover:bg-gray-800 transition-colors"
      >
        Upgrade to Premium
      </button>
    </div>
  );
};

export default UpgradePrompt;