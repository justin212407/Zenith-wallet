import React, { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import QrScanner from "react-qr-scanner";
import Tooltip from "./components/Tooltip"; 

const NETWORK_CONFIG = {
  name: "Open Campus Codex Sepolia",
  rpcUrl: "https://open-campus-codex-sepolia.drpc.org",
  chainId: "0xa045c",
  symbol: "EDU",
  explorer: "https://opencampus-codex.blockscout.com",
};

function App() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [sendAddress, setSendAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [provider, setProvider] = useState(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);

  useEffect(() => {
    const setupProvider = async () => {
      try {
        const newProvider = new ethers.providers.JsonRpcProvider(
          NETWORK_CONFIG.rpcUrl
        );
        setProvider(newProvider);
      } catch (error) {
        alert("Failed to connect to provider: " + error.message);
      }
    };
    setupProvider();
  }, []);

  useEffect(() => {
    if (wallet && provider) {
      updateBalance();
    }
  }, [wallet, provider]);

  const updateBalance = useCallback(async () => {
    if (wallet && provider) {
      setIsLoadingBalance(true);
      try {
        const balance = await provider.getBalance(wallet.address);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        alert("Failed to fetch balance: " + error.message);
      } finally {
        setIsLoadingBalance(false);
      }
    }
  }, [wallet, provider]);

  const createWallet = () => {
    try {
      const newWallet = ethers.Wallet.createRandom().connect(provider);
      setWallet(newWallet);
      alert("New wallet created!");
    } catch (error) {
      alert("Failed to create wallet: " + error.message);
    }
  };

  const resetWallet = () => {
    if (window.confirm("Are you sure you want to reset the wallet?")) {
      setWallet(null);
      setBalance(null);
      alert("Wallet reset successful!");
    }
  };

  const sendEDU = async () => {
    if (!wallet || !sendAddress || !sendAmount) {
      alert("Please fill in all fields");
      return;
    }

    if (!ethers.utils.isAddress(sendAddress)) {
      alert("Invalid recipient address");
      return;
    }

    try {
      const tx = await wallet.sendTransaction({
        to: sendAddress,
        value: ethers.utils.parseEther(sendAmount),
      });

      alert("Transaction in progress...");
      await tx.wait();
      alert(`Sent ${sendAmount} EDU to ${sendAddress}`);
      updateBalance();
    } catch (error) {
      alert("Transaction failed: " + error.message);
    }
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    alert("Wallet address copied to clipboard!");
  };

  const handleScan = (data) => {
    if (data) {
      setSendAddress(data.text);
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    alert("QR scan error. Please try again.");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-center text-2xl font-bold mb-4">Zenith</h1>

        {!wallet ? (
          <button
            onClick={createWallet}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold"
          >
            Create New Wallet
          </button>
        ) : (
          <div className="space-y-6">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-lg font-bold">Balance</p>
              <p className="text-2xl font-semibold">
                {isLoadingBalance ? "Loading..." : `${balance || 0} EDU`}
                <Tooltip message="Your EDU balance on the Open Campus Codex network" />
              </p>
              <p className="text-sm break-all mt-2">
                Address: {wallet.address}
              </p>
              <button
                onClick={copyWalletAddress}
                className="mt-2 text-indigo-400 underline text-sm"
              >
                Copy Address
              </button>
            </div>

            <div className="relative">
              <input
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
                placeholder="Recipient Address"
                value={sendAddress}
                onChange={(e) => setSendAddress(e.target.value)}
              />
              <button
                onClick={() => setShowScanner(true)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
              >
                📷
              </button>
            </div>

            <div>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 placeholder-gray-400"
                type="number"
                placeholder="Amount to Send"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
              />
            </div>

            <button
              onClick={sendEDU}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-semibold"
            >
              Send EDU
            </button>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowQR(true)}
                className="bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Show QR Code
              </button>
              <button
                onClick={resetWallet}
                className="bg-red-500 py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Reset Wallet
              </button>
            </div>

            {showScanner && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <QrScanner
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: "100%" }}
                  />
                  <button
                    onClick={() => setShowScanner(false)}
                    className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg"
                  >
                    Close Scanner
                  </button>
                </div>
              </div>
            )}

            {showQR && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="bg-gray-800 p-6 rounded-lg text-center">
                  <h2 className="text-lg font-bold mb-4">
                    Your Wallet QR Code
                  </h2>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${wallet.address}`}
                    alt="Wallet QR Code"
                    className="mx-auto"
                  />
                  <button
                    onClick={() => setShowQR(false)}
                    className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg"
                  >
                    Close QR
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
