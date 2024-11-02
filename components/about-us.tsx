'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Shield, BarChart, Zap } from 'lucide-react'

export function AboutUsComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            About AdChain
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Transforming digital advertising with blockchain technology
          </motion.p>
        </div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-800">About Us</h2>
          <p className="text-lg mb-4">
            Welcome to the future of digital advertising, powered by blockchain! Our platform, <em>SubscriptionAdExchange</em>, is transforming how advertising spaces are bought, sold, and managed. By leveraging blockchain technology, we provide a decentralized marketplace where ad space is tokenized as a digital asset, allowing advertisers and publishers to interact in a transparent, secure, and efficient environment.
          </p>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-800">How It Works</h2>
          <ul className="list-disc list-inside space-y-4 text-lg">
            <li><strong>Tokenized Ad Spaces:</strong> We represent ad spaces as NFTs, making it easy to trade, rent, or hold ad inventory across different platforms. Each ad space is unique and comes with clear terms for monthly usage fees, ensuring predictability and security for both sellers and buyers.</li>
            <li><strong>Subscription Model:</strong> Our model allows advertisers to pay an initial acquisition fee, followed by monthly payments to maintain control over their ad space. If a user stops payment, the ad space automatically reverts to the original seller, maintaining a fair and streamlined process.</li>
            <li><strong>PYUSD Integration:</strong> For stable and reliable transactions, we've integrated <strong>PayPal's PYUSD</strong> as our exclusive currency, allowing advertisers and publishers to handle payments seamlessly without concerns about market volatility. PYUSD's stability ensures that ad inventory pricing remains predictable, providing users with a trusted, regulated stablecoin.</li>
          </ul>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Benefits of a Decentralized Ad Marketplace</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Transparency & Security</h3>
              <p>Each transaction is securely recorded on the blockchain, creating a transparent and immutable record of ad space ownership and transactions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <BarChart className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Decentralized Analytics</h3>
              <p>Users can track performance metrics in real-time through an analytics dashboard, built to provide insights directly from the blockchain.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Zap className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible & Scalable</h3>
              <p>Our platform is designed to scale with the growing digital ad ecosystem, allowing you to set your own pricing and usage terms.</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Why SubscriptionAdExchange?</h2>
          <p className="text-lg mb-4">
            With a user-friendly interface, secure transactions, and a decentralized approach, <em>SubscriptionAdExchange</em> is built to meet the needs of modern digital advertisers and publishers. Our commitment to innovation ensures that advertisers have greater control and insights, while publishers can monetize their assets more effectively.
          </p>
          <p className="text-lg mb-4">
            Explore how SubscriptionAdExchange is pioneering a new era in advertising—where ownership is digital, payments are stable, and opportunities are endless.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center hover:bg-blue-700 transition-colors">
            Get Started
            <ArrowRight className="ml-2" />
          </button>
        </motion.section>
      </div>
    </div>
  )
}