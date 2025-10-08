import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { aiService } from '../../services/aiService';

interface APIKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function APIKeyModal({ isOpen, onClose }: APIKeyModalProps) {
  const [apiKey, setApiKey] = useState(aiService.getApiKey() || '');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setValidationStatus('error');
      setErrorMessage('Please enter your OpenAI API key');
      return;
    }

    setIsValidating(true);
    setValidationStatus('idle');

    try {
      // Test the API key by making a simple request
      const testResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: 'Hello'
              }]
            }],
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
          }),
        }
      );

      if (testResponse.ok) {
        aiService.setApiKey(apiKey);
        setValidationStatus('success');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        const errorData = await testResponse.json().catch(() => ({}));
        console.error('API Key Validation Error:', errorData);
        throw new Error(errorData.error?.message || 'Invalid API key');
      }
    } catch (error: any) {
      setValidationStatus('error');
      setErrorMessage(error.message || 'Invalid API key. Please check your key and try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleRemove = () => {
    aiService.setApiKey('');
    setApiKey('');
    setValidationStatus('idle');
    setErrorMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md"
      >
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Key className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Google Gemini API Key</h2>
              <p className="text-sm text-gray-400">Configure your API key to use AI features</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API Key
              </label>
              <div className="relative">
                <Input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIza..."
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {validationStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-500/30 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{errorMessage}</p>
              </motion.div>
            )}

            {validationStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-500/30 rounded-lg"
              >
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                <p className="text-sm text-green-400">API key saved successfully!</p>
              </motion.div>
            )}

            <div className="bg-gray-800/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-white mb-2">How to get your API key:</h3>
              <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
                <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Google AI Studio</a></li>
                <li>Sign in to your Google account</li>
                <li>Click "Get API key" or "Create API key"</li>
                <li>Copy the generated key and paste it here</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                disabled={isValidating || !apiKey.trim()}
                className="flex-1"
              >
                {isValidating ? 'Validating...' : 'Save Key'}
              </Button>
              {aiService.hasApiKey() && (
                <Button
                  variant="secondary"
                  onClick={handleRemove}
                  disabled={isValidating}
                >
                  Remove
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isValidating}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
