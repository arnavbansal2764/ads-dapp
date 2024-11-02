// components/ConnectWalletButton.tsx
'use client'

import { useState } from 'react';

declare global {
    interface Window {
        ethereum: any;
    }
}
const ConnectWalletButton = () => {
    const [account, setAccount] = useState<string | null>(null);

    const connectWallet = async () => {
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                // Request account access if needed
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });
                setAccount(accounts[0]); // Set the first account
            } catch (error) {
                console.error('Error connecting to wallet:', error);
            }
        } else {
            console.error('MetaMask is not installed!');
        }
    };

    return (
        <button
            onClick={connectWallet}
            className="bg-black text-white py-2 px-4 rounded"
        >
            {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </button>
    );
};

export default ConnectWalletButton;