"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  Check,
  X
} from "lucide-react";
import Container from "@/component/container/container";

// داده‌های نمونه دقیقاً مطابق تصویر
const shoppingData = [
  {
    id: 1,
    title: "لپ تاپ مک‌بوک پرو ۱۴ اینچ",
    subtitle: "Apple MacBook Pro M3",
    category: "الکترونیک",
    categoryColor: "bg-blue-500",
    price: "۸۵,۰۰۰,۰۰۰",
    date: "۱۴۰۳/۰۶/۱۵",
    relativeDate: "۲۱ روز دیگر",
    priority: "زیاد",
    priorityColor: "bg-red-500",
    status: "برنامه‌ریزی شده",
    statusType: "planned",
  },
  {
    id: 2,
    title: "iPhone 15 Pro Max",
    subtitle: "256GB - Natural Titanium",
    category: "الکترونیک",
    categoryColor: "bg-blue-500",
    price: "۶۸,۰۰۰,۰۰۰",
    date: "۱۴۰۳/۰۷/۰۱",
    relativeDate: "۳۷ روز دیگر",
    priority: "زیاد",
    priorityColor: "bg-red-500",
    status: "برنامه‌ریزی شده",
    statusType: "planned",
  },
  {
    id: 3,
    title: "مبل راحتی ۷ نفره",
    subtitle: "مدل ال مدرن",
    category: "خانه و آشپزخانه",
    categoryColor: "bg-green-500",
    price: "۳۵,۵۰۰,۰۰۰",
    date: "۱۴۰۳/۰۶/۳۰",
    relativeDate: "۳۶ روز دیگر",
    priority: "متوسط",
    priorityColor: "bg-orange-500",
    status: "برنامه‌ریزی شده",
    statusType: "planned",
  },
  {
    id: 4,
    title: "یخچال ساید بای ساید",
    subtitle: "سامسونگ مدل RS62",
    category: "خانه و آشپزخانه",
    categoryColor: "bg-green-500",
    price: "۵۵,۰۰۰,۰۰۰",
    date: "۱۴۰۳/۰۶/۱۰",
    relativeDate: "۱۶ روز پیش",
    priority: "زیاد",
    priorityColor: "bg-red-500",
    status: "خرید شده",
    statusType: "bought",
  },
  {
    id: 5,
    title: "Apple Watch Series 9",
    subtitle: "45mm - Midnight",
    category: "الکترونیک",
    categoryColor: "bg-blue-500",
    price: "۲۱,۰۰۰,۰۰۰",
    date: "۱۴۰۳/۰۶/۰۵",
    relativeDate: "۲۱ روز پیش",
    priority: "متوسط",
    priorityColor: "bg-orange-500",
    status: "خرید شده",
    statusType: "bought",
  },
  {
    id: 6,
    title: "هدفون سونی WH-1000XM5",
    subtitle: "Noise Cancelling",
    category: "الکترونیک",
    categoryColor: "bg-blue-500",
    price: "۱۵,۲۰۰,۰۰۰",
    date: "۱۴۰۳/۰۶/۲۰",
    relativeDate: "۳ روز پیش",
    priority: "پایین",
    priorityColor: "bg-blue-500",
    status: "لغو شده",
    statusType: "cancelled",
  },
];

export default function ShoppingList() {
  const [activeTab, setActiveTab] = useState("all");

  const renderStatusBadge = (status, type) => {
    switch (type) {
      case "planned":
        return (
          <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20 w-32">
            {status}
          </span>
        );
      case "bought":
        return (
          <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20 w-32">
            <Check className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20 w-32">
            <X className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#0B1121] text-white p-6 font-iransans">
      <div className="bg-[#131A2B] border border-[#1E293B] rounded-2xl overflow-hidden shadow-lg">
        
        {/* هدر */}
        <div className="p-6 border-b border-[#1E293B] flex items-center justify-between">
          {/* تب‌ها */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "all" ? "bg-[#1E293B] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              همه
            </button>
            <button
              onClick={() => setActiveTab("planned")}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "planned" ? "bg-[#1E293B] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              برنامه‌ریزی شده
            </button>
            <button
              onClick={() => setActiveTab("bought")}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "bought" ? "bg-[#1E293B] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              خرید شده
            </button>
            <button
              onClick={() => setActiveTab("cancelled")}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "cancelled" ? "bg-[#1E293B] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              لغو شده
            </button>
          </div>

          {/* اکشن‌های هدر */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                placeholder="جستجو در خریدها..."
                className="bg-[#0B1121] border border-[#1E293B] rounded-xl py-2 pr-10 pl-4 w-64 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-600 text-gray-300"
              />
            </div>
            <button className="flex items-center justify-center p-2.5 bg-[#0B1121] border border-[#1E293B] rounded-xl text-gray-400 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-5 py-2.5 rounded-xl font-medium text-sm shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              <Plus className="w-4 h-4" /> افزودن خرید جدید
            </button>
          </div>
        </div>

        {/* جدول */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="text-gray-400 text-xs border-b border-[#1E293B]">
                <th className="py-4 px-6 font-normal w-1/4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                    کالا / خدمت <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </th>
                <th className="py-4 px-6 font-normal">دسته‌بندی</th>
                <th className="py-4 px-6 font-normal">قیمت تخمینی</th>
                <th className="py-4 px-6 font-normal">تاریخ برنامه‌ریزی</th>
                <th className="py-4 px-6 font-normal">اولویت</th>
                <th className="py-4 px-6 font-normal text-center">وضعیت</th>
                <th className="py-4 px-6 font-normal text-center">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {shoppingData.map((item, index) => (
                <tr
                  key={item.id}
                  className={`border-b border-[#1E293B]/50 hover:bg-[#1E293B]/30 transition-colors ${
                    index === shoppingData.length - 1 ? "border-none" : ""
                  }`}
                >
                  {/* کالا / خدمت */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0B1121] border border-[#1E293B] flex items-center justify-center p-2 flex-shrink-0">
                        <div className="w-full h-full bg-gray-800 rounded opacity-50"></div>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-200">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1" dir="ltr">{item.subtitle}</p>
                      </div>
                    </div>
                  </td>

                  {/* دسته‌بندی */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.categoryColor}`}></span>
                      <span className="text-sm text-gray-300">{item.category}</span>
                    </div>
                  </td>

                  {/* قیمت تخمینی */}
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-gray-200">{item.price}</p>
                    <p className="text-xs text-gray-500 mt-1">تومان</p>
                  </td>

                  {/* تاریخ برنامه‌ریزی */}
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-300">{item.date}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.relativeDate}</p>
                  </td>

                  {/* اولویت */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.priorityColor}`}></span>
                      <span className="text-sm text-gray-300">{item.priority}</span>
                    </div>
                  </td>

                  {/* وضعیت */}
                  <td className="py-4 px-6 text-center">
                    {renderStatusBadge(item.status, item.statusType)}
                  </td>

                  {/* عملیات */}
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-gray-500 hover:text-white bg-[#0B1121] border border-[#1E293B] rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-500 bg-[#0B1121] border border-[#1E293B] hover:border-red-500/30 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* فوتر / آمار پایین */}
        <div className="border-t border-[#1E293B] p-6 bg-[#0B1121]/50 flex justify-between items-center text-sm">
          <div className="text-right">
            <p className="text-gray-500 mb-1">جمع کل تخمینی</p>
            <p className="font-bold text-gray-200 text-lg">۲۷۹,۷۰۰,۰۰۰ <span className="text-xs font-normal text-gray-500">تومان</span></p>
          </div>
          
          <div className="text-center border-r border-[#1E293B] pr-8">
            <p className="text-gray-500 mb-1">تعداد کل خریدها</p>
            <p className="font-bold text-gray-200 text-lg">۶ <span className="text-xs font-normal text-gray-500">مورد</span></p>
          </div>

          <div className="text-center border-r border-[#1E293B] pr-8">
             <p className="text-gray-500 mb-1 text-blue-500">برنامه‌ریزی شده</p>
             <p className="font-bold text-blue-500 text-lg">۳ <span className="text-xs font-normal opacity-70">مورد</span></p>
          </div>

          <div className="text-center border-r border-[#1E293B] pr-8">
             <p className="text-gray-500 mb-1 text-green-500">خرید شده</p>
             <p className="font-bold text-green-500 text-lg">۲ <span className="text-xs font-normal opacity-70">مورد</span></p>
          </div>

          <div className="text-center border-r border-[#1E293B] pr-8">
             <p className="text-gray-500 mb-1 text-red-500">لغو شده</p>
             <p className="font-bold text-red-500 text-lg">۱ <span className="text-xs font-normal opacity-70">مورد</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}