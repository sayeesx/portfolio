import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Loader2, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";

export type DonationModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  upiId: string; // e.g., "sayees@upi"
  payeeName: string; // e.g., "Sayees CK"
  transactionNote?: string; // default: "Support"
};

export default function DonationModal({
  open,
  onOpenChange,
  upiId = "sayees@upi",
  payeeName,
  transactionNote = "Support",
}: DonationModalProps) {
  const isMobile = useIsMobile();
  const [amount, setAmount] = useState<string>("100");
  const [qrLoading, setQrLoading] = useState(true);
  const [showQrMobile, setShowQrMobile] = useState(false);
  const [qrLoadingMobile, setQrLoadingMobile] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQrLoading(true);
      setShowQrMobile(false);
      setQrLoadingMobile(true);
    }
  }, [open]);

  const upiUrl = useMemo(() => {
    const params = new URLSearchParams({
      pa: upiId,
      pn: payeeName,
      tn: transactionNote,
      cu: "INR",
    });

    const numeric = parseFloat(amount || "0");
    if (!isNaN(numeric) && numeric > 0) {
      params.set("am", numeric.toFixed(2));
    }
    return `upi://pay?${params.toString()}`;
  }, [upiId, payeeName, transactionNote, amount]);

  const copyToClipboard = async (value: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = value;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(el);
        if (!successful) throw new Error("execCommand failed");
      }
      toast.success("UPI ID copied to clipboard");
    } catch (err) {
      console.error("Copy failed", err);
      toast.error("Failed to copy UPI ID. Please copy manually.");
    }
  };

  const onPay = () => {
    const val = parseFloat(amount || "0");
    if (isNaN(val) || val <= 0) {
      toast.error("Please enter a valid amount (min ₹1)");
      return;
    }
    // Use location.href for better handling of deep links on mobile
    window.location.href = upiUrl;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" aria-label="Donation via UPI">
        <DialogHeader>
          <DialogTitle>UPI Payment</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 p-1">
          {/* Show amount input only on mobile (desktop shouldn't show amount input) */}
          {isMobile && (
            <div className="w-full space-y-2">
              <Label htmlFor="donation-amount">Enter Amount (₹)</Label>
              <Input
                ref={inputRef}
                id="donation-amount"
                type="number"
                min={1}
                step={1}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="text-lg"
                aria-label="Donation amount in rupees"
              />
            </div>
          )}

          <AnimatePresence initial={false} mode="wait">
            {isMobile ? (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, scale: 0.98, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -6 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-3"
              >
                <Button
                  onClick={onPay}
                  className="w-full bg-black hover:bg-black/90 text-white border-2 border-white shadow-lg font-semibold"
                  aria-label="Pay via UPI app"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Pay ₹{amount || "0"} via UPI App
                </Button>
                <Button
                  onClick={() => {
                    setShowQrMobile((s) => !s);
                    if (!showQrMobile) setQrLoadingMobile(true);
                  }}
                  className="w-full bg-white text-black border-2 border-white shadow-md font-medium"
                  aria-label="Show QR code"
                >
                  {showQrMobile ? 'Hide QR' : 'Show QR'}
                </Button>
                <div className="text-center text-xs text-muted-foreground">
                  Your UPI app should open to complete the payment.
                </div>

                {showQrMobile && (
                  <div className="flex flex-col items-center mt-2">
                    {qrLoadingMobile && (
                      <div className="flex items-center justify-center h-48 w-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    )}
                    <img
                      src="/assets/upi.jpg"
                      alt="UPI QR Code"
                      className={`max-w-full h-auto rounded-lg ${qrLoadingMobile ? 'hidden' : 'block'}`}
                      style={{ maxHeight: '220px' }}
                      onLoad={() => setQrLoadingMobile(false)}
                      onError={() => {
                        setQrLoadingMobile(false);
                        toast.error('Failed to load QR code');
                      }}
                    />
                    <div className="mt-2 text-sm text-muted-foreground">Scan this QR code using your UPI app</div>
                  </div>
                )}

                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">UPI ID</div>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm break-all flex-1">{upiId}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard(upiId)}
                      aria-label="Copy UPI ID"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="desktop"
                initial={{ opacity: 0, scale: 0.98, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -6 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col items-center justify-center">
                  {qrLoading && (
                    <div className="flex items-center justify-center h-48">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}
                  <img
                    src="/assets/upi.jpg"
                    alt="UPI QR Code"
                    className={`max-w-full h-auto rounded-lg ${qrLoading ? "hidden" : "block"}`}
                    style={{ maxHeight: "220px" }}
                    onLoad={() => setQrLoading(false)}
                    onError={() => {
                      setQrLoading(false);
                      toast.error("Failed to load QR code");
                    }}
                  />
                  <div className="mt-2 text-sm text-muted-foreground">
                    Scan this QR code using your UPI app
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">UPI ID</div>
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-sm break-all flex-1">{upiId}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => copyToClipboard(upiId)}
                      aria-label="Copy UPI ID"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom action row: hide entirely on mobile (mobile uses the in-modal UPI app button).
              On desktop, don't show a Pay button (per requirements) but keep a Close button. */}
          {!isMobile && (
            <div className="flex gap-2 pt-1">
              <div className="flex-1" />
              <Button variant="secondary" onClick={() => onOpenChange(false)} aria-label="Close modal">
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
