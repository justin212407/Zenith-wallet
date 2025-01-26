import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import QrScanner from "react-qr-scanner";
import Tooltip from "./components/Tooltip";
import { motion } from "framer-motion";

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
        showNotification("Failed to connect to provider", "error");
      }
    };
    setupProvider();
  }, []);

  useEffect(() => {
    if (wallet && provider) {
      updateBalance();
    }
  }, [wallet, provider]);

  const updateBalance = async () => {
    if (wallet && provider) {
      setIsLoadingBalance(true);
      try {
        const balance = await provider.getBalance(wallet.address);
        setBalance(ethers.utils.formatEther(balance));
      } catch (error) {
        showNotification("Failed to fetch balance", "error");
      } finally {
        setIsLoadingBalance(false);
      }
    }
  };

  const createWallet = () => {
    try {
      const newWallet = ethers.Wallet.createRandom().connect(provider);
      setWallet(newWallet);
      showNotification("New wallet created!", "success");
    } catch (error) {
      showNotification("Failed to create wallet", "error");
    }
  };

  const resetWallet = () => {
    if (window.confirm("Are you sure you want to reset the wallet?")) {
      setWallet(null);
      setBalance(null);
      showNotification("Wallet reset successful!", "success");
    }
  };

  const sendEDU = async () => {
    if (!wallet || !sendAddress || !sendAmount) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    if (!ethers.utils.isAddress(sendAddress)) {
      showNotification("Invalid recipient address", "error");
      return;
    }

    try {
      const tx = await wallet.sendTransaction({
        to: sendAddress,
        value: ethers.utils.parseEther(sendAmount),
      });

      showNotification("Transaction in progress...", "info");
      await tx.wait();
      showNotification(`Sent ${sendAmount} EDU to ${sendAddress}`, "success");
      updateBalance();
    } catch (error) {
      showNotification("Transaction failed", "error");
    }
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(wallet.address);
    showNotification("Wallet address copied to clipboard!", "success");
  };

  const handleScan = (data) => {
    if (data) {
      setSendAddress(data.text);
      setShowScanner(false);
    }
  };

  const handleError = (err) => {
    console.error(err);
    showNotification("QR scan error. Please try again.", "error");
  };

  const showNotification = (message, type) => {
    const notification = document.createElement("div");
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${
      type === "success"
        ? "bg-green-500"
        : type === "error"
        ? "bg-red-500"
        : "bg-blue-500"
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-br from-black via-purple-900 to-gray-900 text-white min-h-screen p-6 font-mono">
      <div className="max-w-md mx-auto bg-purple-950 rounded-lg shadow-lg p-6 border border-purple-800">
        <motion.h1
          className="text-center text-3xl font-bold mb-4 text-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Phantom Crypt
        </motion.h1>

        {!wallet ? (
          <motion.button
            onClick={createWallet}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create New Wallet
          </motion.button>
        ) : (
          <div className="space-y-6">
            <div className="bg-purple-900 p-4 rounded-lg border border-purple-700">
              <p className="text-lg font-bold">Balance</p>
              <p className="text-2xl font-semibold">
                {isLoadingBalance ? "Loading..." : `${balance || 0} EDU`}
                <Tooltip message="Your EDU balance on the Open Campus Codex network" />
              </p>
              <p className="text-sm break-all mt-2 text-purple-400">
                Address: {wallet.address}
              </p>
              <button
                onClick={copyWalletAddress}
                className="mt-2 text-purple-500 underline text-sm hover:text-purple-400"
              >
                Copy Address
              </button>
            </div>

            <div className="relative">
              <input
                className="w-full p-3 rounded-lg bg-purple-900 border border-purple-700 placeholder-purple-500"
                placeholder="Recipient Address"
                value={sendAddress}
                onChange={(e) => setSendAddress(e.target.value)}
              />
              <button
                onClick={() => setShowScanner(true)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-purple-700 hover:bg-purple-800 text-white p-2 rounded-lg"
              >
                📷
              </button>
            </div>

            <div>
              <input
                className="w-full p-3 rounded-lg bg-purple-900 border border-purple-700 placeholder-purple-500"
                type="number"
                placeholder="Amount to Send"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
              />
            </div>

            <motion.button
              onClick={sendEDU}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send EDU
            </motion.button>

            <div className="flex justify-between mt-4">
              <motion.button
                onClick={() => setShowQR(true)}
                className="bg-purple-800 py-2 px-4 rounded-lg hover:bg-purple-700"
                whileHover={{ scale: 1.05 }}
              >
                Show QR Code
              </motion.button>
              <motion.button
                onClick={resetWallet}
                className="bg-red-600 py-2 px-4 rounded-lg hover:bg-red-500"
                whileHover={{ scale: 1.05 }}
              >
                Reset Wallet
              </motion.button>
            </div>

            {showScanner && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="bg-purple-900 p-6 rounded-lg border border-purple-700">
                  <QrScanner
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: "100%" }}
                  />
                  <motion.button
                    onClick={() => setShowScanner(false)}
                    className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    Close Scanner
                  </motion.button>
                </div>
              </div>
            )}

            {showQR && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                <div className="bg-purple-900 p-6 rounded-lg text-center border border-purple-700">
                  <h2 className="text-lg font-bold mb-4 text-purple-400">
                    Your Wallet QR Code
                  </h2>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${wallet.address}`}
                    alt="Wallet QR Code"
                    className="mx-auto"
                  />
                  <motion.button
                    onClick={() => setShowQR(false)}
                    className="mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-500"
                    whileHover={{ scale: 1.05 }}
                  >
                    Close QR
                  </motion.button>
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
