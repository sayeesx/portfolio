import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";
import DonationModal from "@/components/DonationModal";

type CryptoType = "btc" | "usdt" | "ton" | "sol";
type BTCNetwork = "segwit" | "legacy" | "bep20";
type USDTNetwork = "bep20" | "trc20" | "erc20";

const cryptoAddresses = {
  btc: {
    segwit: {
      address: "bc1q0keekq2dam72la64w767zz6063es4mcvmknmu8",
      network: "BTC (SegWit)",
      qrImage: "/assets/BTC_SegWit_.jpg"
    },
    legacy: {
      address: "14Z2uwto7Hbgxpz7b5C3X6MJHBT7r4NCAK",
      network: "Bitcoin",
      qrImage: "/assets/Bitcoin.jpg"
    },
    bep20: {
      address: "0x84c69122b39fc36e12db01e7089212c421253740",
      network: "BNB Smart Chain (BEP20)",
      qrImage: "/assets/bep20.jpg"
    }
  },
  usdt: {
    bep20: {
      address: "0x84c69122b39fc36e12db01e7089212c421253740",
      network: "BNB Smart Chain (BEP20)",
      qrImage: "/assets/usdt-bep20.jpg"
    },
    trc20: {
      address: "TMBp8Su8oWq4vzFrw4tAKrQQdr2U8nx1qk",
      network: "Tron (TRC20)",
      qrImage: "/assets/usdt-trc20.jpg"
    },
    erc20: {
      address: "0x84c69122b39fc36e12db01e7089212c421253740",
      network: "Ethereum (ERC20)",
      qrImage: "/assets/usdt-erc20.jpg"
    }
  },
  ton: {
    address: "UQBvyYMXwWM0dtdeI9ajpfbdOAzx9lHB5N_kODS5sxavrOO8",
    network: "The Open Network (TON)",
    qrImage: "/assets/ton.jpg",
    warning: "* Please note that your TON network address has been changed and no longer requires a MEMO for deposit. Please do a test deposit before sending the full sum of funds."
  },
  sol: {
    address: "2cm7V1JHmHKjHqo8Kzv7pE6XBMXLmBi8zB9zkQBPGiy1",
    network: "Solana",
    qrImage: "/assets/solana.jpg",
    warning: "* Please note that SOL addresses are case sensitive."
  }
};

export default function SupportSection() {
  const [paypalModalOpen, setPaypalModalOpen] = useState(false);
  const [upiModalOpen, setUpiModalOpen] = useState(false);
  const [eRupeeModalOpen, setERupeeModalOpen] = useState(false);
  const [cryptoModalOpen, setCryptoModalOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoType>("btc");
  const [selectedBTCNetwork, setSelectedBTCNetwork] = useState<BTCNetwork>("segwit");
  const [selectedUSDTNetwork, setSelectedUSDTNetwork] = useState<USDTNetwork>("bep20");
  const [imageLoading, setImageLoading] = useState(true);
  const [qrImageLoading, setQrImageLoading] = useState<Record<string, boolean>>({});
  

  // Razorpay removed: no server actions required for UPI payment flow

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  

  const getCurrentCryptoData = () => {
    if (selectedCrypto === "btc") {
      return cryptoAddresses.btc[selectedBTCNetwork];
    }
    if (selectedCrypto === "usdt") {
      return cryptoAddresses.usdt[selectedUSDTNetwork];
    }
    return cryptoAddresses[selectedCrypto];
  };

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-white">
        Support / Patronage
      </h2>
      <p className="text-sm md:text-lg text-gray-300 leading-relaxed mb-6">
        If you'd like to support my work, you can contribute through any of these methods:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PayPal Button */}
        <button
          onClick={() => setPaypalModalOpen(true)}
          className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-auto px-4 py-3 whitespace-pre group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-white hover:ring-offset-2"
          style={{
            boxShadow: '0 4px 6px -1px rgba(200, 200, 200, 0.3), 0 2px 4px -1px rgba(200, 200, 200, 0.2)'
          }}
        >
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" style={{ transform: 'translateX(-100%)' }} />
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
          </svg>
          <span className="ml-1">PayPal</span>
        </button>

        {/* UPI Button */}
        <button
          onClick={() => setUpiModalOpen(true)}
          className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-auto px-4 py-3 whitespace-pre group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-white hover:ring-offset-2"
          style={{
            boxShadow: '0 4px 6px -1px rgba(200, 200, 200, 0.3), 0 2px 4px -1px rgba(200, 200, 200, 0.2)'
          }}
        >
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" style={{ transform: 'translateX(-100%)' }} />
          <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor">
            <path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"/>
          </svg>
          <span className="ml-1">UPI</span>
        </button>

        {/* Crypto Button */}
        <button
          onClick={() => setCryptoModalOpen(true)}
          className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-auto px-4 py-3 whitespace-pre group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-white hover:ring-offset-2"
          style={{
            boxShadow: '0 4px 6px -1px rgba(200, 200, 200, 0.3), 0 2px 4px -1px rgba(200, 200, 200, 0.2)'
          }}
        >
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" style={{ transform: 'translateX(-100%)' }} />
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
          </svg>
          <span className="ml-1">Crypto</span>
        </button>

        {/* Digital e-Rupee Button */}
        <button
          onClick={() => setERupeeModalOpen(true)}
          className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-auto px-4 py-3 whitespace-pre group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-white hover:ring-offset-2"
          style={{
            boxShadow: '0 4px 6px -1px rgba(200, 200, 200, 0.3), 0 2px 4px -1px rgba(200, 200, 200, 0.2)'
          }}
        >
          <span className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 group-hover:animate-[shimmer_2s_ease-in-out_infinite]" style={{ transform: 'translateX(-100%)' }} />
            <span className="text-xl" aria-hidden>
              ₹
            </span>
            <span className="ml-1">Digital e-Rupee</span>
        </button>
      </div>

      {/* PayPal Modal */}
      <Dialog open={paypalModalOpen} onOpenChange={setPaypalModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>PayPal Payment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4 space-y-4">
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">Muhammed Sayees CK</p>
              <p className="text-sm text-muted-foreground">@msayees</p>
            </div>
            <Button
              onClick={() => window.open("https://www.paypal.com/myaccount/transfer/homepage/external/profile?flowContextData=FHWxdbqyWWbLpJYMiYovgfC4hVgC-awhhleGxg99m2UhhzSlb6uFrOfauAtwigVfz_G3lkKRPAL1lvOxiSU72AB1LGOtW7z7MvdfVwWXYW3Jq1Q0aFO5bsXl1qe4Rm9CUjLsHuGIuPJ7cTWn4mn6_NjEdGQJ1HKr0AZJrC5_yPotoBCXDi_QGYYHTw98GZ-XfVV6RCNWPwqxQhhDIsx6By-f-0dQlXjryWwXf25yle3T3FYyWqqXX6et8JlS8TQHa5BbAyS3HExcji5t-d1RWXQVk1BXWvJeTJ_s479FJGXcIOfqUib2fTbgCn1a4zymniWchzzBjS9RVVpFpop6-i6C8phRUqmcjn3W6RXebeKa1JASSAi90dHpJvcM8E1yE4djRcwzL-VAwoRgwnGnY9D3sIzkSYJLKGKQfFYJo07I5IjPtxOTAJqmUU8", "_blank")}
              className="w-full bg-white hover:bg-gray-200 text-black border-2 border-white shadow-lg transition-all font-semibold"
            >
              Send via PayPal
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* UPI Modal */}
      <DonationModal
        open={upiModalOpen}
        onOpenChange={setUpiModalOpen}
        upiId="sayees@upi"
        payeeName="Sayees CK"
        transactionNote="Donation"
      />

      {/* e-Rupee Modal */}
      <Dialog open={eRupeeModalOpen} onOpenChange={setERupeeModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Digital e-Rupee Payment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            {imageLoading && (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            <img 
              src="/assets/rupee.png" 
              alt="e-Rupee QR Code" 
              className={`max-w-full h-auto rounded-lg ${imageLoading ? 'hidden' : 'block'}`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                toast.error("Failed to load QR code");
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Crypto Modal */}
      <Dialog open={cryptoModalOpen} onOpenChange={setCryptoModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cryptocurrency Payment</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-3 sm:p-6 space-y-3 sm:space-y-6">
            {/* Crypto Selector Toggle */}
            <div className="w-full text-sm sm:text-base">
              <div className="crypto-switch">
                <button
                  type="button"
                  className={`crypto-option ${selectedCrypto === "btc" ? "active" : ""}`}
                  onClick={() => setSelectedCrypto("btc")}
                >
                  BTC
                </button>
                <button
                  type="button"
                  className={`crypto-option ${selectedCrypto === "usdt" ? "active" : ""}`}
                  onClick={() => setSelectedCrypto("usdt")}
                >
                  USDT
                </button>
                <button
                  type="button"
                  className={`crypto-option ${selectedCrypto === "ton" ? "active" : ""}`}
                  onClick={() => setSelectedCrypto("ton")}
                >
                  TON
                </button>
                <button
                  type="button"
                  className={`crypto-option ${selectedCrypto === "sol" ? "active" : ""}`}
                  onClick={() => setSelectedCrypto("sol")}
                >
                  SOL
                </button>
              </div>
            </div>

            {/* BTC Network Selector */}
            {selectedCrypto === "btc" && (
              <div className="w-full">
                <label className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 block">Select Network:</label>
                <select
                  value={selectedBTCNetwork}
                  onChange={(e) => {
                    const newNetwork = e.target.value as BTCNetwork;
                    setSelectedBTCNetwork(newNetwork);
                    setQrImageLoading(prev => ({ ...prev, [`btc-${newNetwork}`]: true }));
                  }}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-black/80 backdrop-blur-sm border border-white/30 text-white cursor-pointer hover:bg-black/90 hover:border-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/60 appearance-none"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.02)), url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'white\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat, no-repeat',
                    backgroundPosition: 'center, right 0.75rem center',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="segwit" className="bg-black text-white">BTC (SegWit)</option>
                  <option value="legacy" className="bg-black text-white">Bitcoin (Legacy)</option>
                  <option value="bep20" className="bg-black text-white">BNB Smart Chain (BEP20)</option>
                </select>
              </div>
            )}

            {/* USDT Network Selector */}
            {selectedCrypto === "usdt" && (
              <div className="w-full">
                <label className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 block">Select Network:</label>
                <select
                  value={selectedUSDTNetwork}
                  onChange={(e) => {
                    const newNetwork = e.target.value as USDTNetwork;
                    setSelectedUSDTNetwork(newNetwork);
                    setQrImageLoading(prev => ({ ...prev, [`usdt-${newNetwork}`]: true }));
                  }}
                  className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-black/80 backdrop-blur-sm border border-white/30 text-white cursor-pointer hover:bg-black/90 hover:border-white/50 transition-all focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/60 appearance-none"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.02)), url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'white\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")',
                    backgroundRepeat: 'no-repeat, no-repeat',
                    backgroundPosition: 'center, right 0.75rem center',
                    paddingRight: '2.5rem'
                  }}
                >
                  <option value="bep20" className="bg-black text-white">BNB Smart Chain (BEP20)</option>
                  <option value="trc20" className="bg-black text-white">Tron (TRC20)</option>
                  <option value="erc20" className="bg-black text-white">Ethereum (ERC20)</option>
                </select>
              </div>
            )}

            {/* QR Code Preview for BTC, USDT, TON, and SOL */}
            {(selectedCrypto === "btc" || selectedCrypto === "usdt" || selectedCrypto === "ton" || selectedCrypto === "sol") && (() => {
              const cryptoData = getCurrentCryptoData();
              if (!('qrImage' in cryptoData)) return null;
              
              const typedData = cryptoData as { address: string; network: string; qrImage: string };
              const loadingKey = selectedCrypto === "btc" 
                ? `btc-${selectedBTCNetwork}` 
                : selectedCrypto === "usdt" 
                ? `usdt-${selectedUSDTNetwork}` 
                : selectedCrypto;
              
              return (
                <div className="w-full flex justify-center">
                  {qrImageLoading[loadingKey] && (
                    <div className="flex items-center justify-center h-48">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}
                  <img 
                    src={typedData.qrImage}
                    alt={`${typedData.network} QR Code`}
                    className={`max-w-full h-auto rounded-lg ${qrImageLoading[loadingKey] ? 'hidden' : 'block'}`}
                    style={{ maxHeight: '150px' }}
                    onLoad={() => setQrImageLoading(prev => ({ ...prev, [loadingKey]: false }))}
                    onError={() => {
                      setQrImageLoading(prev => ({ ...prev, [loadingKey]: false }));
                      toast.error("Failed to load QR code");
                    }}
                  />
                </div>
              );
            })()}

            {/* Address Display */}
            <div className="w-full space-y-2 sm:space-y-4">
              <div className="bg-muted p-2 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Network:</p>
                <p className="text-sm sm:text-base font-semibold">{getCurrentCryptoData().network}</p>
              </div>

              <div className="bg-muted p-2 sm:p-4 rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Address:</p>
                <div className="flex items-center gap-1 sm:gap-2">
                  <p className="font-mono text-xs sm:text-sm break-all flex-1">
                    {getCurrentCryptoData().address}
                  </p>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => copyToClipboard(
                      getCurrentCryptoData().address,
                      "Address"
                    )}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                {'warning' in getCurrentCryptoData() && (() => {
                  const cryptoData = getCurrentCryptoData() as { address: string; network: string; warning?: string };
                  return cryptoData.warning ? (
                    <p className="text-xs text-red-500 mt-2">
                      {cryptoData.warning}
                    </p>
                  ) : null;
                })()}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        .crypto-switch {
          display: flex;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          padding: 4px;
          position: relative;
          isolation: isolate;
        }

        .crypto-option {
          flex: 1;
          padding: 0.5rem 0.75rem;
          border: none;
          background: transparent;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 300ms ease-in-out 150ms;
          position: relative;
          z-index: 1;
          opacity: 0.75;
          font-size: 0.875rem;
        }

        @media (min-width: 640px) {
          .crypto-option {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        }

        .crypto-option.active {
          opacity: 1;
          transition-delay: 0ms;
        }

        .crypto-switch::before {
          content: "";
          position: absolute;
          background-color: rgba(255, 255, 255, 0.15);
          border-radius: inherit;
          inset: 4px 75% 4px 4px;
          transition: inset 500ms cubic-bezier(0.47, 1.64, 0.41, 0.8), background-color 500ms ease-in-out;
          z-index: 0;
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.3);
        }

        .crypto-switch:has(.crypto-option:nth-child(1).active)::before {
          background-color: rgba(255, 255, 255, 0.25);
          inset: 4px 75% 4px 4px;
        }

        .crypto-switch:has(.crypto-option:nth-child(2).active)::before {
          background-color: rgba(255, 255, 255, 0.25);
          inset: 4px 50% 4px 25%;
        }

        .crypto-switch:has(.crypto-option:nth-child(3).active)::before {
          background-color: rgba(255, 255, 255, 0.25);
          inset: 4px 25% 4px 50%;
        }

        .crypto-switch:has(.crypto-option:nth-child(4).active)::before {
          background-color: rgba(255, 255, 255, 0.25);
          inset: 4px 4px 4px 75%;
        }

        .crypto-option:hover:not(.active) {
          opacity: 1;
          transition-delay: 0ms;
          transition-duration: 100ms;
        }
      `}</style>
    </>
  );
}
