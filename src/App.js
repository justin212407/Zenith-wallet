import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const NETWORK_CONFIG = {
  rpcUrl: 'https://open-campus-codex-sepolia.drpc.org',
};

function App() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const setupProvider = async () => {
      const newProvider = new ethers.providers.JsonRpcProvider(NETWORK_CONFIG.rpcUrl);
      setProvider(newProvider);
    };
    setupProvider();
  }, []);

  const createWallet = async () => {
    const newWallet = ethers.Wallet.createRandom().connect(provider);
    setWallet(newWallet);
    const balance = await provider.getBalance(newWallet.address);
    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-center text-2xl font-bold mb-4">EDU Wallet</h1>
        {!wallet ? (
          <button
            onClick={createWallet}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
          >
            Create New Wallet
          </button>
        ) : (
          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-lg font-bold">Balance</p>
            <p className="text-2xl font-semibold">{balance} EDU</p>
            <p className="text-sm mt-2 break-all">Address: {wallet.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
