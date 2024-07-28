import { Fetch, Message, Session } from "./definitions";

export const multiplyByTwo = (num: number) => {
  const multiplied = num * 2;
  return multiplied;
};

export const filterMessages = (
  messages: Message[],
  user: string,
  timeNow: Date
) => {
  const filtered: Message[] = [];

  messages.forEach((message) => {
    const { id, time, username } = message;
    if (username == user) return filtered.push(message);
    if (timeNow.getTime() < time.getTime()) return;
    if (timeNow.getTime() - time.getTime() < 3600000) {
      return filtered.push({ id: id, time: time, username: username });
    }
    return filtered.push(message);
  });
  console.log(filtered[1]);
  return filtered;
};

export const getLastestFetch = (fetches: Fetch[], user: string) => {
  const userFetches = fetches.filter((fetch) => fetch.username == user);

  const lastFetch = userFetches.length
    ? userFetches.reduce((a, b) =>
        a.time.getTime() > b.time.getTime() ? a : b
      ).time
    : new Date(0);
  return lastFetch;
};

export const getLastestDailyFetch = (fetches: Fetch[], session: Session) => {
  const userFetches = fetches.filter(
    (fetch) => fetch.username == session.user && fetch.type == "daily"
  );

  const lastDailyFetch = userFetches.length
    ? userFetches.reduce((a, b) =>
        a.time.getTime() > b.time.getTime() ? a : b
      ).time
    : new Date(0);
  return lastDailyFetch;
};

export const getSecondWeeklyFetch = (fetches: Fetch[], session: Session) => {
  const userFetches = fetches
    .filter((fetch) => fetch.username == session.user && fetch.type == "weekly")
    .sort((a, b) => a.time.getTime() - b.time.getTime());

  if (userFetches.length < 2) return new Date(0);

  const secondWeeklyFetch = userFetches[userFetches.length - 2];

  return secondWeeklyFetch.time;
};
