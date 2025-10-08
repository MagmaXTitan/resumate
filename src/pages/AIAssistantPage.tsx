import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Copy, Check, RefreshCw, Key, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useCV } from '../contexts/CVContext';
import { aiService } from '../services/aiService';
import { APIKeyModal } from '../components/ai/APIKeyModal';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

const AI_PROMPTS = [
  {
    title: "Improve Summary",
    description: "Enhance your professional summary",
    prompt: "Help me improve my professional summary to make it more compelling and impactful."
  },
  {
    title: "Optimize Experience",
    description: "Better describe your work experience",
    prompt: "Help me rewrite my work experience descriptions to be more achievement-focused and impactful."
  },
  {
    title: "Skills Suggestions",
    description: "Get relevant skills recommendations",
    prompt: "Based on my experience, suggest additional skills I should add to my CV."
  },
  {
    title: "Cover Letter",
    description: "Generate a cover letter",
    prompt: "Help me write a compelling cover letter based on my CV."
  },
  {
    title: "Interview Prep",
    description: "Prepare for interviews",
    prompt: "Help me prepare for interviews based on my CV and experience."
  },
  {
    title: "Career Advice",
    description: "Get personalized career guidance",
    prompt: "Provide career advice based on my current CV and experience."
  }
];

export function AIAssistantPage() {
  const { currentCV } = useCV();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        content: `Hello! I'm your AI CV assistant. I can help you improve your resume, write cover letters, prepare for interviews, and provide career advice. How can I assist you today?`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Check if API key is configured
    if (!aiService.hasApiKey()) {
      setShowAPIKeyModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await aiService.generateResponse(content, currentCV);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error generating AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, I encountered an error: ${error.message || 'Unknown error'}. Please check your API key configuration or try again later.`,
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    // Focus the input after state update
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const copyToClipboard = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">AI CV Assistant</h1>
              <p className="text-gray-400">Get personalized help with your resume and career</p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="flex gap-2 mb-6">
            <Button
              variant="secondary"
              size="sm"
              onClick={clearChat}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Clear Chat
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowAPIKeyModal(true)}
              className="flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              {aiService.hasApiKey() ? 'Update API Key' : 'Set API Key'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
                            : 'bg-gray-800 text-gray-100'
                        }`}>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => copyToClipboard(message.content, message.id)}
                              className="text-gray-500 hover:text-gray-300 transition-colors"
                            >
                              {copiedMessageId === message.id ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {message.role === 'user' && (
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-300" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-800 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-gray-400 text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-700">
                {!aiService.hasApiKey() && (
                  <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-500/30 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <p className="text-sm text-yellow-400">
                      Please configure your OpenAI API key to use AI features.
                    </p>
                  </div>
                )}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                      placeholder={aiService.hasApiKey() ? "Ask me anything about your CV..." : "Configure API key to start chatting..."}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading || !aiService.hasApiKey()}
                    />
                  </div>
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isLoading || !aiService.hasApiKey()}
                    className="px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Prompts Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-white">Quick Prompts</h3>
                </div>
                
                <div className="space-y-3">
                  {AI_PROMPTS.map((prompt, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePromptClick(prompt.prompt)}
                      className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
                    >
                      <h4 className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">
                        {prompt.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
                        {prompt.description}
                      </p>
                    </motion.button>
                  ))}
                </div>

                {/* CV Info */}
                {currentCV && (
                  <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-sm font-medium text-white mb-2">Current CV</h4>
                    <p className="text-xs text-gray-400">{currentCV.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {currentCV.sections.length} sections
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* API Key Modal */}
      <APIKeyModal
        isOpen={showAPIKeyModal}
        onClose={() => setShowAPIKeyModal(false)}
      />
    </div>
  );
}
