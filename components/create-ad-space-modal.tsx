'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import useCreateAdSpace from '@/hooks/useCreateAdSpace'

export default function CreateAdSpaceModal() {
  const { isOpen, onOpen, onClose } = useCreateAdSpace()
  const [formData, setFormData] = useState({
    metadataUri: '',
    price: '',
    monthlyFee: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      // If the API call is successful:
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (open) {
      onOpen()
    } else {
      onClose()
      // Reset form state when closing the modal
      setFormData({ metadataUri: '', price: '', monthlyFee: '' })
      setSubmitStatus('idle')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* <DialogTrigger asChild>
        <Button onClick={onOpen}>Create Ad Space</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Ad Space</DialogTitle>
          <DialogDescription>
            List a new ad space by providing the required details.
          </DialogDescription>
        </DialogHeader>
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
              step="0.001"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="0.1"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyFee">Monthly Fee (PYUSD)</Label>
            <Input
              id="monthlyFee"
              name="monthlyFee"
              type="number"
              step="0.001"
              value={formData.monthlyFee}
              onChange={handleInputChange}
              placeholder="0.05"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Mint and List Ad Space'}
            </Button>
          </DialogFooter>
        </form>
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
  )
}