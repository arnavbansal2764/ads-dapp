'use client';

import { useState } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Wallet2 } from "lucide-react";
import { Avatar } from "./ui/avatar";
import useCreateAdSpace from "@/hooks/useCreateAdSpace";
import ConnectWalletButton from "./connect-wallet";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const createAdSpace = useCreateAdSpace();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-10">
            <div className="container flex h-14 items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link className="flex items-center space-x-2" href="/">
                        {/* <img src="/placeholder.svg?height=32&width=32" alt="Logo" className="h-8 w-8" />
                         */}
                        <span className="font-bold hidden sm:inline-block text-2xl">AdChain</span>
                        <span className="hidden sm:inline-block pt-1">Powered By QuickNode</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href="/">Home</Link>
                    <button onClick={() => { createAdSpace.onOpen()}} className="text-sm font-medium text-center">Create Ad Space</button>
                    <Link href="/view-ads">View Ads</Link>
                    <Link href="/my-nfts">My NFTs</Link>
                    <Link href="/profile">Profile</Link>
                    <Link href="/about-us">About Us</Link>
                </nav>
                <div className="flex items-center space-x-4">
                    {/* <WalletBtn/> */}
                    <ConnectWalletButton/>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
            {isMenuOpen && (
                <nav className="md:hidden p-4 border-t bg-background">
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className="text-sm font-medium text-center">Home</Link>
                        <button onClick={()=>{createAdSpace.onOpen()}} className="text-sm font-medium text-center">Create Ad Space</button>
                        <Link href="/view-ads" className="text-sm font-medium text-center">View Ads</Link>
                        <Link href="/my-nfts" className="text-sm font-medium text-center">My NFTs</Link>
                        <Link href="/profile" className="text-sm font-medium text-center">Profile</Link>
                        <Button variant="outline" className="w-full">
                            {/* <WalletBtn/> */}
                        </Button>
                    </div>
                </nav>
            )}
        </header>
    )
}