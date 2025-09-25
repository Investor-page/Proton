// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Data (equivalent to React constants)
  const services = [
    {
      id: 'retirement',
      title: 'Retirement Planning',
      description: 'Secure your golden years with comprehensive retirement strategies tailored to your goals.',
      details: "Our retirement planning service includes comprehensive analysis of your current financial situation, projection of retirement needs, Social Security optimization, and creation of a customized savings and investment strategy to ensure you can maintain your desired lifestyle throughout retirement."
    },
    {
      id: 'investment',
      title: 'Investment Management',
      description: 'Grow your wealth with personalized investment portfolios and strategic asset allocation.',
      details: "Our investment management approach combines modern portfolio theory with personalized risk assessment to create diversified investment portfolios. We continuously monitor and rebalance your investments to align with your financial goals and market conditions."
    },
    {
      id: 'tax',
      title: 'Tax Optimization',
      description: 'Minimize tax liabilities and maximize returns with smart tax planning strategies.',
      details: "Our tax optimization strategies include tax-loss harvesting, retirement account optimization, charitable giving strategies, and estate planning techniques to minimize your tax burden and maximize your after-tax returns across all investment accounts."
    },
    {
      id: 'estate',
      title: 'Estate Planning',
      description: 'Protect your legacy and ensure your assets are distributed according to your wishes.',
      details: "Our estate planning services help you protect your assets and ensure your wishes are carried out. We assist with wills, trusts, powers of attorney, and healthcare directives, working with your legal team to create a comprehensive estate plan."
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

  // State (equivalent to React useState)
  let activeTab = 'retirement';
  let calculatorValues = {
    currentSavings: 100000,
    monthlyContribution: 1000,
    interestRate: 6,
    years: 20
  };
  let testimonialIndex = 0;
  let formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  let formSubmitted = false;

  // DOM Elements
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceTitleEl = document.getElementById('service-title');
  const serviceDescriptionEl = document.getElementById('service-description');
  const calculatorInputs = document.querySelectorAll('#calculator input');
  const futureValueEl = document.getElementById('future-value');
  const futureValueSubtitleEl = document.getElementById('future-value-subtitle');
  const totalContributionsEl = document.getElementById('total-contributions');
  const interestEarnedEl = document.getElementById('interest-earned');
  const testimonialQuoteEl = document.getElementById('testimonial-quote');
  const testimonialAuthorEl = document.getElementById('testimonial-author');
  const testimonialPositionEl = document.getElementById('testimonial-position');
  const testimonialDots = document.querySelectorAll('.dot');
  const contactForm = document.getElementById('contact-form');
  const formContainer = document.getElementById('form-container');
  const successMessage = document.getElementById('success-message');
  const formInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');

  // Functions

  // Update service details
  function updateServiceDetails() {
    const activeService = services.find(s => s.id === activeTab);
    if (activeService) {
      serviceTitleEl.textContent = `${activeService.title} Details`;
      serviceDescriptionEl.textContent = activeService.details;
    }
  }

  // Calculate future value (exact same formula as React)
  function calculateFutureValue() {
    const { currentSavings, monthlyContribution, interestRate, years } = calculatorValues;
    const monthlyRate = interestRate / 100 / 12;
    const months = years * 12;
    
    const futureSavings = currentSavings * Math.pow(1 + monthlyRate, months) +
      monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    
    const futureValue = Math.round(futureSavings);
    const totalContributions = currentSavings + monthlyContribution * years * 12;
    const interestEarned = futureValue - totalContributions;

    futureValueEl.textContent = `$${futureValue.toLocaleString()}`;
    futureValueSubtitleEl.textContent = `Estimated value after ${years} years`;
    totalContributionsEl.textContent = `$${totalContributions.toLocaleString()}`;
    interestEarnedEl.textContent = `$${interestEarned.toLocaleString()}`;
  }

  // Update testimonial
  function updateTestimonial() {
    const testimonial = testimonials[testimonialIndex];
    testimonialQuoteEl.textContent = testimonial.quote;
    testimonialAuthorEl.textContent = testimonial.author;
    testimonialPositionEl.textContent = testimonial.position;

    // Update dots
    testimonialDots.forEach((dot, index) => {
      dot.classList.toggle('active', index === testimonialIndex);
    });
  }

  // Handle calculator input change
  function handleCalculatorChange(e) {
    const { name, value } = e.target;
    calculatorValues[name] = parseFloat(value) || 0;
    calculateFutureValue();
  }

  // Handle form input change
  function handleFormChange(e) {
    const { name, value } = e.target;
    formData[name] = value;
  }

  // Handle form submit
  function handleFormSubmit(e) {
    e.preventDefault();
    console.log('Form submitted:', formData);
    formSubmitted = true;
    formContainer.style.display = 'none';
    successMessage.style.display = 'block';
    
    setTimeout(() => {
      formSubmitted = false;
      formContainer.style.display = 'block';
      successMessage.style.display = 'none';
      contactForm.reset();
      formData = { name: '', email: '', phone: '', message: '' };
    }, 3000);
  }

  // Event Listeners

  // Service cards click
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      activeTab = id;

      // Update active class
      serviceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      updateServiceDetails();
    });
  });

  // Calculator inputs
  calculatorInputs.forEach(input => {
    input.addEventListener('input', handleCalculatorChange);
  });

  // Testimonial dots click
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      testimonialIndex = index;
      updateTestimonial();
    });
  });

  // Contact form
  formInputs.forEach(input => {
    input.addEventListener('input', handleFormChange);
  });
  contactForm.addEventListener('submit', handleFormSubmit);

  // Auto-rotate testimonials (every 5 seconds)
  const testimonialInterval = setInterval(() => {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    updateTestimonial();
  }, 5000);

  // Initial setup
  updateServiceDetails();
  calculateFutureValue();
  updateTestimonial();

  // Cleanup on page unload (optional, but good practice)
  window.addEventListener('beforeunload', () => {
    clearInterval(testimonialInterval);
  });
});
