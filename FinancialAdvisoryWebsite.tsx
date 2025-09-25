import React, { useState, useEffect } from 'react';
import { Button } from "/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card";
import { Input } from "/components/ui/input";
import { Label } from "/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const FinancialAdvisoryWebsite = () => {
  const [activeTab, setActiveTab] = useState('retirement');
  const [calculatorValues, setCalculatorValues] = useState({
    currentSavings: 100000,
    monthlyContribution: 1000,
    interestRate: 6,
    years: 20
  });
  const [futureValue, setFutureValue] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Calculate future value
  useEffect(() => {
    const { currentSavings, monthlyContribution, interestRate, years } = calculatorValues;
    const monthlyRate = interestRate / 100 / 12;
    const months = years * 12;
    
    const futureSavings = currentSavings * Math.pow(1 + monthlyRate, months) +
      monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    setFutureValue(Math.round(futureSavings));
  }, [calculatorValues]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCalculatorValues(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const services = [
    {
      id: 'retirement',
      title: 'Retirement Planning',
      description: 'Secure your golden years with comprehensive retirement strategies tailored to your goals.',
      icon: '🏖️'
    },
    {
      id: 'investment',
      title: 'Investment Management',
      description: 'Grow your wealth with personalized investment portfolios and strategic asset allocation.',
      icon: '📈'
    },
    {
      id: 'tax',
      title: 'Tax Optimization',
      description: 'Minimize tax liabilities and maximize returns with smart tax planning strategies.',
      icon: '💰'
    },
    {
      id: 'estate',
      title: 'Estate Planning',
      description: 'Protect your legacy and ensure your assets are distributed according to your wishes.',
      icon: '🏛️'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Financial Advisor',
      experience: '15+ years',
      specialty: 'Retirement Planning'
    },
    {
      name: 'Michael Chen',
      role: 'Investment Strategist',
      experience: '12+ years',
      specialty: 'Wealth Management'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Tax Specialist',
      experience: '10+ years',
      specialty: 'Tax Optimization'
    }
  ];

  const testimonials = [
    {
      quote: "The team at WealthFront helped me develop a retirement plan that gives me complete peace of mind. I'm now confidently on track to retire at 60.",
      author: "Robert Miller",
      position: "Retired Engineer"
    },
    {
      quote: "Their investment strategies have outperformed the market by 15% for three consecutive years. Exceptional service and results.",
      author: "Jennifer Williams",
      position: "Business Owner"
    },
    {
      quote: "The tax optimization plan saved me over $40,000 in the first year alone. Worth every penny of the advisory fee.",
      author: "David Thompson",
      position: "Medical Professional"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-background border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-foreground">WealthFront</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#calculator" className="text-foreground hover:text-primary transition-colors">Calculator</a>
            <a href="#team" className="text-foreground hover:text-primary transition-colors">Team</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Schedule Consultation</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Smart Financial Planning for <span className="text-primary">Your Future</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Personalized wealth management strategies to help you achieve your financial goals with confidence and clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Comprehensive Financial Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Tailored solutions for every stage of your financial journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activeTab === service.id ? 'border-primary ring-2 ring-primary/20' : ''
                }`}
                onClick={() => setActiveTab(service.id)}
              >
                <CardHeader className="text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Service Details */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-2xl">
                {services.find(s => s.id === activeTab)?.title} Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {activeTab === 'retirement' && "Our retirement planning service includes comprehensive analysis of your current financial situation, projection of retirement needs, Social Security optimization, and creation of a customized savings and investment strategy to ensure you can maintain your desired lifestyle throughout retirement."}
                {activeTab === 'investment' && "Our investment management approach combines modern portfolio theory with personalized risk assessment to create diversified investment portfolios. We continuously monitor and rebalance your investments to align with your financial goals and market conditions."}
                {activeTab === 'tax' && "Our tax optimization strategies include tax-loss harvesting, retirement account optimization, charitable giving strategies, and estate planning techniques to minimize your tax burden and maximize your after-tax returns across all investment accounts."}
                {activeTab === 'estate' && "Our estate planning services help you protect your assets and ensure your wishes are carried out. We assist with wills, trusts, powers of attorney, and healthcare directives, working with your legal team to create a comprehensive estate plan."}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-20 px-6 bg-muted">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Retirement Calculator
            </h2>
            <p className="text-muted-foreground">
              See how your savings can grow over time with compound interest
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Input Your Numbers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentSavings">Current Savings ($)</Label>
                  <Input
                    id="currentSavings"
                    name="currentSavings"
                    type="number"
                    value={calculatorValues.currentSavings}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
                  <Input
                    id="monthlyContribution"
                    name="monthlyContribution"
                    type="number"
                    value={calculatorValues.monthlyContribution}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                  <Input
                    id="interestRate"
                    name="interestRate"
                    type="number"
                    step="0.1"
                    value={calculatorValues.interestRate}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="years">Years Until Retirement</Label>
                  <Input
                    id="years"
                    name="years"
                    type="number"
                    value={calculatorValues.years}
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-primary-foreground">Future Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-5xl font-bold mb-4">
                    ${futureValue.toLocaleString()}
                  </div>
                  <p className="text-primary-foreground/80">
                    Estimated value after {calculatorValues.years} years
                  </p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Contributions:</span>
                    <span>${(calculatorValues.currentSavings + calculatorValues.monthlyContribution * calculatorValues.years * 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interest Earned:</span>
                    <span>${(futureValue - (calculatorValues.currentSavings + calculatorValues.monthlyContribution * calculatorValues.years * 12)).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-muted-foreground">
              Certified financial professionals with decades of combined experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src="https://placeholder-image-service.onrender.com/image/96x96?prompt=Professional financial advisor portrait&id=2d6ec822-f034-42a9-ae75-06549a7b1ca2" 
                      alt={`Professional portrait of ${member.name}, ${member.role}`}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Experience:</span>
                      <span>{member.experience}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Specialty:</span>
                      <span>{member.specialty}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-muted">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Client Success Stories
            </h2>
            <p className="text-muted-foreground">
              Hear from our satisfied clients about their financial journey
            </p>
          </div>

          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-4xl mb-4">"</div>
              <p className="text-xl text-muted-foreground italic mb-6">
                {testimonials[testimonialIndex].quote}
              </p>
              <div>
                <p className="font-semibold text-foreground">{testimonials[testimonialIndex].author}</p>
                <p className="text-muted-foreground">{testimonials[testimonialIndex].position}</p>
              </div>
              <div className="flex justify-center space-x-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setTestimonialIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === testimonialIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Start Your Financial Journey?
            </h2>
            <p className="text-muted-foreground">
              Schedule a free consultation with one of our financial advisors
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="text-2xl text-primary font-bold mb-2">Thank You!</div>
                  <p className="text-muted-foreground">
                    Your message has been received. We'll contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">How can we help you?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-foreground py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-background">WealthFront</span>
            </div>
            <p className="text-muted-foreground">
              Providing expert financial guidance to help you achieve your dreams.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-background mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Retirement Planning</li>
              <li>Investment Management</li>
              <li>Tax Optimization</li>
              <li>Estate Planning</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-background mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>info@wealthfront.com</li>
              <li>(555) 123-4567</li>
              <li>123 Financial District</li>
              <li>San Francisco, CA 94105</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-background mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background">
                <span className="sr-only">Twitter</span>
                🐦
              </Button>
              <Button variant="ghost" size="icon" className="text-background">
                <span className="sr-only">LinkedIn</span>
                💼
              </Button>
              <Button variant="ghost" size="icon" className="text-background">
                <span className="sr-only">Facebook</span>
                📘
              </Button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>© 2024 WealthFront Financial Advisors. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FinancialAdvisoryWebsite;
