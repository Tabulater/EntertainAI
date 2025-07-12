import React from 'react';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export default function Terms({ onBack }: TermsPageProps) {
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
            <FileText className="w-6 h-6" />
            Terms of Service
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
                <Scale className="w-5 h-5" />
                Agreement to Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using this AI-powered entertainment creation platform, you accept and agree to be bound by these terms. 
                This is a hackathon project created by Aashrith Raj Tatipamula for educational and demonstration purposes.
              </p>
            </section>

            {/* Service Description */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Service Description</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                This platform is an AI-powered entertainment creation tool that provides:
              </p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>• Interactive story creation with branching narratives</li>
                <li>• AI-powered movie concept and trailer generation</li>
                <li>• Real-time collaboration features for creative projects</li>
                <li>• Analytics dashboard for project insights</li>
                <li>• Content sharing and export capabilities</li>
              </ul>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    Account Responsibilities
                  </h3>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• You must be at least 13 years old to create an account</li>
                    <li>• Provide accurate and complete registration information</li>
                    <li>• Maintain the security of your account credentials</li>
                    <li>• Notify us immediately of any unauthorized use</li>
                    <li>• Use the platform responsibly and ethically</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    Prohibited Activities
                  </h3>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Creating multiple accounts for abuse purposes</li>
                    <li>• Sharing account credentials with others</li>
                    <li>• Attempting to gain unauthorized access to other accounts</li>
                    <li>• Using automated systems to access the service</li>
                    <li>• Generating harmful or inappropriate content</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Content Guidelines */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Content Guidelines
              </h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  You retain ownership of content you create, but you agree not to upload, create, or share content that:
                </p>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Violates any applicable laws or regulations</li>
                  <li>• Infringes on intellectual property rights</li>
                  <li>• Contains hate speech, harassment, or discrimination</li>
                  <li>• Includes explicit sexual content or graphic violence</li>
                  <li>• Promotes illegal activities or harmful behavior</li>
                  <li>• Contains malware, viruses, or harmful code</li>
                  <li>• Impersonates others or misrepresents identity</li>
                </ul>
              </div>
            </section>

            {/* AI-Generated Content */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">AI-Generated Content</h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  This platform uses AI technology to generate creative content. By using these features, you acknowledge:
                </p>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• AI-generated content may not be unique and could be similar to other users' content</li>
                  <li>• You are responsible for reviewing and editing AI-generated content</li>
                  <li>• We do not guarantee the accuracy, quality, or appropriateness of AI-generated content</li>
                  <li>• You should not rely solely on AI-generated content for critical decisions</li>
                  <li>• AI-generated content should be used responsibly and ethically</li>
                  <li>• Third-party AI services may process your prompts and inputs</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Your Content</h3>
                  <p className="text-gray-300 leading-relaxed">
                    You retain ownership of content you create. By using our platform, you grant us a license to:
                  </p>
                  <ul className="text-gray-300 space-y-1 ml-4">
                    <li>• Store and display your content on our platform</li>
                    <li>• Use your content to provide and improve our services</li>
                    <li>• Share your content as directed by your privacy settings</li>
                    <li>• Use your content for hackathon demonstration purposes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Platform Technology</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The platform, including its design, features, and technology, is created by Aashrith Raj Tatipamula 
                    and is protected by intellectual property laws. This is a hackathon project for educational purposes.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy and Data */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Privacy and Data</h2>
              <p className="text-gray-300 leading-relaxed">
                Your privacy is important to us. Our collection and use of your data is governed by our Privacy Policy, 
                which is incorporated into these Terms by reference.
              </p>
            </section>

            {/* Service Availability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Service Availability</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                As a hackathon project, we strive to provide reliable service but cannot guarantee:
              </p>
              <ul className="text-gray-300 space-y-2 ml-4">
                <li>• Uninterrupted or error-free service</li>
                <li>• Immediate resolution of technical issues</li>
                <li>• Compatibility with all devices or browsers</li>
                <li>• Availability during maintenance periods</li>
                <li>• Long-term service availability</li>
              </ul>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Account Termination</h2>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  We may terminate or suspend your account if you:
                </p>
                <ul className="text-gray-300 space-y-2 ml-4">
                  <li>• Violate these Terms of Service</li>
                  <li>• Engage in fraudulent or abusive behavior</li>
                  <li>• Create inappropriate or harmful content</li>
                  <li>• Request account deletion</li>
                </ul>
                <p className="text-gray-300 leading-relaxed">
                  Upon termination, your access to the service will cease, and we may delete your account data 
                  in accordance with our Privacy Policy.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
              <p className="text-gray-300 leading-relaxed">
                This is a hackathon project created for educational purposes. To the maximum extent permitted by law, 
                the developer shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
                including but not limited to loss of profits, data, or use.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of significant changes 
                via email or platform notification. Continued use of the service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service, please contact the developer at{' '}
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