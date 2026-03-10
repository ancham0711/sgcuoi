
import React from 'react';
import { WeddingData } from './types';

export const CONFIG = {
  telegramToken: "8530312277:AAGGl8HAmjeRqVsBTHOY7uoIDns8gmwXkZQ", 
  telegramChatId: "1024238549", 
  useTelegram: true  
};

export const DEFAULT_WEDDING_DATA: WeddingData = {
  groomName: "NGUYỄN THẾ VƯƠNG",
  groomFather: "", // Không có thông tin cha
  groomMother: "Phạm Thị Toa",
  brideName: "HỒ THỊ NGỌC NÊN",
  brideFather: "Hồ Văn Hóa",
  brideMother: "Trần Thị No",
  date: "2026-04-18",
  time: "18:00",
  location: "NHÀ HÀNG TIỆC CƯỚI NAM BỘ",
  locationDetails: "Sảnh Nhật Nguyệt - 615A Âu Cơ, P. Tân Phú, TP.HCM",
  lunarDate: "02 tháng 03 năm Bính Ngọ",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Nhà+Hàng+Tiệc+Cưới+Nam+Bộ+615A+Âu+Cơ",
  
  heroImage: "https://i.postimg.cc/bwYcnpSR/0U9A9775.jpg", 
  
  album: [
    "https://i.postimg.cc/Z552RH1z/0U9A0078.jpg",
    "https://i.postimg.cc/BvdVm0bg/0U9A0034.jpg",
    "https://i.postimg.cc/tTjjvPmr/0U9A9944-EDIT.jpg",
    
    "https://i.postimg.cc/g0BMnP3J/0U9A9701.jpg",
     "https://i.postimg.cc/3RRPcBF4/0U9A9552.jpg",
    "https://i.postimg.cc/KzCx7wh2/0U9A9640.jpg",
    "https://i.postimg.cc/sXGR2mGM/0U9A9661.jpg",
    
    "https://i.postimg.cc/QNBMBkZC/0U9A0264.jpg",
    //"https://i.postimg.cc/MTQhwGgn/0U9A9961.jpg",
  ],
  
  message: "Hạnh phúc là khi tìm thấy một nửa của đời mình. Trong sự hân hoan và tình yêu thương.\n\nThế Vương & Ngọc Nên trân trọng kính mời quý quan khách đến dự tiệc cưới của chúng mình. Sự hiện diện của quý vị là niềm vinh hạnh to lớn cho gia đình chúng tôi.",
  bankGroom: {
    bankName: "Ngân hàng BIDV",
    accountNumber: "65210001545746",
    accountHolder: "NGUYỄN THẾ VƯƠNG"
  },
  bankBride: {
    bankName: "Ngân hàng Vietinbank",
    accountNumber: "0326846441",
    accountHolder: "HỒ THỊ NÊN"
  }
};

export const ClassicHySymbol = ({ className }: { className?: string }) => (
  <div className={`text-6xl font-serif flex items-center justify-center ${className}`}>
     囍
  </div>
);

export const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 text-red-600 ${className}`} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export const DecorativeBorder = () => (
  <div className="flex justify-center items-center py-6 opacity-30">
    <div className="h-[1px] w-16 bg-red-600"></div>
    <div className="mx-4 text-[10px] tracking-[0.4em] uppercase font-bold text-red-700 italic">Save the date</div>
    <div className="h-[1px] w-16 bg-red-600"></div>
  </div>
);
