import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="py-6">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <MessageCircle className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold">ChatApp</span>
            </motion.div>
            
            <div className="space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-blue-600 hover:text-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
        <main className="py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Connect with friends instantly
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Experience seamless communication with our modern chat application.
              Stay connected with friends and family, anywhere, anytime.
            </p>
            
            <Link
              to="/register"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all"
            >
              Get Started
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Landing;