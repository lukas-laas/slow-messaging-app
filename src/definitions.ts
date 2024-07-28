export type Fetch = {
  username: string;
  type: string;
  time: Date;
};

export type Message = {
  id: string;
  message: string;
  time: Date;
  username: string;
};

export type Session = {
  user: string;
  expires: number;
};
