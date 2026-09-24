import { signInAnonymously, type User } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@/firebaseConnection";

export type WatchlistMediaType = "movie" | "tv";

export interface WatchlistItem {
  media_id: number;
  media_type: WatchlistMediaType;
}

let authenticationPromise: Promise<User> | null = null;

async function getAuthenticatedUser() {
  if (auth.currentUser) {
    return auth.currentUser;
  }

  if (!authenticationPromise) {
    authenticationPromise = signInAnonymously(auth)
      .then(({ user }) => user)
      .finally(() => {
        authenticationPromise = null;
      });
  }

  return authenticationPromise;
}

function getWatchlistCollection(userId: string) {
  return collection(db, "users", userId, "watchlist");
}

function getWatchlistDocument(
  userId: string,
  mediaId: number,
  mediaType: WatchlistMediaType,
) {
  return doc(getWatchlistCollection(userId), `${mediaType}_${mediaId}`);
}

export async function isMediaSaved(
  mediaId: number,
  mediaType: WatchlistMediaType,
) {
  const user = await getAuthenticatedUser();

  const snapshot = await getDoc(
    getWatchlistDocument(user.uid, mediaId, mediaType),
  );

  return snapshot.exists();
}

export async function saveMedia(
  mediaId: number,
  mediaType: WatchlistMediaType,
) {
  const user = await getAuthenticatedUser();

  await setDoc(getWatchlistDocument(user.uid, mediaId, mediaType), {
    media_id: mediaId,
    media_type: mediaType,
    created_at: serverTimestamp(),
  });
}

export async function removeMedia(
  mediaId: number,
  mediaType: WatchlistMediaType,
) {
  const user = await getAuthenticatedUser();

  await deleteDoc(getWatchlistDocument(user.uid, mediaId, mediaType));
}

export async function getWatchlistItems(): Promise<WatchlistItem[]> {
  const user = await getAuthenticatedUser();

  const snapshot = await getDocs(
    query(getWatchlistCollection(user.uid), orderBy("created_at", "desc")),
  );

  return snapshot.docs.map((document) => document.data() as WatchlistItem);
}
