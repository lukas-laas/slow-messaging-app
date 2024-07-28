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
    if (username == session.username) return message;
    if (timeNow.getTime() - time < 3600000) {
      console.log(timeNow.getTime(), time.getTime(), message.message);
      return { id: id, time: time, username: username };
    }
    return message;
  });
  return filtered;
};
