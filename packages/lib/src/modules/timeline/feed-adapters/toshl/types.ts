import { ISO8601Date } from "../../../date";

type ToshlCurrency = {
  code: string;
};

// TODO according to the docs this should just be a string
// https://developer.toshl.com/docs/entries/list/
type ToshlTag = {
  name: string;
};

export type ToshlLocation = {
  id: string;
  latitude: number;
  longitude: number;
};

export type ToshlEntry = {
  amount: number;
  currency: ToshlCurrency;
  tags: ToshlTag[];
  desc: string;
  date: ISO8601Date;
  location: ToshlLocation;
};
