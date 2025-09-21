import type { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

export type Guestbook = {
  id: string;
  message: string;
  name: string;
  email: string;
  image: string;
  username: string;
  createdAt: Timestamp;
  createdBy: string;
};

export type Message = Guestbook['message'];

export const guestbookConverter: FirestoreDataConverter<Guestbook> = {
  toFirestore(guestbook) {
    return guestbook;
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Guestbook;
  }
};
