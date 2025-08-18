export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: Date;
}

export interface CreateGuestbookEntry {
  name: string;
  message: string;
}
