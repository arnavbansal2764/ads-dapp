'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Search, DollarSign, Calendar, User, ExternalLink, ShoppingCart, CreditCard } from 'lucide-react'

// Mock data for ad spaces
const mockAdSpaces = [
  { id: 1, price: 0.5, monthlyFee: 0.05, owner: '0x1234...5678', description: 'Prime ad space in a high-traffic area.', monthsPaid: 3, totalMonths: 12 },
  { id: 2, price: 0.7, monthlyFee: 0.07, owner: '0xabcd...efgh', description: 'Exclusive ad spot with guaranteed visibility.', monthsPaid: 6, totalMonths: 12 },
  { id: 3, price: 0.3, monthlyFee: 0.03, owner: '0x9876...5432', description: 'Budget-friendly option for startups.', monthsPaid: 1, totalMonths: 12 },
  { id: 4, price: 0.6, monthlyFee: 0.06, owner: '0xijkl...mnop', description: 'Featured ad space with premium placement.', monthsPaid: 9, totalMonths: 12 },
  { id: 5, price: 0.4, monthlyFee: 0.04, owner: '0xqrst...uvwx', description: 'Versatile ad space suitable for various campaigns.', monthsPaid: 0, totalMonths: 12 },
]

export function ViewAdSpacesComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedAd, setSelectedAd] = useState(null)

  const filteredAdSpaces = mockAdSpaces.filter(adSpace => 
    adSpace.id.toString().includes(searchTerm) ||
    adSpace.price.toString().includes(searchTerm) ||
    adSpace.monthlyFee.toString().includes(searchTerm) ||
    adSpace.owner.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePurchase = (adId:any) => {
    console.log(`Purchasing ad space ${adId}`)
    // Implement purchase logic here
  }

  const handlePayMonthlyFee = (adId:any) => {
    console.log(`Paying monthly fee for ad space ${adId}`)
    // Implement monthly fee payment logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-primary text-primary-foreground py-20 px-4 text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Explore Ad Spaces</h1>
        <p className="text-xl mb-8">Discover prime advertising opportunities in the digital realm</p>
        <div className="max-w-md mx-auto relative">
          <Input
            type="text"
            placeholder="Search ad spaces..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </motion.div>

      <div className="container mx-auto p-4 mt-8">
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {filteredAdSpaces.map(adSpace => (
              <motion.div
                key={adSpace.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.3 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Ad Space #{adSpace.id}</span>
                          <ExternalLink className="w-5 h-5 text-gray-400" />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="flex items-center mb-2"><DollarSign className="w-4 h-4 mr-2" /> Price: {adSpace.price} PYUSD</p>
                        <p className="flex items-center mb-2"><Calendar className="w-4 h-4 mr-2" /> Monthly Fee: {adSpace.monthlyFee} PYUSD</p>
                        <p className="flex items-center"><User className="w-4 h-4 mr-2" /> Owner: {adSpace.owner}</p>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Ad Space #{adSpace.id} Details</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p className="flex items-center mb-2"><DollarSign className="w-4 h-4 mr-2" /> Price: {adSpace.price} PYUSD</p>
                      <p className="flex items-center mb-2"><Calendar className="w-4 h-4 mr-2" /> Monthly Fee: {adSpace.monthlyFee} PYUSD</p>
                      <p className="flex items-center mb-2"><User className="w-4 h-4 mr-2" /> Owner: {adSpace.owner}</p>
                      <p className="mt-4 mb-4">{adSpace.description}</p>
                      <div className="mb-4">
                        <Label htmlFor={`progress-${adSpace.id}`} className="mb-2 block">Payment Progress</Label>
                        <Progress
                          id={`progress-${adSpace.id}`}
                          value={(adSpace.monthsPaid / adSpace.totalMonths) * 100}
                          className="w-full"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          {adSpace.monthsPaid} / {adSpace.totalMonths} months paid
                        </p>
                      </div>
                      <div className="flex justify-between mt-6">
                        <Button onClick={() => handlePurchase(adSpace.id)} className="flex items-center">
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Purchase Ad
                        </Button>
                        <Button onClick={() => handlePayMonthlyFee(adSpace.id)} className="flex items-center">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Monthly Fee
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredAdSpaces.length === 0 && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-8 text-gray-500"
          >
            No ad spaces found matching your search criteria.
          </motion.p>
        )}
      </div>
    </div>
  )
}