import {
  filterMessages,
  getLastestDailyFetch,
  getSecondWeeklyFetch,
  getUserStats,
  multiplyByTwo,
} from "../src/utils";
import { expect, test } from "vitest";

test("Multiplications should work", () => {
  expect(multiplyByTwo(4)).toBe(8);
});

const messages = [
  {
    id: "1",
    message: "Hej!!",
    time: new Date(1722101712000),
    username: "Stig",
  },
  {
    id: "2",
    message: "Tjena!",
    time: new Date(1722101712000),
    username: "Tomas",
  },
  {
    id: "3",
    message: "Hur mår du?",
    time: new Date(1722101712000),
    username: "Stig",
  },
];

const fetches = [
  {
    id: "3",
    username: "Stig",
    type: "daily",
    time: new Date(1722101712000),
  },
  {
    id: "3",
    username: "Stig",
    type: "weekly",
    time: new Date(1722101713000),
  },
  {
    id: "3",
    username: "Stig",
    type: "weekly",
    time: new Date(1722201713000),
  },
  {
    id: "3",
    username: "Stig",
    type: "daily",
    time: new Date(1722106012000),
  },
];

const session = {
  user: "Stig",
  expires: 2722106012000,
};

test("Messages on cooldown should not have message", () => {
  expect(
    filterMessages(messages, session.user, new Date(1722101712000 + 3000000))[1]
  ).toEqual({
    id: "2",
    time: new Date(1722101712000),
    username: "Tomas",
    message: null,
  });
});

test("User should always see their own messages", () => {
  expect(
    filterMessages(messages, session.user, new Date(1722101712000 + 3000000))[2]
  ).toEqual({
    id: "3",
    message: "Hur mår du?",
    time: new Date(1722101712000),
    username: "Stig",
  });
});

test("Should be able to get latest daily fetch", () => {
  expect(getLastestDailyFetch(fetches, session)).toEqual(
    new Date(1722106012000)
  );
});

test("Should be able to get second latest weekly fetch", () => {
  expect(getSecondWeeklyFetch(fetches, session)).toEqual(
    new Date(1722101713000)
  );
});

test("Should return correct statistics", () => {
  expect(
    getUserStats(messages, "Stig", new Date(1722101712000 + 3600000), fetches)
  ).toEqual({
    username: "Stig",
    messages: 2,
    sentPerFetch: "0.50",
    newMessages: "0.25",
  });
});
