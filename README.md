# Zenith Wallet

Zenith Wallet is a Telegram Mini App designed to provide a seamless, user-friendly cryptocurrency wallet experience. It allows users to create, manage, and interact with their wallets, send and receive EDU tokens, and enjoy real-time balance updates.

## Live Demo

[Zenith Wallet](https://open-campus-edu-app.vercel.app)

| Image | Description | Image | Description |
|-------|-------------|-------|-------------|
| <img src="https://github.com/user-attachments/assets/a331c0ce-6fd8-4afc-a396-5bcf25f038b5" width="300"> | Wallet creation and management interface | <img src="https://github.com/user-attachments/assets/079ab265-bfd6-4495-85f8-31e4ed9918cb" width="300"> | Sending and receiving EDU tokens |
| <img src="https://github.com/user-attachments/assets/3cb38795-773e-49d0-9d14-9d9977fcc870" width="300"> | QR code scanning for wallet addresses | <img src="https://github.com/user-attachments/assets/fbde7faf-13b6-4b46-b405-5b33b6a3595b" width="300"> | Real-time balance updates |

PPT - [Zenith-Simplifying-Cryptocurrency-Wallets.pptx](https://github.com/user-attachments/files/18562179/Zenith-Simplifying-Cryptocurrency-Wallets.pptx)

## Technology Stack
- Frontend: React.js  
- Styling: TailwindCSS  
- Blockchain Interaction: ethers.js  
- QR Code Scanning: `react-qr-scanner`  
- QR Code Generation: qrserver API  
- Hosting: Vercel

---

## Key Features

### 1. Wallet Creation and Management
- Seamlessly generate and manage Zenith wallets using `ethers.js`.
- Securely store wallet information in the browser's local storage with encryption.
- Provide an intuitive onboarding experience for users new to cryptocurrency wallets.

### 2. Real-Time Balance Updates
- Integrate with the Open Campus Codex Sepolia RPC to deliver real-time balance updates.
- Display balances in a clean, responsive format optimized for various screen sizes.

### 3. Send and Receive EDU Tokens
- Provide a user-friendly interface to send and receive EDU tokens.
- Generate QR codes for receiving tokens and enable easy sharing of wallet addresses.
- Validate wallet addresses to prevent errors during transactions.

### 4. QR Code Scanning
- Utilize the `react-qr-scanner` library to enable fast and accurate wallet address scanning via QR codes.
- Ensure optimized performance across device cameras for a smooth user experience.

### 5. Telegram Mini App Integration
- Leverage the Telegram Web App API to integrate directly into Telegram’s interface.
- Offer a seamless transition between Telegram and the wallet mini-app for a cohesive user experience.

---

## Future Enhancements

### 1. Localization
- Add support for multiple languages to cater to a diverse user base.  

### 2. Transaction History
- Provide detailed transaction insights, including timestamps, transaction statuses, and amounts.  

### 3. Multi-Currency Support
- Extend support to other educational tokens or cryptocurrencies to expand the wallet's utility.  

### 4. Enhanced Security
- Introduce a backend service for encrypted key storage and secure recovery options.  

### 5. Advanced Features
- Implement gas fee estimations for transaction cost calculations.
- Add notifications for incoming and outgoing transactions.
- Integrate analytics tools to display wallet usage trends and insights.

---

## Local Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/justin212407/zenith-wallet.git
```

2. Navigate to the project directory:
```bash
cd zenith-wallet
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to:
```
http://localhost:3000
```

---

## GitHub Repository
[Zenith Wallet GitHub Repository](https://github.com/justin212407/zenith-wallet)

---

Enjoy using Zenith Wallet and contribute to the future of decentralized education!
