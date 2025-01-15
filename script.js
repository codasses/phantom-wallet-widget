document.getElementById('connect-wallet').addEventListener('click', async () => {
    console.log('Starting wallet connection process...');
  
    const provider = window.solana || undefined;
  
    if (provider && provider.isPhantom) {
      console.log('Phantom Wallet detected! Attempting to connect...');
      try {
        // Connect to Phantom Wallet
        const response = await provider.connect({ onlyIfTrusted: false });
        console.log('Wallet connected:', response.publicKey.toString());
  
        // Display wallet address
        document.getElementById('wallet-address').textContent = response.publicKey.toString();
  
        // Fetch and display SOL balance from Mainnet
        const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
        const balance = await connection.getBalance(response.publicKey);
  
        // Display the balance
        document.getElementById('wallet-balance').textContent = (balance / solanaWeb3.LAMPORTS_PER_SOL).toFixed(2);
  
        // Show wallet info section
        document.getElementById('wallet-info').style.display = 'block';
      } catch (error) {
        console.error('Error fetching balance or connecting:', error);
        alert('Failed to fetch balance. Please try again.');
      }
    } else {
      console.error('Phantom Wallet not detected.');
      alert('Phantom Wallet is not detected! Please ensure it is installed and active.');
    }
  });
  