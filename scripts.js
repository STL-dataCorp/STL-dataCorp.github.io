// Navigation fluide
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



// Ajoutez ce script à la fin de votre body ou dans un fichier JS séparé
document.addEventListener('DOMContentLoaded', function() {
    const toggleCheckbox = document.getElementById('darkmode-toggle');
    const body = document.body;
    
    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Appliquer le thème initial
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        toggleCheckbox.checked = true;
        body.classList.add('dark-mode');
    }
    
    // Basculer le thème
    toggleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});




// Animation au scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.background = 'white';
    }
});

// Filtrage projets (optionnel)
function filtrerProjets(categorie) {
    const projets = document.querySelectorAll('.projet-card');
    projets.forEach(projet => {
        if (categorie === 'all' || projet.dataset.categorie === categorie) {
            projet.style.display = 'block';
        } else {
            projet.style.display = 'none';
        }
    });
}

// script.js - Ajoutez cette fonctionnalité
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des données du formulaire
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Validation simple
            if (!formData.name || !formData.email || !formData.message) {
                showNotification('Veuillez remplir tous les champs obligatoires', 'error');
                return;
            }
            
            // Simulation d'envoi (à remplacer par un vrai backend)
            simulateFormSubmit(formData);
        });
    }
    
    // Fonction de simulation d'envoi
    function simulateFormSubmit(formData) {
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Affichage du chargement
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulation d'un délai d'envoi
        setTimeout(() => {
            // Ici, vous intégrerez un service comme Formspree, EmailJS, ou votre backend
            console.log('Données du formulaire:', formData);
            
            // Notification de succès
            showNotification('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
            
            // Réinitialisation du formulaire
            contactForm.reset();
            
            // Restauration du bouton
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Vous pouvez ajouter ici l'intégration avec :
            // - EmailJS : https://www.emailjs.com/
            // - Formspree : https://formspree.io/
            // - Netlify Forms : https://www.netlify.com/products/forms/
            // - Backend personnalisé
            
        }, 1500);
    }
    
    // Fonction de notification
    function showNotification(message, type = 'success') {
        // Création de la notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Style de la notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Bouton de fermeture
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Fermeture automatique après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Animation CSS pour les notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
            opacity: 0.7;
            transition: opacity 0.3s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});

// script.js - Ajoutez cette fonctionnalité pour l'hero section
document.addEventListener('DOMContentLoaded', function() {
    // Animation du scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#projets').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Effet de parallaxe sur l'image de fond
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        const heroBg = document.querySelector('.hero-bg img');
        
        if (heroBg) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroBg.style.transform = 'translate3d(0px, ' + rate + 'px, 0px)';
            });
        }
    }
    
    // Changer l'image de fond selon l'heure (optionnel)
    function changeBackgroundByTime() {
        const heroBg = document.querySelector('.hero-bg img');
        if (!heroBg) return;
        
        const hour = new Date().getHours();
        const imagePaths = {
            morning: 'assets/images/hero-bg-morning.jpg',
            afternoon: 'assets/images/hero-bg-afternoon.jpg',
            evening: 'assets/images/hero-bg-evening.jpg',
            night: 'assets/images/hero-bg-night.jpg'
        };
        
        let selectedImage;
        if (hour >= 6 && hour < 12) {
            selectedImage = imagePaths.morning;
        } else if (hour >= 12 && hour < 18) {
            selectedImage = imagePaths.afternoon;
        } else if (hour >= 18 && hour < 22) {
            selectedImage = imagePaths.evening;
        } else {
            selectedImage = imagePaths.night;
        }
        
        // Précharger l'image
        const img = new Image();
        img.src = selectedImage;
        img.onload = function() {
            heroBg.src = selectedImage;
        };
    }
    
    // Initialiser les effets
    parallaxEffect();
    // Décommentez la ligne suivante si vous avez plusieurs images de fond
    // changeBackgroundByTime();
    
    // Animation des statistiques
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50; // 50 frames
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.round(current) + '+';
            }, 30);
        });
    }
    
    // Démarrer l'animation des stats quand la section hero est visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.getElementById('accueil');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});



// script.js - Ajoutez cette fonctionnalité pour la timeline
document.addEventListener('DOMContentLoaded', function() {
    // Animation de la timeline au scroll
    function animateTimelineOnScroll() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.8;
            
            if (isVisible && !item.classList.contains('animated')) {
                item.classList.add('animated');
            }
        });
    }
    
    // Initialiser l'animation
    animateTimelineOnScroll();
    
    // Écouter le scroll pour animer la timeline
    window.addEventListener('scroll', animateTimelineOnScroll);
    
    // Animation des badges de compétences
    const skillBadges = document.querySelectorAll('.skill-badge');
    skillBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.2)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Effet de parallaxe pour la timeline
    const timelineSection = document.querySelector('.timeline-section');
    if (timelineSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.1;
            timelineSection.style.backgroundPosition = `0% ${rate}px`;
        });
    }
});


// script.js - Ajoutez ces fonctions footer

document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Smooth scroll pour les liens du footer
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Newsletter form (simulation)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const submitBtn = this.querySelector('.newsletter-btn');
            
            if (emailInput.value) {
                // Animation de chargement
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
                submitBtn.disabled = true;
                
                // Simulation d'envoi
                setTimeout(() => {
                    // Ici, vous intégreriez un service comme Mailchimp, ConvertKit, etc.
                    console.log('Email enregistré:', emailInput.value);
                    
                    // Message de succès
                    alert('Merci ! Vous êtes maintenant abonné à ma newsletter.');
                    
                    // Réinitialisation
                    emailInput.value = '';
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Animation des icônes sociales
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });
});


