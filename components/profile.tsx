'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Edit, DollarSign, ShoppingBag } from 'lucide-react'

// Mock data
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  createdAdSpaces: [
    { id: 1, name: 'Premium Banner', price: 0.5 },
    { id: 2, name: 'Sidebar Ad', price: 0.3 },
  ],
  purchasedAdSpaces: [
    { id: 3, name: 'Homepage Feature', price: 0.8 },
    { id: 4, name: 'Newsletter Sponsorship', price: 0.6 },
  ],
}

export function ProfileComponent() {
  const [user, setUser] = useState(mockUser)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedUser(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(editedUser)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4"
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
            <User className="w-24 h-24 mx-auto mb-6 text-yellow-300" />
          </motion.div>
          <motion.h1 
            className="text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Welcome, {user.name}!
          </motion.h1>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Manage your profile and ad spaces
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Profile Information</span>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={editedUser.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={editedUser.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              ) : (
                <div className="space-y-2">
                  <p className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-blue-600" />
                    {user.name}
                  </p>
                  <p className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-purple-600" />
                    {user.email}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="created" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="created">Created Ad Spaces</TabsTrigger>
              <TabsTrigger value="purchased">Purchased Ad Spaces</TabsTrigger>
            </TabsList>
            <TabsContent value="created">
              <Card>
                <CardHeader>
                  <CardTitle>Your Created Ad Spaces</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.createdAdSpaces.map((adSpace) => (
                    <div key={adSpace.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <span>{adSpace.name}</span>
                      <span className="flex items-center text-green-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {adSpace.price} PYUSD
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="purchased">
              <Card>
                <CardHeader>
                  <CardTitle>Your Purchased Ad Spaces</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.purchasedAdSpaces.map((adSpace) => (
                    <div key={adSpace.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <span>{adSpace.name}</span>
                      <span className="flex items-center text-blue-600">
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        {adSpace.price} PYUSD
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}