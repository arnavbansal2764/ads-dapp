'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Fingerprint, Link, User, Send } from 'lucide-react'

// Mock data for NFTs
const mockNFTs = [
  { id: 1, metadataUri: 'https://example.com/nft/1', owner: '0x1234...5678' },
  { id: 2, metadataUri: 'https://example.com/nft/2', owner: '0x1234...5678' },
  { id: 3, metadataUri: 'https://example.com/nft/3', owner: '0x1234...5678' },
  { id: 4, metadataUri: 'https://example.com/nft/4', owner: '0x1234...5678' },
  { id: 5, metadataUri: 'https://example.com/nft/5', owner: '0x1234...5678' },
]

export default function MyNfts() {
  const [selectedNFT, setSelectedNFT] = useState<{ id: number; metadataUri: string; owner: string } | null>(null)
  const [newOwner, setNewOwner] = useState('')

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedNFT) {
      console.log(`Transferring NFT ${selectedNFT.id} to ${newOwner}`)
    }
    // Implement transfer logic here
    setSelectedNFT(null)
    setNewOwner('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* <Cube className="w-24 h-24 mx-auto mb-6 text-yellow-300" /> */}
          </motion.div>
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Your Digital Treasures
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Explore and manage your unique NFT collection
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button size="lg" className="bg-yellow-400 text-purple-800 hover:bg-yellow-300">
              Mint New NFT
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto p-8">
        <motion.h2
          className="text-3xl font-bold mb-6 text-purple-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My NFT Collection
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {mockNFTs.map(nft => (
            <motion.div
              key={nft.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Fingerprint className="w-5 h-5 mr-2 text-purple-600" />
                      NFT #{nft.id}
                    </span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedNFT(nft)}>
                          Transfer
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Transfer NFT #{nft.id}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleTransfer} className="space-y-4">
                          <div>
                            <Label htmlFor="newOwner">New Owner Address</Label>
                            <Input
                              id="newOwner"
                              value={newOwner}
                              onChange={(e) => setNewOwner(e.target.value)}
                              placeholder="0x..."
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                            <Send className="w-4 h-4 mr-2" />
                            Transfer Ownership
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex items-center mb-2">
                    <Link className="w-4 h-4 mr-2 text-pink-600" />
                    <a href={nft.metadataUri} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
                      Metadata URI
                    </a>
                  </p>
                  <p className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-purple-600" />
                    Current Owner: {nft.owner}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}