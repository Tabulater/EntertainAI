import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, Users } from 'lucide-react';

interface PrivacyPageProps {
  onBack: () => void;
}

export default function Privacy({ onBack }: PrivacyPageProps) {
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
            <Shield className="w-6 h-6" />
            Privacy Policy
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <div className="mb-8">
            <p className="text-gray-300 text-sm">
              Last updated: July 12, 2025
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                This privacy policy explains how we handle your data when you use our AI-powered entertainment creation platform. 
                This is a hackathon project created by Aashrith Raj Tatipamula, designed to demonstrate AI-powered storytelling 
                and movie generation capabilities.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Database className="w-5 h-5" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Information</h3>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Email address and password for account creation (via Supabase)</li>
                    <li>• Display name and basic profile information</li>
                    <li>• Account preferences and settings</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Content You Create</h3>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Interactive stories and branching narratives</li>
                    <li>• AI-generated movie concepts and prompts</li>
                    <li>• Collaboration data and shared projects</li>
                    <li>• Analytics and usage patterns</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Technical Data</h3>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Browser type and device information</li>
                    <li>• Feature usage and interaction patterns</li>
                    <li>• Error logs and performance data</li>
                    <li>• Session information and preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                How We Use Your Information
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  We use your information to:
                </p>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Provide and maintain the entertainment creation platform</li>
                  <li>• Process your AI generation requests and creative content</li>
                  <li>• Enable collaboration features between users</li>
                  <li>• Improve platform functionality and user experience</li>
                  <li>• Analyze usage patterns to enhance features</li>
                  <li>• Ensure platform security and prevent misuse</li>
                </ul>
              </div>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Data Sharing and Disclosure
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information. We may share your data only in the following circumstances:
              </p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>• With your explicit consent for collaboration features</li>
                <li>• To comply with legal obligations or court orders</li>
                <li>• To protect our rights, property, or safety</li>
                <li>• With Supabase (our database provider) for platform operations</li>
                <li>• For hackathon demonstration and educational purposes</li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Data Security
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We implement security measures to protect your data:
              </p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>• Secure authentication via Supabase</li>
                <li>• Encryption of data in transit and at rest</li>
                <li>• Regular security updates and monitoring</li>
                <li>• Limited access to personal data</li>
                <li>• Secure API endpoints and data validation</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Privacy Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>• Access and review your personal data</li>
                <li>• Update or correct your information</li>
                <li>• Request deletion of your account and data</li>
                <li>• Export your creative content and stories</li>
                <li>• Opt-out of non-essential communications</li>
                <li>• Control your collaboration and sharing settings</li>
              </ul>
            </section>

            {/* AI and Data */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">AI and Your Data</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                This platform uses AI technology for content generation. Please note:
              </p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>• AI-generated content may be processed by third-party AI services</li>
                <li>• Your prompts and inputs may be used to improve AI models</li>
                <li>• AI-generated content is not guaranteed to be unique</li>
                <li>• You retain ownership of your original creative content</li>
                <li>• AI-generated content should be reviewed before use</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this privacy policy or our data practices, 
                please contact the developer at{' '}
                <a href="mailto:tatipamula.aashrithraj@gmail.com" className="text-purple-400 hover:text-purple-300">
                  tatipamula.aashrithraj@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 