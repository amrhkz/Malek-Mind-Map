// services/oscarService.js
const Task = require('../models/task');

const analyzeAndCommand = async () => {
  console.log('🤖 Oscar is deeply analyzing your task patterns and focus areas...');

  try {
    // دریافت آمار کلی برای تصمیم‌گیری
    const pendingCount = await Task.countDocuments({ status: 'Pending' });
    const completedCount = await Task.countDocuments({ status: 'Completed' });
    
    // ۱. بررسی قانون تمرکز روی درآمدزایی و جذب پروژه
    // اسکار بررسی می‌کند که آیا تسک فعالی برای بازاریابی، پروژه‌ها یا ورودی مالی وجود دارد یا خیر
    const moneyFocusTask = await Task.findOne({
      status: 'Pending',
      $or: [
        { title: { $regex: /درآمد|پول|پروژه|مشتری|بازاریابی/i } },
        { description: { $regex: /درآمد|پول|پروژه|مشتری|بازاریابی/i } }
      ]
    });

    if (!moneyFocusTask && pendingCount < 3) {
      await assignTaskByOscar(
        '🎯 شکار پروژه جدید و بررسی کانال‌های درآمدی',
        'در حال حاضر تسک فعالی برای جذب پروژه یا درآمدزایی نداری. تمرکز اصلی مالک تک روی خلق پول است؛ همین امروز یک اقدام برای بازاریابی یا ارتباط با مشتریان احتمالی انجام بده.',
        'High'
      );
    }

    // ۲. قانون مدیریت انباشتگی (تسک‌های زیاد)
    if (pendingCount > 5) {
      await assignTaskByOscar(
        '⚠️ توقف دریافت کارهای جدید / پاکسازی دشبورد',
        `تعداد تسک‌های معوقه تو به ${pendingCount} رسیده است. اسکار دستور می‌دهد تا زمانی که حداقل ۳ تسک را انجام نداده‌ای، هیچ کار یا ایده جدیدی را شروع نکنی.`,
        'Critical'
      );
    }

    // ۳. قانون پاداش و قدم بعدی (وقتی تسکی انجام شده است)
    // اگر کارهای انجام شده زیاد است اما تسک بازی نمانده، اسکار وظایف توسعه‌ای می‌دهد
    if (pendingCount === 0 && completedCount > 0) {
      await assignTaskByOscar(
        '🚀 توسعه زیرساخت و بهینه‌سازی کدهای مالک تک',
        'خسته نباشی! تمام تسک‌های باز را انجام دادی. حالا وقت آن است که کدهای فرانت یا بک‌اِند پروژه را ریفکتور کنی یا یک قابلیت فنی جدید اضافه کنی.',
        'Medium'
      );
    }

    // ۴. قانون روت‌های زمانی بر اساس ساعات شبانه‌روز
    const currentHour = new Date().getHours();
    
    if (currentHour >= 8 && currentHour <= 11) {
      // روت صبحگاهی اسکار
      await assignTaskByOscar(
        '🌅 اولویت‌بندی سنگین‌ترین کار روز',
        'صبح بخیر. اسکار از تو می‌خواهد که همین الان سخت‌ترین و مهم‌ترین تسک فنی یا مالی امروزت را انتخاب کنی و تا قبل از ظهر تمامش کنی.',
        'High'
      );
    } else if (currentHour >= 21 && currentHour <= 23) {
      // روت شبانگاهی اسکار
      await assignTaskByOscar(
        '🌙 ارزیابی عملکرد و بستن دشبورد امروز',
        'روز به پایان رسیده است. تسک‌هایی که انجام دادی را تیک بزن و کارهای مانده را برای فردا مرتب کن تا وضعیت دشبورد شفاف بماند.',
        'Low'
      );
    }

  } catch (error) {
    console.error('Error in Oscar\'s brain calculation:', error);
  }
};

// تابع کمکی برای ثبت تسک بدون تکرار
const assignTaskByOscar = async (title, description, priority) => {
  try {
    const existingTask = await Task.findOne({ title, status: 'Pending' });
    if (!existingTask) {
      
      // تابع کمکی برای تبدیل عنوان به اسلاگ استاندارد (پشتیبانی از فارسی و انگلیسی)
      const generatedSlug = title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // تبدیل فاصله‌ها به خط تیره
        .replace(/[^\u0600-\u06FFa-z0-9-]+/g, '') // حذف کاراکترهای غیرمجاز بجز حروف فارسی/انگلیسی و خط تیره
        + '-' + Math.floor(1000 + Math.random() * 9000); // اضافه کردن یک عدد تصادفی ۴ رقمی برای تضمین یکتا بودن

      const newTask = new Task({
        title,
        description,
        priority,
        assignedBy: 'Oscar',
        slug: generatedSlug // ارسال اسلاگ ساخته شده به دیتابیس
      });

      await newTask.save();
      console.log(`⚡ Oscar issued a new dynamic command: ${title}`);
    }
  } catch (error) {
    console.error('❌ Error saving Oscar task:', error);
  }
};

module.exports = { analyzeAndCommand };