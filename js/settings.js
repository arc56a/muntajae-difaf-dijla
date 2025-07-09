// إدارة الوضع الليلي/النهاري في صفحة الإعدادات
document.addEventListener('DOMContentLoaded', function() {
    // تعيين سنة حقوق النشر الحالية
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('footer-year').textContent = currentYear;
    
    // تهيئة الوضع الحالي
    initTheme();
    
    // إدارة نقرات أزرار الوضع
    document.getElementById('light-mode').addEventListener('click', () => {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
        updateActiveButton('light-mode');
    });
    
    document.getElementById('dark-mode').addEventListener('click', () => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
        updateActiveButton('dark-mode');
    });
    
    document.getElementById('system-mode').addEventListener('click', () => {
        localStorage.setItem('theme', 'system');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        updateActiveButton('system-mode');
    });
    
    // تحديث الزر النشط
    function updateActiveButton(activeId) {
        ['light-mode', 'dark-mode', 'system-mode'].forEach(id => {
            const btn = document.getElementById(id);
            if (id === activeId) {
                btn.classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
                btn.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-700');
            } else {
                btn.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
                btn.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-700');
            }
        });
    }
});

// تهيئة الوضع الليلي/النهاري
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'system';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (savedTheme === 'system' && prefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // تحديث الزر النشط
    const activeButton = savedTheme === 'light' ? 'light-mode' : 
                        savedTheme === 'dark' ? 'dark-mode' : 'system-mode';
    updateActiveButton(activeButton);
}

// تحديث الزر النشط
function updateActiveButton(activeId) {
    const buttons = ['light-mode', 'dark-mode', 'system-mode'];
    buttons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            if (id === activeId) {
                btn.classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
                btn.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-700');
            } else {
                btn.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
                btn.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-700');
            }
        }
    });
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
