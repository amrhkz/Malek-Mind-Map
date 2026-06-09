"use client";

import React from "react";
import {
  Search,
  Calendar,
  Moon,
  Bell,
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Wifi,
  User,
  Briefcase,
  ShoppingCart,
  Plus,
  CreditCard,
  Edit,
  ChevronDown
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// داده‌های نمونه برای نمودارها
const areaData = [
  { name: "فروردین", income: 15, expense: 5, savings: 10 },
  { name: "اردیبهشت", income: 20, expense: 8, savings: 12 },
  { name: "خرداد", income: 18, expense: 6, savings: 12 },
  { name: "تیر", income: 22, expense: 7, savings: 15 },
  { name: "مرداد", income: 20, expense: 8, savings: 12 },
  { name: "شهریور", income: 25, expense: 6, savings: 19 },
];

const pieData = [
  { name: "مسکن", value: 35, color: "#3B82F6" },
  { name: "خوراک", value: 25, color: "#10B981" },
  { name: "حمل و نقل", value: 15, color: "#F59E0B" },
  { name: "تفریح", value: 10, color: "#8B5CF6" },
  { name: "سلامت", value: 8, color: "#06B6D4" },
  { name: "سایر", value: 7, color: "#6366F1" },
];

const budgetData = [
  { name: "مصرف شده", value: 73, color: "#10B981" },
  { name: "باقی‌مانده", value: 27, color: "#1E293B" },
];

export default function Dashboard() {
  return (
    <div
      className="min-h-screen bg-[#0B1121] text-white p-6 font-iransans selection:bg-blue-500/30"
    >
      {/* هدر */}
      {/* <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">نمای کلی</h1>
          <p className="text-gray-400 text-sm">وضعیت مالی شما در یک نگاه</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="جستجو در تراکنش‌ها..."
              className="bg-[#131A2B] border border-[#1E293B] rounded-full py-2 pr-10 pl-4 w-64 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#131A2B] border border-[#1E293B] px-4 py-2 rounded-xl text-sm hover:bg-[#1E293B] transition-colors">
            <Calendar className="w-4 h-4" />
            ۳۰ روز گذشته
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
          <button className="bg-[#131A2B] border border-[#1E293B] p-2.5 rounded-full hover:bg-[#1E293B] transition-colors">
            <Moon className="w-4 h-4" />
          </button>
          <button className="relative bg-[#131A2B] border border-[#1E293B] p-2.5 rounded-full hover:bg-[#1E293B] transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 border-2 border-[#0B1121] rounded-full"></span>
          </button>
        </div>
      </header> */}

      {/* کارت‌های بالا */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {/* موجودی کل */}
        <div className="bg-[#131A2B] rounded-2xl p-5 border border-[#1E293B] shadow-[0_0_15px_rgba(139,92,246,0.05)] relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">موجودی کل</p>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                ۴۸,۷۵۰,۰۰۰ <span className="text-sm font-normal text-gray-500">تومان</span>
              </h2>
            </div>
            <div className="bg-[#8B5CF6] p-3 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              <Wallet className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md text-xs font-medium">
              +۱۲.۵٪
            </span>
            <span className="text-gray-500 text-xs">نسبت به ماه قبل</span>
          </div>
          {/* خط تزئینی زیر کارت */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent opacity-50"></div>
        </div>

        {/* درآمد این ماه */}
        <div className="bg-[#131A2B] rounded-2xl p-5 border border-[#1E293B] shadow-[0_0_15px_rgba(16,185,129,0.05)] relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">درآمد این ماه</p>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                ۱۸,۵۰۰,۰۰۰ <span className="text-sm font-normal text-gray-500">تومان</span>
              </h2>
            </div>
            <div className="bg-[#10B981] p-3 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md text-xs font-medium">
              +۸.۲٪
            </span>
            <span className="text-gray-500 text-xs">نسبت به ماه قبل</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-50"></div>
        </div>

        {/* هزینه این ماه */}
        <div className="bg-[#131A2B] rounded-2xl p-5 border border-[#1E293B] shadow-[0_0_15px_rgba(239,68,68,0.05)] relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">هزینه این ماه</p>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                ۷,۷۲۰,۰۰۰ <span className="text-sm font-normal text-gray-500">تومان</span>
              </h2>
            </div>
            <div className="bg-[#EF4444] p-3 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-500 bg-red-500/10 px-2 py-0.5 rounded-md text-xs font-medium">
              -۵.۴٪
            </span>
            <span className="text-gray-500 text-xs">نسبت به ماه قبل</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#EF4444] to-transparent opacity-50"></div>
        </div>

        {/* پس‌انداز این ماه */}
        <div className="bg-[#131A2B] rounded-2xl p-5 border border-[#1E293B] shadow-[0_0_15px_rgba(59,130,246,0.05)] relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">پس‌انداز این ماه</p>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                ۱۰,۷۸۰,۰۰۰ <span className="text-sm font-normal text-gray-500">تومان</span>
              </h2>
            </div>
            <div className="bg-[#3B82F6] p-3 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <PiggyBank className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded-md text-xs font-medium">
              +۱۵.۳٪
            </span>
            <span className="text-gray-500 text-xs">نسبت به ماه قبل</span>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent opacity-50"></div>
        </div>
      </div>

      {/* بخش اصلی پایین (دو ستون اصلی) */}
      <div className="grid grid-cols-12 gap-6">
        {/* ستون راست و وسط (گرید 9 ستونه) */}
        <div className="col-span-9 flex flex-col gap-6">
          {/* ردیف اول نمودارها */}
          <div className="grid grid-cols-12 gap-6">
            {/* تراز مالی (Area Chart) */}
            <div className="col-span-7 bg-[#131A2B] rounded-2xl p-5 border border-[#1E293B]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">تراز مالی</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10B981]"></span> درآمد</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> هزینه</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span> پس‌انداز</div>
                </div>
                <button className="flex items-center gap-1 text-sm bg-[#1E293B] px-3 py-1.5 rounded-lg text-gray-300">
                  ۶ ماه گذشته <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}M`} />
                    <Tooltip contentStyle={{ backgroundColor: '#131A2B', borderColor: '#1E293B', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                    <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                    <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                    <Area type="monotone" dataKey="savings" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* توزیع هزینه‌ها (Pie Chart) */}
            <div className="col-span-5 bg-[#131A2B] rounded-2xl p-5 border border-[#1E293B]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">توزیع هزینه‌ها</h3>
                <button className="flex items-center gap-1 text-sm bg-[#1E293B] px-3 py-1.5 rounded-lg text-gray-300">
                  این ماه <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between h-56">
                <div className="w-1/2 h-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  {/* متن وسط دونات چارت */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-gray-400 text-xs">جمع کل</span>
                    <span className="font-bold text-lg">۷,۷۲۰,۰۰۰</span>
                    <span className="text-gray-500 text-xs">تومان</span>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-3">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                        <span className="text-gray-300">{item.name}</span>
                      </div>
                      <span className="font-medium text-white">{item.value}٪</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ردیف دوم (حساب‌ها و اهداف) */}
          <div className="grid grid-cols-12 gap-6">
            {/* حساب‌های من */}
            <div className="col-span-5 bg-[#131A2B] rounded-2xl p-5 border border-[#1E293B]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">حساب‌های من</h3>
                <button className="text-sm text-blue-500 bg-blue-500/10 px-3 py-1 rounded-lg">مدیریت</button>
              </div>
              
              <div className="space-y-4 mb-4">
                {/* حساب ملت */}
                <div className="bg-[#1A2235] p-4 rounded-xl border border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500/10 p-2.5 rounded-lg">
                      <CreditCard className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">حساب ملت</p>
                      <p className="text-xs text-gray-500 tracking-widest mt-1">۶۲۱۹ **** **** ۱۲۳۴</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold">۲۳,۴۵۰,۰۰۰</p>
                    <p className="text-xs text-gray-500">تومان</p>
                  </div>
                </div>

                {/* حساب آینده */}
                <div className="bg-[#1A2235] p-4 rounded-xl border border-[#1E293B] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/10 p-2.5 rounded-lg">
                      <Edit className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">حساب آینده</p>
                      <p className="text-xs text-gray-500 tracking-widest mt-1">۵۰۲۲ **** **** ۵۶۷۸</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold">۱۵,۳۰۰,۰۰۰</p>
                    <p className="text-xs text-gray-500">تومان</p>
                  </div>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-[#2A3441] rounded-xl text-blue-500 hover:bg-blue-500/5 transition-colors">
                <Plus className="w-4 h-4" /> افزودن حساب جدید
              </button>
            </div>

            {/* اهداف مالی */}
            <div className="col-span-7 bg-[#131A2B] rounded-2xl p-5 border border-[#1E293B]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">اهداف مالی</h3>
                <button className="text-sm text-blue-500 bg-blue-500/10 px-3 py-1 rounded-lg">مشاهده همه</button>
              </div>

              <div className="space-y-6">
                {/* خرید خودرو */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                        {/* Placeholder for Car Image */}
                        <img src="/api/placeholder/40/40" alt="Car" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">خرید خودرو</p>
                        <p className="text-xs text-gray-400 mt-1">
                          ۳۹۰,۰۰۰,۰۰۰ <span className="text-gray-500">از ۶۰۰,۰۰۰,۰۰۰ تومان</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-green-500 font-bold text-lg">۶۵٪</span>
                  </div>
                  <div className="h-2 w-full bg-[#1E293B] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                </div>

                {/* سفر خارجی */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                        {/* Placeholder for Plane Image */}
                        <img src="/api/placeholder/40/40" alt="Plane" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">سفر خارجی</p>
                        <p className="text-xs text-gray-400 mt-1">
                          ۸۰,۰۰۰,۰۰۰ <span className="text-gray-500">از ۲۰۰,۰۰۰,۰۰۰ تومان</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-purple-500 font-bold text-lg">۴۰٪</span>
                  </div>
                  <div className="h-2 w-full bg-[#1E293B] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>

                {/* صندوق اضطراری */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        {/* Placeholder for Safe Icon */}
                         <div className="w-6 h-6 border-2 border-gray-400 rounded-md flex items-center justify-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                         </div>
                      </div>
                      <div>
                        <p className="font-medium">صندوق اضطراری</p>
                        <p className="text-xs text-gray-400 mt-1">
                          ۴۰,۰۰۰,۰۰۰ <span className="text-gray-500">از ۵۰,۰۰۰,۰۰۰ تومان</span>
                        </p>
                      </div>
                    </div>
                    <span className="text-blue-500 font-bold text-lg">۸۰٪</span>
                  </div>
                  <div className="h-2 w-full bg-[#1E293B] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ستون چپ (در تصویر سمت راست است - بخش تراکنش‌ها) - گرید 3 ستونه */}
        <div className="col-span-3 flex flex-col gap-6">
          {/* آخرین تراکنش‌ها */}
          <div className="bg-[#131A2B] rounded-2xl p-5 border border-[#1E293B] flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">آخرین تراکنش‌ها</h3>
              <button className="text-sm text-blue-500 bg-blue-500/10 px-3 py-1 rounded-lg">مشاهده همه</button>
            </div>

            <div className="flex flex-col gap-5 flex-1">
              {/* آیتم 1 */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="bg-[#1E293B] p-2.5 rounded-full text-gray-400">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">بسته یک ماهه اینترنت</p>
                    <p className="text-xs text-gray-500 mt-1">پرداخت از حساب ملت</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-red-400 font-medium text-sm">-۱۲۰,۰۰۰</p>
                  <p className="text-xs text-gray-500 mt-1">امروز، ۱۰:۳۰</p>
                </div>
              </div>

              {/* آیتم 2 */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <div className="bg-green-500/10 p-2.5 rounded-full text-green-500">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">پیش‌پرداخت پروژه فروشگاهی</p>
                    <p className="text-xs text-gray-500 mt-1">واریز به حساب بانکی</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-green-500 font-medium text-sm">+۳,۵۰۰,۰۰۰</p>
                  <p className="text-xs text-gray-500 mt-1">دیروز، ۱۴:۲۰</p>
                </div>
              </div>

              {/* آیتم 3 */}
              <div className="flex justify-between items-center">
                <div className="bg-[#1E293B] p-2.5 rounded-full text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 px-3">
                  <p className="font-medium text-sm">انتقال وجه به علی احمدی</p>
                  <p className="text-xs text-gray-500 mt-1">پرداخت از حساب ملت</p>
                </div>
                <div className="text-left">
                  <p className="text-red-400 font-medium text-sm">-۶,۰۰۰,۰۰۰</p>
                  <p className="text-xs text-gray-500 mt-1">دیروز، ۱۱:۱۵</p>
                </div>
              </div>

              {/* آیتم 4 */}
              <div className="flex justify-between items-center">
                <div className="bg-green-500/10 p-2.5 rounded-full text-green-500">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="flex-1 px-3">
                  <p className="font-medium text-sm">واریز حقوق شرکت</p>
                  <p className="text-xs text-gray-500 mt-1">واریز به حساب بانکی</p>
                </div>
                <div className="text-left">
                  <p className="text-green-500 font-medium text-sm">+۱۵,۰۰۰,۰۰۰</p>
                  <p className="text-xs text-gray-500 mt-1">۱۴۰۳/۰۶/۰۱</p>
                </div>
              </div>

              {/* آیتم 5 */}
              <div className="flex justify-between items-center">
                <div className="bg-[#1E293B] p-2.5 rounded-full text-pink-400">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div className="flex-1 px-3">
                  <p className="font-medium text-sm">خرید از فروشگاه دیجی‌کالا</p>
                  <p className="text-xs text-gray-500 mt-1">پرداخت از حساب ملت</p>
                </div>
                <div className="text-left">
                  <p className="text-red-400 font-medium text-sm">-۸۵۰,۰۰۰</p>
                  <p className="text-xs text-gray-500 mt-1">۱۴۰۳/۰۵/۳۱</p>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-xl flex items-center justify-center gap-2 font-medium">
              <Plus className="w-5 h-5" /> تراکنش جدید
            </button>
          </div>

          {/* بودجه‌بندی ماهانه */}
          <div className="bg-[#131A2B] rounded-2xl p-5 border border-[#1E293B]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">بودجه‌بندی ماهانه</h3>
              <button className="text-sm text-blue-500 bg-blue-500/10 px-3 py-1 rounded-lg">مشاهده همه</button>
            </div>
            
            <div className="flex items-center gap-4">
               {/* چارت دایره‌ای بودجه */}
              <div className="w-24 h-24 relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={budgetData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={45}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={4}
                      >
                        {budgetData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="font-bold text-lg text-white">۷۳٪</span>
                 </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-500"></span> کل بودجه</span>
                  <span className="font-medium">۱۵,۰۰۰,۰۰۰</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-400 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> مصرف شده</span>
                  <span className="font-medium text-red-400">۱۰,۹۵۰,۰۰۰</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> باقی‌مانده</span>
                  <span className="font-medium text-green-500">۴,۰۵۰,۰۰۰</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#1E293B] flex items-center justify-center gap-2 text-sm text-yellow-500">
               ⭐ برای رسیدن به اهدافتان عالی عمل می‌کنید! ⭐
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}