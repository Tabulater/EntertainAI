import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageCircle, Send, CheckCircle, ExternalLink } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

export default function Contact({ onBack }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const emailSubject = `[${formData.subject}] - Contact from ${formData.name}`;
    const emailBody = `Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}`;

    // Open email client with pre-filled data
    const mailtoLink = `mailto:tatipamula.aashrithraj@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(mailtoLink);
    
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Contact Us
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Success Message */}
        {isSubmitted && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 mb-8 flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <div>
              <h3 className="text-green-400 font-semibold">Message Sent Successfully!</h3>
              <p className="text-green-300 text-sm">We'll get back to you soon.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="feature">Feature Request</option>
                  <option value="bug">Bug Report</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Developer Info */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Developer</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Developer</h3>
                    <p className="text-gray-300">Aashrith Raj Tatipamula</p>
                    <p className="text-gray-400 text-sm">Project Creator</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Portfolio</h3>
                    <a 
                      href="https://aashrithrajtatipamula.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2"
                    >
                      aashrithrajtatipamula.vercel.app
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <p className="text-gray-400 text-sm">Visit my portfolio</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">About This Project</h3>
              
              <div className="space-y-3">
                <p className="text-gray-300 text-sm">
                  This is an AI-powered entertainment creation platform built for a hackathon project.
                </p>
                <p className="text-gray-300 text-sm">
                  Features include interactive story building, AI movie generation, collaboration tools, and analytics.
                </p>
                <p className="text-gray-300 text-sm">
                  Built with React, TypeScript, and modern web technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 