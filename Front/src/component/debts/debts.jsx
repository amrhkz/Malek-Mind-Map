"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit2,
  Trash2,
  MoreHorizontal,
  Landmark,
  User,
  ShoppingCart,
  Calendar,
  TrendingUp,
  FileText,
  Car,
  Bell,
  CheckSquare,
  Square,
  ArrowUp,
  Minus,
  ArrowDown,
  Eye
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";

// داده‌های جدول بدهی‌ها
const debtsData = [
  {
    id: 1,
    creditor: "بانک ملت",
    type: "وام شخصی",
    icon: <Landmark className="w-5 h-5 text-red-400" />,
    iconBg: "bg-red-500/10",
    total: "۲۰,۰۰۰,۰۰۰",
    remaining: "۱۵,۰۰۰,۰۰۰",
    dueDate: "۱۴۰۳/۰۷/۱۵",
    dueRelative: "۱۵ روز گذشته",
    dueColor: "text-red-500",
    rate: "٪۲۲",
    condition: "اقساط ماهانه",
    status: "سررسید گذشته",
    statusColor: "text-red-500",
    statusBg: "bg-red-500/10",
    dotColor: "bg-red-500"
  },
  {
    id: 2,
    creditor: "خواهرم سارا",
    type: "قرض شخصی",
    icon: <User className="w-5 h-5 text-blue-400" />,
    iconBg: "bg-blue-500/10",
    total: "۱۲,۰۰۰,۰۰۰",
    remaining: "۸,۵۰۰,۰۰۰",
    dueDate: "۱۴۰۳/۰۶/۳۱",
    dueRelative: "۵ روز دیگر",
    dueColor: "text-orange-500",
    rate: "٪۱۸",
    condition: "اقساط ماهانه",
    status: "سررسید نزدیک",
    statusColor: "text-orange-500",
    statusBg: "bg-orange-500/10",
    dotColor: "bg-orange-500"
  },
  {
    id: 3,
    creditor: "فروشگاه دیجی‌کالا",
    type: "خرید اقساطی",
    icon: <ShoppingCart className="w-5 h-5 text-purple-400" />,
    iconBg: "bg-purple-500/10",
    total: "۱۰,۰۰۰,۰۰۰",
    remaining: "۵,۲۰۰,۰۰۰",
    dueDate: "۱۴۰۳/۰۸/۱۵",
    dueRelative: "۴۵ روز دیگر",
    dueColor: "text-gray-400",
    rate: "٪۲۰",
    condition: "اقساط ماهانه",
    status: "در حال پرداخت",
    statusColor: "text-green-500",
    statusBg: "bg-green-500/10",
    dotColor: "bg-green-500"
  },
  {
    id: 4,
    creditor: "دوستم محمد",
    type: "قرض شخصی",
    icon: <User className="w-5 h-5 text-emerald-400" />,
    iconBg: "bg-emerald-500/10",
    total: "۲,۰۰۰,۰۰۰",
    remaining: "۲,۰۰۰,۰۰۰",
    dueDate: "۱۴۰۳/۰۹/۳۰",
    dueRelative: "۹۰ روز دیگر",
    dueColor: "text-gray-400",
    rate: "بدون بهره",
    condition: "توافقی",
    status: "به‌روز",
    statusColor: "text-emerald-500",
    statusBg: "bg-emerald-500/10",
    dotColor: "bg-emerald-500"
  }
];

// داده‌های جدول تسک‌ها
const tasksData = [
  {
    id: 1,
    title: "پرداخت قسط وام بانک ملت",
    subtitle: "قسط ماهیانه وام شخصی",
    icon: <Calendar className="w-5 h-5 text-red-400" />,
    iconBg: "bg-red-500/10 border border-red-500/20",
    category: "پرداخت",
    dueDate: "۱۴۰۳/۰۵/۲۰",
    dueRelative: "۱۰ روز گذشته",
    dueColor: "text-red-500",
    priority: "زیاد",
    priorityIcon: <ArrowUp className="w-4 h-4" />,
    priorityColor: "text-red-500",
    status: "معوق",
    statusColor: "text-red-500",
    completed: false
  },
  {
    id: 2,
    title: "خرید صندوق درآمد ثابت",
    subtitle: "سرمایه‌گذاری ماهیانه",
    icon: <TrendingUp className="w-5 h-5 text-blue-400" />,
    iconBg: "bg-blue-500/10 border border-blue-500/20",
    category: "سرمایه‌گذاری",
    dueDate: "۱۴۰۳/۰۶/۰۵",
    dueRelative: "۳ روز دیگر",
    dueColor: "text-orange-500",
    priority: "متوسط",
    priorityIcon: <Minus className="w-4 h-4" />,
    priorityColor: "text-orange-500",
    status: "در حال انجام",
    statusColor: "text-blue-500",
    completed: false
  },
  {
    id: 3,
    title: "بررسی و تنظیم بودجه ماهانه",
    subtitle: "تحلیل و بهینه‌سازی هزینه‌ها",
    icon: <FileText className="w-5 h-5 text-emerald-400" />,
    iconBg: "bg-emerald-500/10 border border-emerald-500/20",
    category: "بودجه‌بندی",
    dueDate: "۱۴۰۳/۰۶/۱۰",
    dueRelative: "۸ روز دیگر",
    dueColor: "text-gray-400",
    priority: "متوسط",
    priorityIcon: <Minus className="w-4 h-4" />,
    priorityColor: "text-orange-500",
    status: "در حال انجام",
    statusColor: "text-blue-500",
    completed: false
  },
  {
    id: 4,
    title: "پرداخت مالیات خودرو",
    subtitle: "مالیات سال ۱۴۰۳",
    icon: <Car className="w-5 h-5 text-purple-400" />,
    iconBg: "bg-purple-500/10 border border-purple-500/20",
    category: "مالیات",
    dueDate: "۱۴۰۳/۰۵/۱۵",
    dueRelative: "۸ روز گذشته",
    dueColor: "text-gray-400",
    priority: "پایین",
    priorityIcon: <ArrowDown className="w-4 h-4" />,
    priorityColor: "text-blue-500",
    status: "تکمیل شده",
    statusColor: "text-emerald-500",
    completed: true
  }
];

// داده‌های نمودار دونات بدهی‌ها
const debtChartData = [
  { name: "سررسید گذشته", value: 15000000, color: "#EF4444" },
  { name: "سررسید نزدیک", value: 8500000, color: "#F59E0B" },
  { name: "در حال پرداخت", value: 5200000, color: "#3B82F6" },
  { name: "به‌روز", value: 2000000, color: "#10B981" }
];

// داده‌های نمودار پیشرفت تسک‌ها
const taskProgressData = [
  { name: "تکمیل شده", value: 45, color: "#10B981" },
  { name: "باقی‌مانده", value: 55, color: "#1E293B" }
];

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState("debts");
  const [taskFilter, setTaskFilter] = useState("all");

  return (
    <div className="min-h-screen bg-[#0B1121] text-white p-6 font-iransans selection:bg-blue-500/30">
      <div className="grid grid-cols-12 gap-6">
        
        {/* ستون اصلی (جداول) - 8 ستون */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          
          {/* بخش بدهی‌ها */}
          <div className="bg-[#131A2B] border border-[#1E293B] rounded-2xl overflow-hidden shadow-lg">
            {/* هدر بدهی‌ها */}
            <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
              <div className="flex bg-[#0B1121] p-1 rounded-xl border border-[#1E293B]">
                <button
                  onClick={() => setActiveTab("debts")}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "debts" ? "bg-blue-600/20 text-blue-500" : "text-gray-400 hover:text-white"
                  }`}
                >
                  بدهی‌ها
                </button>
                <button
                  onClick={() => setActiveTab("tasks")}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "tasks" ? "bg-blue-600/20 text-blue-500" : "text-gray-400 hover:text-white"
                  }`}
                >
                  تسک‌های مالی
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="جستجو در بدهی‌ها..."
                    className="bg-[#0B1121] border border-[#1E293B] rounded-xl py-2.5 pr-10 pl-4 w-64 text-sm focus:outline-none focus:border-blue-500 transition-colors text-gray-200"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0B1121] border border-[#1E293B] rounded-xl text-gray-300 hover:text-white transition-colors text-sm">
                  <Filter className="w-4 h-4" /> فیلتر
                </button>
              </div>
            </div>

            {/* جدول بدهی‌ها */}
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="text-gray-400 text-xs border-b border-[#1E293B] bg-[#0B1121]/30">
                    <th className="py-4 px-6 font-normal">طلبکار / نوع بدهی</th>
                    <th className="py-4 px-6 font-normal">مبلغ کل</th>
                    <th className="py-4 px-6 font-normal">مانده</th>
                    <th className="py-4 px-6 font-normal text-center">سررسید</th>
                    <th className="py-4 px-6 font-normal text-center">نرخ / شرایط</th>
                    <th className="py-4 px-6 font-normal text-center">وضعیت</th>
                    <th className="py-4 px-6 font-normal text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {debtsData.map((item, index) => (
                    <tr key={item.id} className={`border-b border-[#1E293B]/50 hover:bg-[#1E293B]/30 transition-colors ${index === debtsData.length - 1 ? 'border-none' : ''}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                            {item.icon}
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-200">{item.creditor}</p>
                            <p className="text-xs text-gray-500 mt-1">{item.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium">{item.total}</p>
                        <p className="text-xs text-gray-500 mt-1">تومان</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-sm font-medium">{item.remaining}</p>
                        <p className="text-xs text-gray-500 mt-1">تومان</p>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <p className="text-sm text-gray-200">{item.dueDate}</p>
                        <p className={`text-xs mt-1 ${item.dueColor}`}>{item.dueRelative}</p>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <p className="text-sm text-gray-200">{item.rate}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.condition}</p>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-current/10 ${item.statusBg} ${item.statusColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.dotColor}`}></span>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 text-gray-500 hover:text-white bg-[#0B1121] border border-[#1E293B] rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-blue-500 bg-[#0B1121] border border-[#1E293B] rounded-lg transition-colors">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-500 hover:text-red-500 bg-[#0B1121] border border-[#1E293B] rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* بخش تسک‌ها */}
          <div className="bg-[#131A2B] border border-[#1E293B] rounded-2xl overflow-hidden shadow-lg mt-2">
            <div className="p-5 border-b border-[#1E293B] flex items-center justify-between">
              <div className="flex gap-2">
                {["همه", "معوق", "در حال انجام", "تکمیل شده"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTaskFilter(tab)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      taskFilter === tab ? "bg-blue-600/20 text-blue-500 border border-blue-500/20" : "text-gray-400 hover:text-white border border-transparent"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <Plus className="w-4 h-4" /> افزودن تسک جدید
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="text-gray-400 text-xs border-b border-[#1E293B] bg-[#0B1121]/30">
                    <th className="py-4 px-6 font-normal w-12"></th>
                    <th className="py-4 px-6 font-normal">تسک</th>
                    <th className="py-4 px-6 font-normal">دسته‌بندی</th>
                    <th className="py-4 px-6 font-normal text-center">سررسید</th>
                    <th className="py-4 px-6 font-normal text-center">اولویت</th>
                    <th className="py-4 px-6 font-normal text-center">وضعیت</th>
                    <th className="py-4 px-6 font-normal text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksData.map((task, index) => (
                    <tr key={task.id} className={`border-b border-[#1E293B]/50 hover:bg-[#1E293B]/30 transition-colors ${index === tasksData.length - 1 ? 'border-none' : ''}`}>
                      <td className="py-4 pl-0 pr-6 text-center">
                         {task.completed ? (
                            <div className="w-5 h-5 rounded bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-500 cursor-pointer">
                              <CheckSquare className="w-3.5 h-3.5" />
                            </div>
                         ) : (
                            <div className="w-5 h-5 rounded border border-[#1E293B] flex items-center justify-center text-gray-500 cursor-pointer hover:border-gray-400">
                               <Square className="w-3.5 h-3.5 opacity-0" />
                            </div>
                         )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${task.iconBg}`}>
                            {task.icon}
                          </div>
                          <div>
                            <p className={`font-medium text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{task.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{task.subtitle}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-300">{task.category}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <p className="text-sm text-gray-200">{task.dueDate}</p>
                        <p className={`text-xs mt-1 ${task.dueColor}`}>{task.dueRelative}</p>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center gap-1 text-sm ${task.priorityColor}`}>
                           {task.priorityIcon} {task.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium border border-current/10 bg-current/10 ${task.statusColor}`}>
                          {task.completed ? <span className="flex items-center gap-1"><CheckSquare className="w-3 h-3"/> {task.status}</span> : <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-current"></span> {task.status}</span>}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 text-gray-500 hover:text-white bg-[#0B1121] border border-[#1E293B] rounded-lg transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>

        {/* ستون کناری - 4 ستون */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          
          {/* کارت خلاصه بدهی‌ها */}
          <div className="bg-[#131A2B] border border-[#1E293B] rounded-2xl p-6 shadow-lg">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg">خلاصه</h3>
                <button className="flex items-center gap-1 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                  <Plus className="w-4 h-4" /> افزودن بدهی جدید
                </button>
             </div>

             <div className="flex items-center justify-between mb-4">
                {/* چارت */}
                <div className="w-40 h-40 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={debtChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={4}
                      >
                        {debtChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center pt-1">
                    <span className="text-[10px] text-gray-400 mb-0.5">جمع کل بدهی‌ها</span>
                    <span className="font-bold text-sm text-white">۳۰,۲۰۰,۰۰۰</span>
                    <span className="text-[10px] text-gray-500">تومان</span>
                  </div>
                </div>

                {/* راهنمای چارت */}
                <div className="flex flex-col gap-3">
                   {debtChartData.map((item, index) => (
                      <div key={index} className="flex flex-col">
                         <div className="flex justify-between items-center gap-4 text-xs mb-1">
                            <span className="flex items-center gap-1.5 text-gray-300">
                               <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                               {item.name}
                            </span>
                            <span className="font-medium text-white">{item.value.toLocaleString('fa-IR')}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
             
             <button className="w-full mt-2 py-3 bg-[#0B1121] border border-[#1E293B] rounded-xl text-sm text-blue-500 hover:bg-[#1E293B]/50 transition-colors flex justify-center items-center gap-2">
                <Eye className="w-4 h-4" /> مشاهده گزارش کامل
             </button>
          </div>

          {/* کارت یادآوری‌های بدهی */}
          <div className="bg-[#131A2B] border border-[#1E293B] rounded-2xl p-6 shadow-lg">
             <h3 className="font-semibold text-lg mb-4">یادآوری‌های بدهی</h3>
             
             <div className="flex flex-col gap-3">
                <div className="bg-[#0B1121] border border-[#1E293B] p-4 rounded-xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="bg-red-500/10 p-2.5 rounded-lg text-red-500">
                         <Bell className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="font-medium text-sm text-gray-200">قسط وام بانک ملت</p>
                         <p className="text-xs text-red-500 mt-1">۱۵ روز گذشته</p>
                      </div>
                   </div>
                   <div className="text-left">
                      <p className="font-medium text-sm text-white">۱۵,۰۰۰,۰۰۰</p>
                      <p className="text-xs text-gray-500 mt-0.5">تومان</p>
                   </div>
                </div>

                <div className="bg-[#0B1121] border border-[#1E293B] p-4 rounded-xl flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="bg-orange-500/10 p-2.5 rounded-lg text-orange-500">
                         <Bell className="w-5 h-5" />
                      </div>
                      <div>
                         <p className="font-medium text-sm text-gray-200">قرض به خواهرم سارا</p>
                         <p className="text-xs text-orange-500 mt-1">۵ روز دیگر</p>
                      </div>
                   </div>
                   <div className="text-left">
                      <p className="font-medium text-sm text-white">۸,۵۰۰,۰۰۰</p>
                      <p className="text-xs text-gray-500 mt-0.5">تومان</p>
                   </div>
                </div>
             </div>

             <button className="w-full mt-4 py-3 bg-[#0B1121] border border-[#1E293B] rounded-xl text-sm text-blue-500 hover:bg-[#1E293B]/50 transition-colors flex justify-center items-center gap-2">
                <Eye className="w-4 h-4" /> مشاهده همه یادآوری‌ها
             </button>
          </div>

          {/* پیشرفت تسک‌ها */}
          <div className="bg-[#131A2B] border border-[#1E293B] rounded-2xl p-6 shadow-lg flex-1">
             <h3 className="font-semibold text-lg mb-4">پیشرفت تسک‌ها</h3>
             
             <div className="flex items-center gap-6 mt-4">
                {/* چارت دایره‌ای تسک‌ها */}
                <div className="w-24 h-24 relative flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskProgressData}
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
                        {taskProgressData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="font-bold text-lg text-white">۴۵٪</span>
                    <span className="text-[9px] text-gray-400">تکمیل شده</span>
                  </div>
                </div>

                {/* آمار تسک‌ها */}
                <div className="flex-1 flex flex-col gap-2">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">کل تسک‌ها</span>
                      <span className="font-medium text-white">۴</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-emerald-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> تکمیل شده</span>
                      <span className="font-medium text-emerald-500">۱</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-blue-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> در حال انجام</span>
                      <span className="font-medium text-blue-500">۲</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-red-500 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> معوق</span>
                      <span className="font-medium text-red-500">۱</span>
                   </div>
                </div>
             </div>

             <button className="w-full mt-6 py-3 bg-[#0B1121] border border-[#1E293B] rounded-xl text-sm text-gray-300 hover:text-white hover:bg-[#1E293B]/50 transition-colors flex justify-center items-center gap-2">
                <Calendar className="w-4 h-4" /> مشاهده تقویم مالی
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}