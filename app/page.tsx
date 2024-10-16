'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wallet, PlusCircle, FileImage, BarChart3, ArrowRight, Menu, Wallet2, WalletIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-purple-500 to-blue-500">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  Revolutionize Your Advertising with Blockchain
                </h1>
                <p className="mx-auto max-w-[700px] text-white md:text-xl">
                  Secure, Transparent, and Decentralized Ad Placements
                </p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button variant="secondary">Get Started</Button>
                <Button variant="outline" className="bg-white text-purple-500">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Decentralized Ad Placement", icon: <PlusCircle className="h-6 w-6" />, description: "Place ads on a decentralized network" },
                { title: "Pay with Cryptocurrency", icon: <Wallet className="h-6 w-6" />, description: "Use crypto for seamless transactions" },
                { title: "NFT-based IP Protection", icon: <FileImage className="h-6 w-6" />, description: "Secure your ad content as NFTs" },
                { title: "Real-Time Analytics", icon: <BarChart3 className="h-6 w-6" />, description: "Track performance in real-time" },
              ].map((feature, index) => (
                <Card key={index} className="flex flex-col items-center text-center p-6">
                  <div className="mb-4 rounded-full bg-purple-100 p-3">
                    {feature.icon}
                  </div>
                  <CardTitle className="mb-2">{feature.title}</CardTitle>
                  <CardContent>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Connect your wallet", icon: <Wallet className="h-8 w-8" /> },
                { title: "Create or select ad space", icon: <PlusCircle className="h-8 w-8" /> },
                { title: "Place your ad and pay in crypto", icon: <FileImage className="h-8 w-8" /> },
                { title: "Generate and store your ad as an NFT", icon: <BarChart3 className="h-8 w-8" /> },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-full bg-purple-100 p-3">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  {index < 3 && <ArrowRight className="h-8 w-8 mt-4 text-purple-500 hidden lg:block" />}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "John Doe", company: "Tech Co", text: "This platform revolutionized our ad strategy!" },
                { name: "Jane Smith", company: "Marketing Inc", text: "The transparency and security are unmatched." },
                { name: "Bob Johnson", company: "Ad Agency", text: "Decentralized ads are the future of advertising." },
              ].map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <Avatar className="h-16 w-16 mb-4">
                      <AvatarImage src={`/placeholder.svg?height=64&width=64`} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <p className="mb-2 text-sm text-gray-500">{testimonial.text}</p>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}