// Custom JavaScript moved from portfolio.html
// 3D Skills Visualization
const init3DSkills = () => {
    const container = document.getElementById('skills-3d-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.2
    });
    const skillMesh = new THREE.Mesh(geometry, material);
    scene.add(skillMesh);

    camera.position.z = 3;

    const animate = () => {
        requestAnimationFrame(animate);
        skillMesh.rotation.x += 0.001;
        skillMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    };
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
};

// Initialize when skills section is in view
const skillsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        init3DSkills();
        skillsObserver.disconnect();
    }
}, { threshold: 0.1 });
skillsObserver.observe(document.getElementById('skills'));

// Scroll progress indicator
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
});

tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-in forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'slide-left': 'slideLeft 0.5s ease-out forwards',
                'slide-right': 'slideRight 0.5s ease-out forwards',
                'scale-in': 'scaleIn 0.5s ease-out forwards',
                'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(50px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideLeft: {
                    '0%': { transform: 'translateX(50px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideRight: {
                    '0%': { transform: 'translateX(-50px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                pulse: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                }
            }
        }
    }
}

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

function updateThemeIcons() {
    // Desktop
    const moonIcon = themeToggle?.querySelector('.fa-moon');
    const sunIcon = themeToggle?.querySelector('.fa-sun');
    if (document.documentElement.classList.contains('dark')) {
        moonIcon?.classList.add('hidden');
        sunIcon?.classList.remove('hidden');
        sunIcon?.classList.add('block');
    } else {
        moonIcon?.classList.remove('hidden');
        sunIcon?.classList.add('hidden');
        sunIcon?.classList.remove('block');
    }
    // Mobile
    const moonIconMobile = themeToggleMobile?.querySelector('.fa-moon');
    const sunIconMobile = themeToggleMobile?.querySelector('.fa-sun');
    if (document.documentElement.classList.contains('dark')) {
        moonIconMobile?.classList.add('hidden');
        sunIconMobile?.classList.remove('hidden');
        sunIconMobile?.classList.add('block');
    } else {
        moonIconMobile?.classList.remove('hidden');
        sunIconMobile?.classList.add('hidden');
        sunIconMobile?.classList.remove('block');
    }
}

if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}
updateThemeIcons();

const toggleTheme = () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
    updateThemeIcons();
};

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill filtering
const skillFilters = document.querySelectorAll('.skill-filter');
const skillPills = document.querySelectorAll('.skill-pill');

skillFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Update active filter button
        skillFilters.forEach(f => f.classList.remove('bg-blue-500', 'text-white'));
        filter.classList.add('bg-blue-500', 'text-white');
        const filterValue = filter.getAttribute('data-filter');
        skillPills.forEach(pill => {
            if (filterValue === 'all' || pill.classList.contains(filterValue)) {
                pill.style.display = 'flex';
            } else {
                pill.style.display = 'none';
            }
        });
    });
});

// Project filtering
const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');

projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Update active filter button
        projectFilters.forEach(f => f.classList.remove('bg-blue-500', 'text-white'));
        filter.classList.add('bg-blue-500', 'text-white');
        const filterValue = filter.getAttribute('data-filter');
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.classList.contains(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Intersection Observer for animations
const animateElements = document.querySelectorAll('.animate-fade-in, .animate-slide-up');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

animateElements.forEach(el => {
    el.style.opacity = 0;
    if (el.classList.contains('animate-slide-up')) {
        el.style.transform = 'translateY(50px)';
    }
    observer.observe(el);
}); 