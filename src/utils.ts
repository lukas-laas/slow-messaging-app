export const multiplyByTwo = (num: number) => {
  const multiplied = num * 2;
  return multiplied;
};

export const filterMessages = (
  messages: any[],
  session: any,
  timeNow: Date
) => {
  const filtered = messages.map((message) => {
    const { id, time, username } = message;
    if (username == session.user) return message;
    if (timeNow.getTime() < time) return;
    if (timeNow.getTime() - time < 3600000) {
      return { id: id, time: time, username: username };
    }
    return message;
  });
  return filtered;
};

export const getLastestFetch = (fetches, session) => {
  const userFetches = fetches.filter((fetch) => fetch.username == session.user);

  const lastFetch = userFetches.length
    ? userFetches.reduce((a, b) =>
        a.time.getTime() > b.time.getTime() ? a : b
      ).time
    : new Date(0);
  return lastFetch;
};
