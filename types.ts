
export interface WeddingData {
  groomName: string;
  groomFather?: string;
  groomMother?: string;
  brideName: string;
  brideFather?: string;
  brideMother?: string;
  date: string;
  time: string;
  location: string;
  locationDetails: string;
  lunarDate?: string;
  mapUrl: string;
  heroImage: string;
  album: string[];
  message: string;
  bankGroom?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  bankBride?: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
}

export interface RSVP {
  name: string;
  attendance: 'yes' | 'no';
  side: 'groom' | 'bride';
  guests: number;
  message: string;
}
