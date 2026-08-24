"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart, Users, Target } from 'lucide-react';
import { SauraBorder, GodnaBorder, CulturalDivider, DiamondAccent } from '@/components/patterns';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 md:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-charcoal">
              About Manikstu Agro
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Transforming goat farming through sustainable practices, community partnerships, and cutting-edge technology in the heart of Kalahandi, Odisha.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/collaborate"
                className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
              >
                Join Our Mission
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#timeline"
                className="border border-green-700 text-green-700 hover:bg-green-50 px-8 py-3 rounded-md font-medium transition-colors"
              >
                Our Journey
              </Link>
            </div>
          </div>
        </div>
        <SauraBorder className="absolute bottom-0 left-0 right-0" />
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal">Our Purpose</h2>
              <CulturalDivider className="mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-16 translate-x-16" />
                <Target className="w-12 h-12 text-green-700 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-charcoal">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To become India's most trusted goat farming ecosystem — connecting farmers with market access, technology, and sustainable practices that transform rural livelihoods and strengthen communities across Odisha and Chhattisgarh.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  By 2030, we aim to empower 50,000+ farmers with modern goat farming techniques, creating sustainable income streams and strengthening rural economies.
                </p>
                <GodnaBorder className="mt-6" />
              </div>

              <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-16 translate-x-16" />
                <Heart className="w-12 h-12 text-green-700 mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-charcoal">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To revolutionize goat farming through integrated solutions: providing high-quality genetics, comprehensive veterinary care, market access, and training programs that create lasting positive impact for farmers and their communities.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We believe in farming with heart — nurturing both goats and farmers towards a greener, more prosperous future.
                </p>
                <CulturalDivider className="mt-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-charcoal">Our Journey</h2>
            <CulturalDivider className="mx-auto mb-12" />

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-200" />

              {/* Timeline items */}
              <div className="space-y-12">
                {/* 2015 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-700 rounded-full border-4 border-white" />
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-cream rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-bold text-green-700 mb-2">2015</h3>
                      <h4 className="text-lg font-semibold mb-2">Manikstu Agro Founded</h4>
                      <p className="text-gray-600">
                        Started with a vision to transform goat farming in Kalahandi, beginning with 500 goats and 5 farming families.
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2" />
                </div>

                {/* 2018 */}
                <div className="relative flex items-center">
                  <div className="w-1/2" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-700 rounded-full border-4 border-white" />
                  <div className="w-1/2 pl-8">
                    <div className="bg-cream rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-bold text-green-700 mb-2">2018</h3>
                      <h4 className="text-lg font-semibold mb-2">First Training Program</h4>
                      <p className="text-gray-600">
                        Launched comprehensive goat care training, reaching 200 farmers across 3 districts with certified trainers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2021 */}
                <div className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-700 rounded-full border-4 border-white" />
                  <div className="w-1/2 pr-8 text-right">
                    <div className="bg-cream rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-bold text-green-700 mb-2">2021</h3>
                      <h4 className="text-lg font-semibold mb-2">Goat Bank Initiative</h4>
                      <p className="text-gray-600">
                        Started Samarth goat bank project, providing breeding stock to 1,000+ small farmers with community trust.
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2" />
                </div>

                {/* 2024 */}
                <div className="relative flex items-center">
                  <div className="w-1/2" />
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-700 rounded-full border-4 border-white" />
                  <div className="w-1/2 pl-8">
                    <div className="bg-cream rounded-lg p-6 shadow-md">
                      <h3 className="text-xl font-bold text-green-700 mb-2">2024</h3>
                      <h4 className="text-lg font-semibold mb-2">Website & E-commerce</h4>
                      <p className="text-gray-600">
                        Launched our digital presence with e-commerce platform for products, revolutionizing how farmers access quality goat products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-charcoal">Our Core Values</h2>
            <CulturalDivider className="mx-auto mb-12" />

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Community First</h3>
                <p className="text-gray-600">
                  We believe in farming with heart, nurturing both goats and farmers towards sustainable futures.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Quality</h3>
                <p className="text-gray-600">
                  We provide only the highest quality genetics, veterinary care, and farming practices for long-term success.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  Our practices protect the environment and create lasting economic value for rural communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-green-700 rounded-2xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-green-800/50" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Farm?</h2>
                <p className="text-green-100 mb-8 text-lg">
                  Join thousands of farmers who are already benefiting from our goat farming ecosystem.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="#contact"
                    className="bg-white text-green-700 hover:bg-green-50 px-8 py-3 rounded-md font-medium transition-colors"
                  >
                    Get in Touch
                  </Link>
                  <Link
                    href="/services"
                    className="border border-white text-white hover:bg-green-800 px-8 py-3 rounded-md font-medium transition-colors"
                  >
                    Our Services
                  </Link>
                </div>
              </div>
              <SauraBorder className="absolute bottom-0 left-0 right-0" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}