// نظام إعادة التوجيه لصفحة 404
(function() {
  'use strict';
  
  // قائمة الصفحات الموجودة
  const validPages = [
    'index.html',
    'track-order.html',
    'admin.html',
    'coupons-admin.html',
    'login.html',
    '404.html',
    ''  // للصفحة الرئيسية بدون اسم ملف
  ];
  
  // قائمة الامتدادات المسموحة
  const allowedExtensions = [
    '.html', '.css', '.js', '.png', '.jpg', '.jpeg', 
    '.gif', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.eot'
  ];
  
  function check404Redirect() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop() || 'index.html';
    
    // التحقق من الامتداد
    const hasValidExtension = allowedExtensions.some(ext => 
      currentFile.toLowerCase().endsWith(ext)
    );
    
    // إذا كان الملف لا يحتوي على امتداد صالح ولا يوجد في القائمة
    if (!hasValidExtension && !validPages.includes(currentFile)) {
      // إعادة توجيه لصفحة 404
      window.location.href = '404.html';
      return;
    }
    
    // التحقق من وجود الصفحة HTML
    if (currentFile.endsWith('.html') && !validPages.includes(currentFile)) {
      // إعادة توجيه لصفحة 404
      window.location.href = '404.html';
      return;
    }
    
    // التحقق من الصفحات بدون امتداد
    if (!currentFile.includes('.') && !validPages.includes(currentFile)) {
      // إعادة توجيه لصفحة 404
      window.location.href = '404.html';
      return;
    }
  }
  
  // تشغيل الفحص عند تحميل الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', check404Redirect);
  } else {
    check404Redirect();
  }
  
  // مراقبة تغييرات الرابط (للتطبيقات أحادية الصفحة)
  window.addEventListener('popstate', check404Redirect);
  
  // تسجيل محاولة الوصول للصفحة غير الموجودة
  function log404Attempt() {
    if (typeof console !== 'undefined') {
      console.warn('404 Redirect: محاولة الوصول لصفحة غير موجودة:', window.location.pathname);
    }
  }
  
  // إضافة معلومات إضافية للتشخيص
  window.AQRAB_404_INFO = {
    validPages: validPages,
    allowedExtensions: allowedExtensions,
    currentPath: window.location.pathname,
    currentFile: window.location.pathname.split('/').pop() || 'index.html'
  };
  
})();
