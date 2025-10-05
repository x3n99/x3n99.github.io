// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'var(--white)';
                navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Portfolio Modal
const portfolioModal = document.getElementById('portfolioModal');
const portfolioData = [
    {
        title: 'Fantasy Character Design',
        description: 'A detailed character design for a fantasy RPG game. This project involved creating a unique character with intricate armor and weapon design.',
        category: 'Character Design',
        image: 'https://x3n99.github.io/9109e6463e754e05d27c514c0fa0fb42.png'
    },
    {
        title: 'Digital Portrait',
        description: 'A semi-realistic digital portrait commissioned for personal use. Focus on capturing emotion and personality through detailed facial features.',
        category: 'Portrait',
        image: 'https://x3n99.github.io/9109e6463e754e05d27c514c0fa0fb42.png'
    },
    {
        title: 'Scene Illustration',
        description: 'Full scene illustration depicting a magical forest environment with mystical creatures and atmospheric lighting.',
        category: 'Illustration',
        image: 'https://x3n99.github.io/9109e6463e754e05d27c514c0fa0fb42.png'
    },
    {
        title: 'Game Concept Art',
        description: 'Concept art for an indie game project, featuring environment design and color exploration for a sci-fi setting.',
        category: 'Concept Art',
        image: 'https://x3n99.github.io/9109e6463e754e05d27c514c0fa0fb42.png'
    },
    {
        title: 'Anime Character',
        description: 'Anime-style character illustration with vibrant colors and dynamic pose, perfect for manga or animation projects.',
        category: 'Character Design',
        image: 'https://x3n99.github.io/9109e6463e754e05d27c514c0fa0fb42.png'
    },
    {
        title: 'Book Cover Art',
        description: 'Custom illustration for a fantasy novel cover, combining character and environment elements to capture the story essence.',
        category: 'Illustration',
        image: 'https://x3n99.github.io/9109e6463e754e05d27c514c0fa0fb42.png'
    },
    {
        title: 'Chibi',
        description: "I'm able to illustrate chibi art for original characters and any characters of the sort that you would like me to draw :>",
        category: 'Chibi',
        image: 'https://x3n99.github.io/9109e6463e754e05d27c514c0fa0fb42.png'
    },
    {
        title: 'Emote',
        description: "Commission emotes or stickers you'd like for Twitch or YouTube!.",
        category: 'Emote',
        image: 'https://x3n99.github.io/9109e6463e754e05d27c514c0fa0fb42.png'
    }
];

function openModal(index) {
    const data = portfolioData[index];
    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalCategory').textContent = data.category;
    portfolioModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Commission Form Modal
const commissionModal = document.getElementById('commissionModal');

function openCommissionForm(packageType) {
    document.getElementById('packageType').value = packageType;
    commissionModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Modal
const closeModalBtns = document.querySelectorAll('.close-modal');
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        document.getElementById('portfolioModal').style.display = 'none';
        document.getElementById('commissionModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// Close modal ketika klik di luar
window.addEventListener('click', function(e) {
    const commissionModal = document.getElementById('commissionModal');
    const portfolioModal = document.getElementById('portfolioModal');
    
    if (e.target === commissionModal) {
        commissionModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    if (e.target === portfolioModal) {
        portfolioModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Commission Form Submission
const commissionForm = document.getElementById('commissionForm');

if (commissionForm) {
    commissionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Ambil data form
        const packageType = document.getElementById('packageType').value;
        const formData = new FormData(this);
        
        // Animasi submit button
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // Simulasi pengiriman (ganti dengan API endpoint real jika ada)
        setTimeout(() => {
            // Alert sukses
            alert(`✅ Commission Request Submitted!\n\nPackage: ${packageType}\n\nThank you! We will contact you within 24 hours.`);
            
            // Reset form
            commissionForm.reset();
            
            // Tutup modal
            const commissionModal = document.getElementById('commissionModal');
            commissionModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Optional: Kirim ke email menggunakan formsubmit.co atau emailjs
            // window.location.href = `mailto:artist@example.com?subject=Commission Request - ${packageType}`;
            
        }, 1500);
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input').value;
    
    if (email) {
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    }
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});

// Animate portfolio items on scroll
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, observerOptions);

portfolioItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px) scale(0.9)';
    item.style.transition = 'all 0.5s ease-out';
    portfolioObserver.observe(item);
});

// Animate pricing cards
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.5s ease-out';
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, observerOptions);
    
    cardObserver.observe(card);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
}

// Counter animation for stats (if you want to add stats section)
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Add hover effect for portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.zIndex = '10';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.zIndex = '1';
    });
});

// Keyboard navigation for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.getElementById('commissionModal').style.display = 'none';
        document.getElementById('portfolioModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Prevent form submission on enter (except in textarea)
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
});

// Add smooth reveal for process steps
const processSteps = document.querySelectorAll('.process-step');
processSteps.forEach((step, index) => {
    step.style.opacity = '0';
    step.style.transform = 'translateX(-50px)';
    step.style.transition = 'all 0.6s ease-out';
    
    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    stepObserver.observe(step);
});

// Console message for developers
console.log('%c🎨 Art Commission Website', 'color: #6C63FF; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #FF6584; font-size: 14px;');
console.log('%cReady to publish! 🚀', 'color: #2C3E50; font-size: 14px;');
