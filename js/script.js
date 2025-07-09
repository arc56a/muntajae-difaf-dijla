// كود جافاسكريبت للوظائف التفاعلية في الموقع

// إدارة الوضع الليلي/النهاري
function initTheme() {
    // التحقق من الإعدادات المحفوظة
    const savedTheme = localStorage.getItem('theme') || 'system';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // تطبيق الوضع المناسب
    if (savedTheme === 'dark' || (savedTheme === 'system' && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // تحديث الأزرار النشطة في الصفحة الحالية
    updateThemeButtons(savedTheme);
}

// تحديث أزرار الوضع في الصفحة الحالية
function updateThemeButtons(savedTheme) {
    const buttons = {
        'light': document.getElementById('light-mode'),
        'dark': document.getElementById('dark-mode'),
        'system': document.getElementById('system-mode')
    };
    
    // إعادة تعيين جميع الأزرار
    Object.values(buttons).forEach(btn => {
        if (btn) {
            btn.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
            btn.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-700');
        }
    });
    
    // تعيين الزر النشط
    const activeButton = buttons[savedTheme] || buttons['system'];
    if (activeButton) {
        activeButton.classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
        activeButton.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-700');
    }
}

// استجابة لتغير إعدادات النظام
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('theme') === 'system') {
        if (e.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل القائمة المتنقلة
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('animate-slideDown');
            
            // تبديل الأيقونة
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = '';
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                body.style.overflow = 'hidden'; // منع التمرير عند فتح القائمة
            }
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = '';
            }
        });
        
        // إغلاق القائمة عند التمرير
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (Math.abs(st - lastScrollTop) > 10) {
                if (st > lastScrollTop) {
                    // التمرير للأسفل
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        const icon = mobileMenuButton.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        body.style.overflow = '';
                    }
                }
                lastScrollTop = st <= 0 ? 0 : st;
            }
        }, false);
    }
    
    // إغلاق القائمة المتنقلة عند النقر على رابط
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('animate-slideDown');
            const icon = mobileMenuButton.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            body.style.overflow = '';
            
            // التمرير السلس للقسم المطلوب
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // تأثير التمرير السلس للروابط الداخلية
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // تعويض الهيدر الثابت
                    behavior: 'smooth'
                });
            }
        });
    });

    // إضافة تأثير التمرير للعناصر عند ظهورها في الشاشة
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in, .slide-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // تفعيل تأثيرات التمرير عند التحميل وعند التمرير
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // إضافة تأثير عند تحميل الصفحة
    document.body.classList.add('loaded');

    // تفعيل النماذج
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // هنا يمكنك إضافة كود إرسال النموذج
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            console.log('تم إرسال النموذج:', formObject);
            
            // عرض رسالة نجاح
            alert('شكراً لتواصلك معنا! سنرد عليك في أقرب وقت ممكن.');
            this.reset();
        });
    }

    // إضافة تأثيرات للبطاقات عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // مراقبة عناصر البطاقات
    document.querySelectorAll('.offer-card, .feature-card').forEach(card => {
        observer.observe(card);
    });

    // إضافة سنة حقوق النشر الحالية
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // تهيئة الوضع الليلي/النهاري
    initTheme();
    
    // إدارة نقرات أزرار الوضع في الصفحة الرئيسية
    const lightModeBtn = document.getElementById('light-mode');
    const darkModeBtn = document.getElementById('dark-mode');
    const systemModeBtn = document.getElementById('system-mode');
    
    if (lightModeBtn) {
        lightModeBtn.addEventListener('click', () => {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
            updateThemeButtons('light');
        });
    }
    
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
            updateThemeButtons('dark');
        });
    }
    
    if (systemModeBtn) {
        systemModeBtn.addEventListener('click', () => {
            localStorage.setItem('theme', 'system');
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            updateThemeButtons('system');
        });
    }
    
    // زر الإعدادات الآن ينقل إلى صفحة منفصلة
});

// دالة للتمرير إلى الأعلى
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// إظهار/إخفاء زر العودة للأعلى
window.onscroll = function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    if (scrollToTopBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
        }
    }
};

// تهيئة مكتبة AOS (إذا تمت إضافتها)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}
