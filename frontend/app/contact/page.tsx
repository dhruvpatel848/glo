'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Input, TextArea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });

        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <ScrollReveal animation="fadeInUp" className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100">
              Have questions? We're here to help. Reach out to us anytime.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <ScrollReveal animation="slideInLeft">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Get In Touch
                </h2>
                <p className="text-gray-600 text-lg mb-8">
                  We'd love to hear from you. Whether you have a question about our services,
                  pricing, or anything else, our team is ready to answer all your questions.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      <FaPhone size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600">+91 1234567890</p>
                      <p className="text-gray-600">+91 1234567891</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      <FaEnvelope size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">info@glocar.com</p>
                      <p className="text-gray-600">support@glocar.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      <FaMapMarkerAlt size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">
                        Surat, Gujarat<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                      <FaClock size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                      <FaWhatsapp size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                      <p className="text-gray-600 mb-2">Chat with us instantly</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                      >
                        Start Chat
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal animation="slideInRight">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                    Oops! Something went wrong. Please try again.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />

                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />

                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                    required
                  />

                  <TextArea
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    required
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal animation="fadeInUp">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Book a Service?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't wait! Book your car service online now and get your vehicle serviced by experts.
            </p>
            <motion.a
              href="/booking"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Now
            </motion.a>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
