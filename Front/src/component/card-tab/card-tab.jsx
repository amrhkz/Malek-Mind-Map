"use client";

import React, { useState } from "react";
import {
  MoreHorizontal,
  Plus,
  Search,
  CalendarDays,
  ChevronDown,
  ShoppingBag,
  ArrowDownToLine,
  Coffee,
  Wifi,
  Fuel,
  ShoppingCart,
  ArrowDownRight,
  ArrowUpRight,
  CreditCard,
  Wallet,
  Eye,
  ArrowDown
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

// داده‌های کارت‌های بانکی
const cardsData = [
  {
    id: 1,
    bank: "بانک ملی ایران",
    title: "ملی کارت",
    cardNumber: "۶۲۱۹ **** **** ۱۲۳۴",
    balance: "۱۸,۵۰۰,۰۰۰",
    bgClass: "bg-[#1A233A]", // سرمه‌ای تیره
    logo: (
      <div className="flex -space-x-2 space-x-reverse">
        <div className="w-6 h-6 rounded-full bg-red-500 opacity-80 mix-blend-multiply"></div>
        <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80 mix-blend-multiply"></div>
      </div>
    ),
    isPrimary: true
  },
  {
    id: 2,
    bank: "بانک ملت",
    title: "کارت ملت",
    cardNumber: "۵۸۵۹ **** **** ۹۸۷۶",
    balance: "۲۴,۷۵۰,۰۰۰",
    bgClass: "bg-[#163A33]", // سبز تیره
    logo: (
      <div className="flex -space-x-2 space-x-reverse">
        <div className="w-6 h-6 rounded-full bg-red-500 opacity-80 mix-blend-multiply"></div>
        <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-80 mix-blend-multiply"></div>
      </div>
    ),
    isPrimary: false
  },
  {
    id: 3,
    bank: "بانک پاسارگاد",
    title: "کارت پاسارگاد",
    cardNumber: "۵۰۲۲ **** **** ۴۵۶۷",
    balance: "۹,۳۰۰,۰۰۰",
    bgClass: "bg-[#291D3C]", // بنفش تیره
    logo: <span className="text-white font-bold italic text-lg tracking-wider">VISA</span>,
    isPrimary: false
  },
  {
    id: 4,
    bank: "بانک آینده",
    title: "کارت آینده",
    cardNumber: "۶۲۳۹ **** **** ۱۲۱۲",
    balance: "۵,۱۰۰,۰۰۰",
    bgClass: "bg-[#143236]", // کله غازی تیره
    logo: (
      <div className="w-6 h-6 flex flex-wrap gap-0.5 justify-center items-center text-cyan-500">
         <div className="w-2.5 h-2.5 border-2 border-current rounded-sm"></div>
         <div className="w-2.5 h-2.5 border-2 border-current rounded-full"></div>
         <div className="w-2.5 h-2.5 border-2 border-current rounded-full"></div>
         <div className="w-2.5 h-2.5 border-2 border-current rounded-sm"></div>
      </div>
    ),
    isPrimary: false
  }
];

// داده‌های جدول تراکنش‌ها
const transactionsData = [
  {
    id: 1,
    descTitle: "سوپرمارکت رفاه",
    descSub: "خرید مواد غذایی",
    icon: <ShoppingBag className="w-4 h-4 text-emerald-400" />,
    iconBg: "bg-emerald-500/10",
    date: "۱۴۰۳/۰۶/۲۲",
    time: "۱۱:۴۲",
    cardName: "ملی کارت",
    cardNumber: "۶۲۱۹ **** ۱۲۳۴",
    category: "خوراک",
    categoryColor: "text-blue-400 bg-blue-500/10",
    type: "خرج",
    typeIcon: <ArrowDownRight className="w-3.5 h-3.5" />,
    typeColor: "text-red-500",
    amount: "-۱,۲۵۰,۰۰۰",
    balance: "۱۸,۵۰۰,۰۰۰"
  },
  {
    id: 2,
    descTitle: "واریز حقوق",
    descSub: "حقوق ماهانه",
    icon: <ArrowDownToLine className="w-4 h-4 text-emerald-500" />,
    iconBg: "bg-emerald-500/10 border border-emerald-500/20",
    date: "۱۴۰۳/۰۶/۲۲",
    time: "۱۰:۱۵",
    cardName: "کارت ملت",
    cardNumber: "۵۸۵۹ **** ۹۸۷۶",
    category: "درآمد",
    categoryColor: "text-emerald-400 bg-emerald-500/10",
    type: "واریز",
    typeIcon: <ArrowUpRight className="w-3.5 h-3.5" />,
    typeColor: "text-emerald-500",
    amount: "+۳۵,۰۰۰,۰۰۰",
    balance: "۲۴,۷۵۰,۰۰۰"
  },
  {
    id: 3,
    descTitle: "کافه نادری",
    descSub: "خدمات",
    icon: <Coffee className="w-4 h-4 text-purple-400" />,
    iconBg: "bg-purple-500/10",
    date: "۱۴۰۳/۰۶/۲۱",
    time: "۲۱:۳۰",
    cardName: "کارت پاسارگاد",
    cardNumber: "۵۰۲۲ **** ۴۵۶۷",
    category: "تفریح",
    categoryColor: "text-purple-400 bg-purple-500/10",
    type: "خرج",
    typeIcon: <ArrowDownRight className="w-3.5 h-3.5" />,
    typeColor: "text-red-500",
    amount: "-۴۵۰,۰۰۰",
    balance: "۹,۳۰۰,۰۰۰"
  },
  {
    id: 4,
    descTitle: "اینترنت همراه اول",
    descSub: "خدمات",
    icon: <Wifi className="w-4 h-4 text-orange-400" />,
    iconBg: "bg-orange-500/10",
    date: "۱۴۰۳/۰۶/۲۱",
    time: "۱۸:۰۵",
    cardName: "کارت آینده",
    cardNumber: "۶۲۳۹ **** ۱۲۱۲",
    category: "خدمات",
    categoryColor: "text-orange-400 bg-orange-500/10",
    type: "خرج",
    typeIcon: <ArrowDownRight className="w-3.5 h-3.5" />,
    typeColor: "text-red-500",
    amount: "-۱۵۰,۰۰۰",
    balance: "۵,۱۰۰,۰۰۰"
  },
  {
    id: 5,
    descTitle: "پمپ بنزین تهران",
    descSub: "حمل و نقل",
    icon: <Fuel className="w-4 h-4 text-cyan-400" />,
    iconBg: "bg-cyan-500/10",
    date: "۱۴۰۳/۰۶/۲۰",
    time: "۱۴:۴۵",
    cardName: "ملی کارت",
    cardNumber: "۶۲۱۹ **** ۱۲۳۴",
    category: "حمل و نقل",
    categoryColor: "text-cyan-400 bg-cyan-500/10",
    type: "خرج",
    typeIcon: <ArrowDownRight className="w-3.5 h-3.5" />,
    typeColor: "text-red-500",
    amount: "-۸۰۰,۰۰۰",
    balance: "۵,۱۵۰,۰۰۰"
  },
  {
    id: 6,
    descTitle: "دیجی‌کالا",
    descSub: "خرید آنلاین",
    icon: <ShoppingCart className="w-4 h-4 text-yellow-400" />,
    iconBg: "bg-yellow-500/10",
    date: "۱۴۰۳/۰۶/۲۰",
    time: "۱۳:۱۰",
    cardName: "کارت ملت",
    cardNumber: "۵۸۵۹ **** ۹۸۷۶",
    category: "خرید",
    categoryColor: "text-yellow-400 bg-yellow-500/10",
    type: "خرج",
    typeIcon: <ArrowDownRight className="w-3.5 h-3.5" />,
    typeColor: "text-red-500",
    amount: "-۱,۲۹۹,۰۰۰",
    balance: "۱۶,۶۵۰,۰۰۰"
  }
];

// داده‌های نمودار دونات
const expensesChartData = [
  { name: "خوراک", value: 9500000, color: "#3B82F6" }, // Blue
  { name: "خرید", value: 7200000, color: "#EAB308" }, // Yellow
  { name: "حمل و نقل", value: 4500000, color: "#06B6D4" }, // Cyan
  { name: "خدمات", value: 3800000, color: "#F97316" }, // Orange
  { name: "تفریح", value: 2600000, color: "#A855F7" }, // Purple
  { name: "سایر", value: 1750000, color: "#64748B" }  // Slate
];

export default function CardsDashboard() {
  return (
    <div className="min-h-screen bg-[#0B1121] text-white p-6 font-iransans selection:bg-blue-500/30">
      
      {/* هدر صفحه و کارت‌ها */}
      <div className="mb-6">
        {/* <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-100">کارت‌های من</h2>
          <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-xl border border-blue-500/20">
            <CreditCard className="w-4 h-4" /> مدیریت کارت‌ها
          </button>
        </div> */}

        {/* لیست کارت‌ها (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {cardsData.map((card) => (
            <div key={card.id} className={`${card.bgClass} rounded-2xl p-5 relative overflow-hidden shadow-lg border border-white/5`}>
              {/* پس‌زمینه تزئینی (اختیاری) */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="font-medium text-gray-100 text-base">{card.title}</h3>
                  <p className="text-xs text-gray-400 mt-1 opacity-80" dir="ltr">{card.cardNumber}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{card.bank}</p>
                </div>
                <button className="text-white/50 hover:text-white transition-colors">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-between items-end relative z-10">
                <div>
                  <p className="text-[10px] text-gray-400 mb-1">موجودی</p>
                  <div className="flex items-baseline gap-1">
                     <p className="font-bold text-lg">{card.balance}</p>
                     <span className="text-[10px] text-gray-400 font-normal">تومان</span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                   {card.isPrimary && (
                      <span className="text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded-full">اصلی</span>
                   )}
                   {card.logo}
                </div>
              </div>
            </div>
          ))}

          {/* دکمه افزودن کارت جدید */}
          <button className="bg-[#131A2B] border border-dashed border-[#1E293B] hover:border-blue-500/50 hover:bg-[#1E293B]/50 transition-all rounded-2xl p-5 flex flex-col items-center justify-center gap-3 text-blue-500 min-h-[160px] group">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">افزودن کارت جدید</span>
          </button>
        </div>
      </div>

      {/* بخش پایینی (جداول و آمار) */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* سمت راست: جدول تراکنش‌ها (8 ستون) */}
        <div className="col-span-12 lg:col-span-8 bg-[#131A2B] border border-[#1E293B] rounded-2xl overflow-hidden shadow-lg flex flex-col">
          {/* هدر جدول */}
          <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-4">
               <h3 className="font-semibold text-gray-100">تراکنش‌های اخیر</h3>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="جستجو در تراکنش‌ها..."
                  className="bg-[#0B1121] border border-[#1E293B] rounded-xl py-2.5 pr-10 pl-4 w-56 text-sm focus:outline-none focus:border-blue-500 transition-colors text-gray-200"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0B1121] border border-[#1E293B] rounded-xl text-gray-300 hover:text-white transition-colors text-sm" dir="ltr">
                <CalendarDays className="w-4 h-4 text-gray-400" />
                <span className="text-xs">۱۴۰۳/۰۵/۲۲ - ۱۴۰۳/۰۶/۲۱</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0B1121] border border-[#1E293B] rounded-xl text-gray-300 hover:text-white transition-colors text-sm">
                همه کارت‌ها <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* بدنه جدول */}
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-right border-collapse">
              <thead>
                <tr className="text-gray-400 text-xs border-b border-[#1E293B] bg-[#0B1121]/30">
                  <th className="py-4 px-6 font-normal">توضیحات</th>
                  <th className="py-4 px-6 font-normal">تاریخ و زمان</th>
                  <th className="py-4 px-6 font-normal text-center">کارت</th>
                  <th className="py-4 px-6 font-normal text-center">دسته‌بندی</th>
                  <th className="py-4 px-6 font-normal text-center">نوع</th>
                  <th className="py-4 px-6 font-normal">مبلغ</th>
                  <th className="py-4 px-6 font-normal">مانده</th>
                </tr>
              </thead>
              <tbody>
                {transactionsData.map((tx, index) => (
                  <tr key={tx.id} className={`border-b border-[#1E293B]/50 hover:bg-[#1E293B]/30 transition-colors ${index === transactionsData.length - 1 ? 'border-none' : ''}`}>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.iconBg}`}>
                          {tx.icon}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-200">{tx.descTitle}</p>
                          <p className="text-xs text-gray-500 mt-1">{tx.descSub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6">
                      <p className="text-sm text-gray-300">{tx.date}</p>
                      <p className="text-xs text-gray-500 mt-1">{tx.time}</p>
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <p className="text-sm text-gray-300">{tx.cardName}</p>
                      <p className="text-xs text-gray-500 mt-1" dir="ltr">{tx.cardNumber}</p>
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium border border-current/10 ${tx.categoryColor}`}>
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${tx.typeColor}`}>
                        {tx.typeIcon} {tx.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-6">
                      <p className={`text-sm font-medium ${tx.typeColor}`} dir="ltr">{tx.amount}</p>
                    </td>
                    <td className="py-3.5 px-6">
                      <p className="text-sm font-medium text-gray-300">{tx.balance}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* فوتر جدول */}
          <div className="border-t border-[#1E293B] p-3 text-center bg-[#0B1121]/50 mt-auto">
             <button className="text-sm text-blue-500 hover:text-blue-400 transition-colors flex items-center justify-center gap-1.5 w-full py-2">
                <ArrowDown className="w-4 h-4" /> مشاهده همه تراکنش‌ها
             </button>
          </div>
        </div>

        {/* سمت چپ: سایدبار آمار (4 ستون) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* خلاصه تراکنش‌ها (نمودار) */}
          <div className="bg-[#131A2B] border border-[#1E293B] rounded-2xl p-6 shadow-lg">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-gray-100">خلاصه تراکنش‌ها</h3>
                <button className="flex items-center justify-between gap-2 px-3 py-1.5 bg-[#0B1121] border border-[#1E293B] rounded-lg text-gray-300 hover:text-white transition-colors text-xs">
                  ۳۰ روز گذشته <ChevronDown className="w-3.5 h-3.5" />
                </button>
             </div>

             <div className="flex items-center gap-6">
                {/* چارت */}
                <div className="w-40 h-40 relative flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expensesChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={4}
                      >
                        {expensesChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-[10px] text-gray-400 mb-0.5">جمع کل خرج‌ها</span>
                    <span className="font-bold text-sm text-white">۲۸,۳۵۰,۰۰۰</span>
                    <span className="text-[9px] text-gray-500">تومان</span>
                  </div>
                </div>

                {/* راهنمای چارت */}
                <div className="flex-1 flex flex-col gap-2.5">
                   {expensesChartData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-xs">
                         <span className="flex items-center gap-2 text-gray-300">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                            {item.name}
                         </span>
                         <span className="font-medium text-gray-400">
                            {item.value.toLocaleString('fa-IR')}
                         </span>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* بیشترین تراکنش‌ها */}
          <div className="bg-[#131A2B] border border-[#1E293B] rounded-2xl p-6 shadow-lg">
             <h3 className="font-semibold text-gray-100 mb-5">بیشترین تراکنش‌ها</h3>
             
             <div className="flex flex-col gap-4">
                {/* آیتم 1 */}
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#0B1121] border border-[#1E293B] flex items-center justify-center text-gray-400">
                         <Wallet className="w-4 h-4" />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-gray-200">واریز حقوق</p>
                         <p className="text-xs text-gray-500 mt-0.5">کارت ملت</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-emerald-500" dir="ltr">+۳۵,۰۰۰,۰۰۰</span>
                      <div className="w-5 h-5 rounded-md bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                         <ArrowUpRight className="w-3 h-3" />
                      </div>
                   </div>
                </div>

                {/* آیتم 2 */}
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#0B1121] border border-[#1E293B] flex items-center justify-center text-gray-400">
                         <ShoppingBag className="w-4 h-4" />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-gray-200">سوپرمارکت رفاه</p>
                         <p className="text-xs text-gray-500 mt-0.5">ملی کارت</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-red-500" dir="ltr">-۱,۲۵۰,۰۰۰</span>
                      <div className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center text-red-500">
                         <ArrowDownRight className="w-3 h-3" />
                      </div>
                   </div>
                </div>

                {/* آیتم 3 */}
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#0B1121] border border-[#1E293B] flex items-center justify-center text-gray-400">
                         <ShoppingCart className="w-4 h-4" />
                      </div>
                      <div>
                         <p className="text-sm font-medium text-gray-200">دیجی‌کالا</p>
                         <p className="text-xs text-gray-500 mt-0.5">کارت ملت</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-red-500" dir="ltr">-۱,۲۹۹,۰۰۰</span>
                      <div className="w-5 h-5 rounded-md bg-red-500/10 flex items-center justify-center text-red-500">
                         <ArrowDownRight className="w-3 h-3" />
                      </div>
                   </div>
                </div>
             </div>

             <button className="w-full mt-5 py-2.5 bg-[#0B1121] border border-[#1E293B] rounded-xl text-xs text-blue-500 hover:bg-[#1E293B]/50 transition-colors flex justify-center items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" /> مشاهده گزارش کامل
             </button>
          </div>

          {/* آمار کارت‌ها */}
          <div className="bg-[#131A2B] border border-[#1E293B] rounded-2xl p-6 shadow-lg flex-1">
             <h3 className="font-semibold text-gray-100 mb-5">آمار کارت‌ها</h3>
             
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 mb-1">تعداد کارت‌ها</p>
                      <p className="text-lg font-bold">۴</p>
                   </div>
                </div>

                <div className="h-10 w-px bg-[#1E293B]"></div>

                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Wallet className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-xs text-gray-400 mb-1">جمع موجودی کارت‌ها</p>
                      <div className="flex items-baseline gap-1">
                         <p className="text-lg font-bold">۵۷,۶۵۰,۰۰۰</p>
                         <span className="text-[10px] text-gray-500 font-normal">تومان</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}