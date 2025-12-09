import { useState } from 'react';
import { Search, HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const faqs: FAQItem[] = [
    {
      category: 'Booking',
      question: 'How do I book a movie ticket?',
      answer: 'Browse movies on the homepage, select a movie, choose your preferred showtime, select your seats, and proceed to payment. You\'ll receive a confirmation email with your QR code ticket.',
    },
    {
      category: 'Booking',
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel your booking up to 2 hours before the showtime for a full refund. Go to "My Bookings" and click the "Cancel" button on your booking.',
    },
    {
      category: 'Booking',
      question: 'How many tickets can I book at once?',
      answer: 'You can book up to 10 tickets per transaction. For group bookings of more than 10 people, please contact our support team.',
    },
    {
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayPal, and mobile payment options like Apple Pay and Google Pay.',
    },
    {
      category: 'Payment',
      question: 'Is my payment information secure?',
      answer: 'Yes, all payment transactions are encrypted and processed through secure, PCI-compliant payment gateways. We never store your complete card details.',
    },
    {
      category: 'Payment',
      question: 'When will I receive my refund?',
      answer: 'Refunds are processed within 5-7 business days and will be credited back to your original payment method.',
    },
    {
      category: 'Tickets',
      question: 'How do I access my ticket?',
      answer: 'After booking, you\'ll receive an email with your ticket. You can also view and download your ticket from the "My Bookings" section. Show the QR code at the cinema entrance.',
    },
    {
      category: 'Tickets',
      question: 'Can I share my ticket with someone else?',
      answer: 'Yes, you can share your ticket QR code with others. However, each QR code can only be scanned once at the entrance.',
    },
    {
      category: 'Tickets',
      question: 'What if I lose my ticket?',
      answer: 'Don\'t worry! You can always access your ticket from the "My Bookings" section using your account. You can also check your email for the confirmation.',
    },
    {
      category: 'Account',
      question: 'Do I need an account to book tickets?',
      answer: 'Yes, you need to create an account to book tickets. This helps us keep track of your bookings and send you important updates.',
    },
    {
      category: 'Account',
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link.',
    },
    {
      category: 'Account',
      question: 'Can I change my email address?',
      answer: 'For security reasons, email addresses cannot be changed directly. Please contact our support team for assistance.',
    },
  ];

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent',
      description: 'We\'ll get back to you within 24 hours.',
    });
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <>
      <Helmet>
        <title>Help & Support | SCREEMA</title>
        <meta name="description" content="Get help with booking tickets, payments, and more." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl font-bold mb-4">How can we help you?</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Search our FAQ or contact support for assistance
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for help..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg"
                />
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass rounded-2xl p-6 border border-border/50 text-center hover:border-primary/50 transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Chat with our support team
                </p>
                <Button variant="outline" size="sm">Start Chat</Button>
              </div>

              <div className="glass rounded-2xl p-6 border border-border/50 text-center hover:border-blue-500/50 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  support@screema.com
                </p>
                <Button variant="outline" size="sm">Send Email</Button>
              </div>

              <div className="glass rounded-2xl p-6 border border-border/50 text-center hover:border-green-500/50 transition-all">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  +1 (555) 123-4567
                </p>
                <Button variant="outline" size="sm">Call Now</Button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold">Frequently Asked Questions</h2>
              </div>

              {categories.map((category) => (
                <div key={category} className="mb-8">
                  <h3 className="font-semibold text-lg mb-4 text-primary">{category}</h3>
                  <div className="space-y-3">
                    {filteredFAQs
                      .filter((faq) => faq.category === category)
                      .map((faq, index) => {
                        const globalIndex = faqs.indexOf(faq);
                        return (
                          <div
                            key={globalIndex}
                            className="glass rounded-xl border border-border/50 overflow-hidden"
                          >
                            <button
                              onClick={() =>
                                setExpandedFAQ(expandedFAQ === globalIndex ? null : globalIndex)
                              }
                              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                            >
                              <span className="font-semibold text-left">{faq.question}</span>
                              {expandedFAQ === globalIndex ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0 ml-4" />
                              )}
                            </button>
                            {expandedFAQ === globalIndex && (
                              <div className="px-4 pb-4 text-muted-foreground">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">
                    No results found. Try a different search term.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="glass rounded-2xl p-8 border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold">Still need help?</h2>
                  <p className="text-sm text-muted-foreground">Send us a message and we'll get back to you</p>
                </div>
              </div>

              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={contactForm.subject}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, subject: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Help;
