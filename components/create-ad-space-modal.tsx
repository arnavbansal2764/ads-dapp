'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import useCreateAdSpace from '@/hooks/useCreateAdSpace'
import { ethers } from 'ethers'
import { quickNodeUrl, contractAddress, contractABI } from '@/config'

async function initializeContract() {
  try {
    let signer, provider;

    // Use MetaMask if available
    if (typeof window !== "undefined" && (window as any).ethereum) {
      provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []); // Prompt user to connect wallet
      signer = await provider.getSigner();
      console.log("Using MetaMask as provider");
    } else {
      // Fallback to JsonRpcProvider
      provider = new ethers.JsonRpcProvider(quickNodeUrl);
      signer = await provider.getSigner();
      console.log("Using JsonRpcProvider");
    }

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log("Contract initialized successfully");
    return contract;
  } catch (error) {
    console.error("Error initializing contract:", error);
    throw error;
  }
}

const loadingTexts = [
  "Preparing your details for IPFS...",
  "Uploading metadata to IPFS...",
  "Generating your unique NFT...",
  "Creating your ad space...",
  "Finalizing your transaction...",
  "Minting your NFT...",
  "Securing your NFT on the blockchain...",
  "Processing your payment...",
  "Verifying transaction details...",
  "Awaiting confirmation from the network..."
];

function LoadingAnimation({ currentText }: { currentText: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className="h-8 w-8 animate-spin text-primary" speed={2} />
      <p className="text-sm text-muted-foreground">{currentText}</p>
    </div>
  );
}

export default function CreateAdSpaceModal() {
  const [contract, setContract] = useState<any>(null);
  const [formData, setFormData] = useState({
    metadataUri: '',
    price: '',
    monthlyFee: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { isOpen, onOpen, onClose } = useCreateAdSpace();
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  // Initialize the contract once on component mount
  useEffect(() => {
    const setupContract = async () => {
      try {
        const initializedContract = await initializeContract();
        setContract(initializedContract);
      } catch (error) {
        console.error("Failed to setup contract.");
      }
    };
    setupContract();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitting) {
      interval = setInterval(() => {
        setLoadingTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract) {
      console.error("Contract is not initialized.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate the loading process
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
      const { metadataUri, price, monthlyFee } = formData;
      const tx = await contract.mintAdSpace(metadataUri, BigInt(price), BigInt(monthlyFee));
      await tx.wait();
      console.log("Minted new Ad Space:", tx);
      setSubmitStatus('success');
    } catch (error) {
      console.error("Minting failed:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      onOpen();
    } else {
      onClose();
      setFormData({ metadataUri: '', price: '', monthlyFee: '' });
      setSubmitStatus('idle');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Ad Space</DialogTitle>
          <DialogDescription>
            List a new ad space by providing the required details.
          </DialogDescription>
        </DialogHeader>
        {contract ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="metadataUri">Metadata URI</Label>
              <Input
                id="metadataUri"
                name="metadataUri"
                value={formData.metadataUri}
                onChange={handleInputChange}
                placeholder="https://example.com/metadata.json"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (PYUSD)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="1"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="3"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyFee">Monthly Fee (PYUSD)</Label>
              <Input
                id="monthlyFee"
                name="monthlyFee"
                type="number"
                step="1"
                value={formData.monthlyFee}
                onChange={handleInputChange}
                placeholder="5"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Mint and List Ad Space'}
              </Button>
            </DialogFooter>
                {isSubmitting && (
                  <LoadingAnimation currentText={loadingTexts[loadingTextIndex]} />
                )}
          </form>
        ) : (
          <div className="text-red-500">Error: Unable to initialize contract. Please try again later.</div>
        )}
        
        {submitStatus === 'success' && (
          <div className="flex items-center text-green-600 mt-2">
            <CheckCircle2 className="mr-2" />
            Ad space successfully created and listed!
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="flex items-center text-red-600 mt-2">
            <AlertCircle className="mr-2" />
            An error occurred. Please try again.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}