import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Palette, Download, Star, Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { AuthModal } from '../components/auth/AuthModal';

const features = [
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Beautiful Templates',
    description: 'Choose from professionally designed templates that make you stand out.'
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Real-time Preview',
    description: 'See your changes instantly with our live preview as you edit.'
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'PDF Export',
    description: 'Export high-quality PDFs that look perfect on any device.'
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b605?w=64&h=64&fit=crop&crop=face',
    content: 'CV Builder helped me create a professional resume that landed me my dream job at a tech startup.'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Marketing Manager',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    content: 'The templates are gorgeous and the editing experience is incredibly smooth. Highly recommend!'
  },
  {
    name: 'Emily Watson',
    role: 'Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
    content: 'Finally, a CV builder that understands design. The dark theme is a perfect touch for my aesthetic.'
  }
];

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative px-4 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-100 mb-6">
              Build Your
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                {' '}Dream CV
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create stunning, professional resumes with our intuitive editor. Dark-themed, 
              modern templates that make you stand out from the crowd.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" onClick={() => setShowAuthModal(true)} className="px-8 py-4">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="ghost" size="lg" className="px-8 py-4">
                View Templates
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Powerful features designed to help you create the perfect resume
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full" hover>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-purple-400">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Preview Section */}
      <section className="px-4 py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              Beautiful Templates
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose from our collection of professionally designed templates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Minimal', 'Modern', 'Creative'].map((template, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden" hover>
                  <div className="aspect-[3/4] bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                    <div className="p-4 space-y-2 text-xs">
                      {template === 'Minimal' && (
                        <>
                          <div className="h-3 bg-gray-600 rounded w-2/3"></div>
                          <div className="h-1 bg-gray-700 rounded w-1/2"></div>
                          <div className="border-b border-gray-700 my-3"></div>
                          <div className="space-y-1">
                            <div className="h-1 bg-gray-700 rounded"></div>
                            <div className="h-1 bg-gray-700 rounded w-4/5"></div>
                          </div>
                        </>
                      )}
                      {template === 'Modern' && (
                        <>
                          <div className="flex space-x-2">
                            <div className="flex-1 space-y-1">
                              <div className="h-2 bg-gray-600 rounded"></div>
                              <div className="h-1 bg-gray-700 rounded w-3/4"></div>
                            </div>
                            <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="space-y-1">
                              <div className="h-1 bg-purple-500 rounded w-1/2"></div>
                              <div className="h-1 bg-gray-700 rounded"></div>
                            </div>
                          </div>
                        </>
                      )}
                      {template === 'Creative' && (
                        <>
                          <div className="bg-purple-600 h-6 rounded-t-lg -mx-4 -mt-4 mb-2"></div>
                          <div className="h-2 bg-gray-600 rounded w-1/2 mx-auto text-center"></div>
                          <div className="space-y-1 mt-3">
                            <div className="h-1 bg-purple-500 rounded w-1/3"></div>
                            <div className="h-1 bg-gray-700 rounded"></div>
                            <div className="h-1 bg-gray-700 rounded w-4/5"></div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-100 mb-2">{template}</h3>
                    <p className="text-gray-400 text-sm">Perfect for {template.toLowerCase()} professionals</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-100 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of professionals who've landed their dream jobs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-100">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of professionals and start creating your standout CV today
            </p>
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4"
              onClick={() => setShowAuthModal(true)}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}