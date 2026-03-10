
import React, { useState, useEffect } from 'react';
import { WeddingData, RSVP } from './types';
import { DEFAULT_WEDDING_DATA, HeartIcon, ClassicHySymbol, DecorativeBorder, CONFIG } from './constants';

const App: React.FC = () => {
  const [data] = useState<WeddingData>(DEFAULT_WEDDING_DATA);
  const [isOpening, setIsOpening] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [submittingRsvp, setSubmittingRsvp] = useState(false);
  const [rsvp, setRsvp] = useState<RSVP>({ name: '', attendance: 'yes', side: 'bride', guests: 1, message: '' });
  const [showRsvpSuccess, setShowRsvpSuccess] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timerOpen = setTimeout(() => {
      setIsOpening(true);
    }, 500);

    const timerFinish = setTimeout(() => {
      setHasOpened(true);
    }, 2800);

    const target = new Date(data.date).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => {
      clearTimeout(timerOpen);
      clearTimeout(timerFinish);
      clearInterval(interval);
    };
  }, [data.date]);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingRsvp(true);

    if (CONFIG.useTelegram && CONFIG.telegramToken && CONFIG.telegramChatId) {
      const status = rsvp.attendance === 'yes' ? '✅ SẼ THAM DỰ' : '❌ RẤT TIẾC KHÔNG THỂ ĐẾN';
      const side = rsvp.side === 'groom' ? '🤵 NHÀ TRAI' : '👰 NHÀ GÁI';
      const telegramMessage = `
🔔 *THÔNG BÁO RSVP MỚI* 🔔

👤 *Khách hàng:* ${rsvp.name}
🚩 *Phía khách:* ${side}
💌 *Trạng thái:* ${status}
💬 *Lời nhắn:* ${rsvp.message || "Không có lời nhắn"}

---
_Gửi từ Thiệp Cưới Online_
      `;

      try {
        await fetch(`https://api.telegram.org/bot${CONFIG.telegramToken}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: CONFIG.telegramChatId,
            text: telegramMessage,
            parse_mode: 'Markdown',
          }),
        });
      } catch (error) {
        console.error("Lỗi gửi Telegram:", error);
      }
    }

    setTimeout(() => {
      setSubmittingRsvp(false);
      setShowRsvpSuccess(true);
      setRsvp({ name: '', attendance: 'yes', side: 'bride', guests: 1, message: '' });
    }, 800);
  };

  return (
    <div className={`min-h-screen max-w-[500px] mx-auto bg-white shadow-luxury relative ${!hasOpened ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* --- HIỆU ỨNG MỞ CÁNH THIỆP ĐỎ --- */}
      {!hasOpened && (
        <div className={`fixed inset-0 z-[1000] flex max-w-[500px] mx-auto ${isOpening ? 'doors-open' : ''}`}>
          <div className="door-left w-1/2 h-full bg-red-velvet border-r border-yellow-200/20 flex items-center justify-end">
            <div className="translate-x-1/2 gold-text text-8xl animate-gold">囍</div>
          </div>
          <div className="door-right w-1/2 h-full bg-red-velvet border-l border-yellow-200/20 flex items-center justify-start">
            <div className="-translate-x-1/2 gold-text text-8xl animate-gold">囍</div>
          </div>
          <div className={`absolute inset-0 flex items-end justify-center pb-20 transition-opacity duration-1000 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
             <p className="text-white/50 text-[10px] uppercase tracking-[0.5em] animate-pulse">Chào mừng quý khách...</p>
          </div>
        </div>
      )}

      {/* --- PHẦN 1: HERO SECTION --- */}
      <section className="relative h-screen w-full flex flex-col justify-between text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.heroImage} 
            className={`w-full h-full object-cover object-center transition-transform duration-[12s] ${isOpening ? 'scale-100' : 'scale-115'}`} 
            alt="Hero" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent via-40% to-black/70"></div>
          <div className="absolute inset-0 pattern-overlay opacity-5"></div>
        </div>
        
        <div className={`relative z-10 text-center px-6 pt-6 transition-all duration-1000 delay-700 ${isOpening ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <p className="text-[9px] tracking-[0.8em] uppercase font-bold text-red-100/70 mb-2 drop-shadow-lg">Trân trọng kính mời</p>
          
          <div className="flex justify-center items-center h-4 mb-2">
            <ClassicHySymbol className="gold-text scale-[0.25] drop-shadow-md opacity-70" />
          </div>
          
          <div className="flex flex-col gap-1 mt-0">
            <h1 className="text-lg font-name gold-text drop-shadow-2xl tracking-[0.25em] leading-none uppercase pt-2">Thế Vương</h1>
            <p className="text-xs font-calligraphy text-yellow-100/30 italic leading-none">&</p>
            <h1 className="text-lg font-name gold-text drop-shadow-2xl tracking-[0.25em] leading-none uppercase">Ngọc Nên</h1>
          </div>
        </div>

        <div className={`relative z-10 text-center px-6 pb-20 transition-all duration-1000 delay-1000 ${isOpening ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block border-y border-white/10 py-3 px-8">
             <p className="text-[18px] font-serif-elegant tracking-[0.6em] uppercase font-light text-red-50/70 drop-shadow-md">
              {data.date.split('-').reverse().join(' . ')}
            </p>
          </div>
          <div className="mt-12 animate-bounce opacity-25">
             <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 13l-7 7-7-7" /></svg>
          </div>
        </div>
      </section>

      {/* --- PHẦN 2: THƯ NGỎ --- */}
      <section className="py-32 px-10 text-center bg-white relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border border-red-50">
            <HeartIcon className="text-red-700 animate-pulse" />
          </div>
        </div>
        <div className="space-y-10">
          <h2 className="text-[10px] tracking-[0.6em] uppercase font-bold text-red-800 italic">Thư Ngỏ</h2>
          <p className="text-3xl font-wedding text-gray-700 leading-snug px-4 whitespace-pre-line">
            {data.message}
          </p>
          <DecorativeBorder />
        </div>
      </section>

      {/* --- PHẦN 3: GIA ĐÌNH HAI BÊN --- */}
      <section className="py-24 px-8 bg-gray-50/50 border-y border-red-50 relative overflow-hidden">
        <div className="absolute inset-0 pattern-overlay"></div>
        <div className="relative z-10 grid grid-cols-1 gap-24">
          <div className="text-center space-y-10">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.5em] text-red-800/40 font-bold">Gia Đình Nhà Trai</p>
              <div className="text-xs text-gray-500 font-medium italic space-y-1">
                <p>Thôn An Phước, Xã Phước Giang, Tỉnh Quảng Ngãi</p>
                <p className="text-gray-800 text-sm mt-2 font-bold not-italic">Bà: {data.groomMother}</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold italic">Thứ Nam</p>
              <h3 className="text-3xl font-name text-red-900 border-b border-red-100 pb-4 inline-block">{data.groomName}</h3>
            </div>
          </div>

          <div className="flex justify-center items-center py-4">
            <div className="h-px w-20 bg-red-100"></div>
            <HeartIcon className="mx-6 text-red-200 w-10 h-10" />
            <div className="h-px w-20 bg-red-100"></div>
          </div>

          <div className="text-center space-y-10">
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.5em] text-red-800/40 font-bold">Gia Đình Nhà Gái</p>
              <div className="text-xs text-gray-500 font-medium italic space-y-1">
                <p>Thôn 1, Xã Phú Vinh, TP. Huế</p>
                <p className="text-gray-800 text-sm mt-2 font-bold not-italic">Ông: {data.brideFather}</p>
                <p className="text-gray-800 text-sm font-bold not-italic">Bà: {data.brideMother}</p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold italic">Út Nữ</p>
              <h3 className="text-3xl font-name text-red-900 border-b border-red-100 pb-4 inline-block">{data.brideName}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHẦN 4: THỜI GIAN & ĐỊA ĐIỂM --- */}
      <section className="py-32 px-8 bg-red-900 text-white rounded-t-[5rem] -mt-16 relative z-10 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 pattern-overlay opacity-10"></div>
        <div className="relative z-10 text-center mb-24">
          <h2 className="text-6xl font-wedding gold-text">Hôn Lễ</h2>
          <div className="h-px w-16 bg-yellow-200/20 mx-auto mt-6"></div>
        </div>

        <div className="relative z-10 space-y-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3rem] text-center space-y-8">
            <h4 className="text-[10px] tracking-[0.6em] uppercase font-bold text-yellow-100/60">Tổ chức tại</h4>
            <p className="text-4xl font-serif-elegant gold-text font-bold tracking-tighter leading-tight px-4">{data.location}</p>
            <div className="space-y-2">
              <p className="text-lg font-serif-elegant italic text-red-50  tracking-[0.2em]">{data.time}H</p>
              <p className="text-sm font-light text-red-100/70">Thứ Bảy, 18 tháng 04 năm 2026</p>
              <p className="text-xs italic text-yellow-100/40">(Nhằm ngày {data.lunarDate})</p>
            </div>
            <div className="w-12 h-px bg-white/10 mx-auto my-6"></div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 leading-relaxed px-6">
                {data.locationDetails}
              </p>
            </div>
            <a href={data.mapUrl} target="_blank" className="inline-block mt-8 px-14 py-4 rounded-full border border-yellow-200/20 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-white hover:text-red-900 transition-all duration-500">Xem chỉ đường</a>
          </div>
        </div>
      </section>

      {/* --- PHẦN 5: ALBUM ẢNH --- */}
      <section className="py-32 px-4 bg-white relative">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-wedding text-red-900 leading-none">Hành Trình</h2>
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold mt-6 italic">Our Love Story</p>
        </div>
        <div className="columns-1 gap-4 space-y-4 px-2">
          {data.album.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-[2.5rem] shadow-xl border-[6px] border-white group">
              <img src={img} alt={`Album ${idx}`} className="w-full h-auto group-hover:scale-110 transition-transform duration-1000" />
            </div>
          ))}
        </div>
      </section>

      {/* --- PHẦN 6: ĐẾM NGƯỢC --- */}
      <section className="py-28 text-center bg-gray-50 border-y border-red-50">
        <h3 className="text-[10px] tracking-[0.8em] uppercase font-bold text-red-900 mb-16">Ngày Hạnh Phúc</h3>
        <div className="flex justify-between items-center max-w-[400px] mx-auto px-10">
          {[
            { label: 'Ngày', value: timeLeft.d },
            { label: 'Giờ', value: timeLeft.h },
            { label: 'Phút', value: timeLeft.m },
            { label: 'Giây', value: timeLeft.s }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-6xl font-serif-elegant text-gray-800 mb-2 font-light">{item.value < 10 ? `0${item.value}` : item.value}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --- PHẦN 7: XÁC NHẬN RSVP --- */}
      <section id="rsvp" className="py-32 px-6 bg-white relative">
        <div className="bg-white rounded-[4rem] p-10 shadow-2xl max-w-sm mx-auto border border-red-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/20 rounded-bl-full pointer-events-none"></div>
          <div className="text-center mb-10">
            <h2 className="text-6xl font-wedding text-red-900 mb-4 leading-none">Xác Nhận</h2>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Rất hân hạnh được đón tiếp</p>
          </div>
          <form onSubmit={handleRsvpSubmit} className="space-y-10">
            {/* Nhập tên */}
            <input 
              required
              placeholder="Tên của bạn..."
              value={rsvp.name}
              onChange={e => setRsvp({...rsvp, name: e.target.value})}
              className="w-full border-b border-gray-100 py-4 px-2 focus:outline-none focus:border-red-900 transition-colors bg-transparent text-sm placeholder:italic"
            />
            
            {/* Chọn phía nhà */}
            <div className="space-y-3">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold italic text-center">Bạn là khách của</p>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setRsvp({...rsvp, side: 'groom'})}
                  className={`flex-1 text-[9px] uppercase font-bold py-5 rounded-full transition-all tracking-[0.1em] border ${rsvp.side === 'groom' ? 'bg-red-900 text-white border-red-900 shadow-lg' : 'bg-white text-gray-400 border-gray-100'}`}
                >Nhà Trai</button>
                <button 
                  type="button"
                  onClick={() => setRsvp({...rsvp, side: 'bride'})}
                  className={`flex-1 text-[9px] uppercase font-bold py-5 rounded-full transition-all tracking-[0.1em] border ${rsvp.side === 'bride' ? 'bg-red-900 text-white border-red-900 shadow-lg' : 'bg-white text-gray-400 border-gray-100'}`}
                >Nhà Gái</button>
              </div>
            </div>

            {/* Trạng thái tham dự */}
            <div className="space-y-3">
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold italic text-center">Xác nhận tham dự</p>
              <div className="flex gap-4">
                <button 
                  type="button"
                  onClick={() => setRsvp({...rsvp, attendance: 'yes'})}
                  className={`flex-1 text-[9px] uppercase font-bold py-5 rounded-full transition-all tracking-[0.1em] border ${rsvp.attendance === 'yes' ? 'bg-red-900 text-white border-red-900 shadow-lg' : 'bg-white text-gray-400 border-gray-100'}`}
                >Tham dự</button>
                <button 
                  type="button"
                  onClick={() => setRsvp({...rsvp, attendance: 'no'})}
                  className={`flex-1 text-[9px] uppercase font-bold py-5 rounded-full transition-all tracking-[0.1em] border ${rsvp.attendance === 'no' ? 'bg-red-900 text-white border-red-900 shadow-lg' : 'bg-white text-gray-400 border-gray-100'}`}
                >Vắng mặt</button>
              </div>
            </div>

            <textarea 
              placeholder="Lời nhắn nhủ..."
              value={rsvp.message}
              onChange={e => setRsvp({...rsvp, message: e.target.value})}
              className="w-full border-b border-gray-100 py-4 px-2 focus:outline-none focus:border-red-900 transition-colors bg-transparent text-sm placeholder:italic"
              rows={2}
            />
            
            <button 
              disabled={submittingRsvp}
              className="w-full bg-red-900 text-white text-[11px] uppercase font-bold tracking-[0.4em] py-7 rounded-full shadow-2xl hover:bg-red-950 transition-all active:scale-95"
            >
              {submittingRsvp ? 'Đang gửi...' : 'Gửi xác nhận'}
            </button>
          </form>
        </div>
      </section>

      {/* --- PHẦN 8: QUÀ MỪNG --- */}
      <section className="py-32 text-center px-10 bg-gray-50/50">
        <h3 className="text-6xl font-wedding text-red-900 mb-8">Quà Mừng</h3>
        <p className="text-xs text-gray-500 mb-16 italic font-serif-elegant opacity-70 leading-relaxed px-6">
          "Tình cảm của các bạn là món quà lớn nhất cho chúng mình."
        </p>
        <button 
          onClick={() => setShowGift(!showGift)}
          className="bg-white border border-red-100 px-16 py-4 rounded-full text-[10px] uppercase font-bold tracking-widest text-red-900 shadow-xl"
        >
          {showGift ? 'Ẩn thông tin' : 'Gửi quà cưới'}
        </button>
        {showGift && (
          <div className="mt-20 space-y-12 animate-fade-up max-w-sm mx-auto px-4">
            <div className="bg-white p-14 rounded-[4rem] border border-red-50 text-left shadow-2xl relative overflow-hidden">
              <p className="text-[10px] uppercase tracking-[0.5em] text-red-900/40 mb-10 font-bold">Mừng Chú Rể</p>
              <p className="text-sm font-bold text-gray-800 mb-1">{data.bankGroom?.bankName}</p>
              <p className="text-2xl font-name gold-text tracking-widest">{data.bankGroom?.accountNumber}</p>
              <p className="text-[10px] uppercase text-gray-400 mt-6 font-medium italic tracking-widest">{data.bankGroom?.accountHolder}</p>
            </div>
            <div className="bg-white p-14 rounded-[4rem] border border-red-50 text-left shadow-2xl relative overflow-hidden">
              <p className="text-[10px] uppercase tracking-[0.5em] text-red-900/40 mb-10 font-bold">Mừng Cô Dâu</p>
              <p className="text-sm font-bold text-gray-800 mb-1">{data.bankBride?.bankName}</p>
              <p className="text-2xl font-name gold-text tracking-widest">{data.bankBride?.accountNumber}</p>
              <p className="text-[10px] uppercase text-gray-400 mt-6 font-medium italic tracking-widest">{data.bankBride?.accountHolder}</p>
            </div>
          </div>
        )}
      </section>

      {/* --- PHẦN 9: FOOTER --- */}
      <footer className="py-32 bg-white text-center border-t border-red-50">
        <div className="mb-20 opacity-20">
          <ClassicHySymbol className="scale-75" />
        </div>
        <h4 className="text-7xl font-wedding text-red-900 mb-12 leading-none">Cảm Ơn!</h4>
        <p className="text-[12px] uppercase tracking-[0.7em] text-gray-400 font-bold">Hẹn gặp bạn trong ngày vui!</p>
      </footer>

      {/* MODAL THÀNH CÔNG */}
      {showRsvpSuccess && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-md p-6">
          <div className="text-center animate-fade-up max-w-xs bg-white p-16 rounded-[4rem] shadow-2xl">
            <div className="text-8xl mb-12">❤️</div>
            <h3 className="text-5xl font-wedding text-red-900 mb-8 leading-none">Cảm ơn bạn!</h3>
            <p className="text-xs text-gray-500 italic mb-12">Hẹn gặp lại bạn tại buổi lễ hạnh phúc của Vương & Nên!</p>
            <button onClick={() => setShowRsvpSuccess(false)} className="w-full py-6 bg-red-900 text-white rounded-full text-[11px] uppercase font-bold tracking-widest">Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
