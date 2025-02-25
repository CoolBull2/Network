import React, { useState } from 'react';
import axios from 'axios';
import { AuroraBackground } from '../components/ui/aurora-background';
import { motion } from 'framer-motion';
import { Wifi, Globe, Server, RefreshCw } from 'lucide-react';

function Issues() {
  const [pingResult, setPingResult] = useState('');
  const [selectedTest, setSelectedTest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const tests = [
    {
      id: 'connectivity',
      name: 'Internet Connectivity',
      icon: <Globe className="w-7 h-7" />,
      description: 'Test connection to major internet services'
    },
    {
      id: 'latency',
      name: 'Network Latency',
      icon: <Wifi className="w-7 h-7" />,
      description: 'Measure response times to key servers'
    },
    {
      id: 'dns',
      name: 'DNS Resolution',
      icon: <Server className="w-6 h-6" />,
      description: 'Check DNS server functionality'
    }
  ];

  const handleTest = async (testId) => {
    setIsLoading(true);
    setSelectedTest(testId);
    try {
      const response = await axios.get('http://127.0.0.1:5000/network-health');
      setPingResult(response.data.reason);
    } catch (error) {
      setPingResult('Error running network test');
    } finally {
      setIsLoading(false);
    }
  };
  //create for internet connectivity and dns resolution api


  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl px-4 py-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Network Diagnostics
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {tests.map((test) => (
            <motion.button
              key={test.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTest(test.id)}
              className={`p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg text-left transition-colors ${
                selectedTest === test.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="text-blue-500">{test.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {test.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {test.description}
              </p>
            </motion.button>
          ))}
        </div>

        {selectedTest && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Test Results
              </h3>
              {isLoading && (
                <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />
              )}
            </div>
            <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {pingResult || 'Running test...'}
            </pre>
          </motion.div>
        )}
      </motion.div>
    </AuroraBackground>
  );
}

export default Issues;