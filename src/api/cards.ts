import { instance } from './instance';

export type CardTypes = 'grammar' | 'video' | 'resources';

export interface CardType {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  href: string;
  type: CardTypes;
}

export interface AnkiCard {
  id: number;
  imageUrl: string;
  front: string;
  back: string;
}

export interface CardArticleType extends CardType {
  videoUrl: string;
  ankiCards: AnkiCard[];
}

export interface GrammarType extends CardType {
  videoUrl: string;
  mainSubTitle: string;
  secondTitle: string;
  thirdTitle: string;
  thirdSubTitle: string;
  fourthTitle: string;
  fourthSubTitle: string;
  underTitleList: string[];
}

export interface SearchCardType {
  id: number;
  title: string;
  imageUrl: string;
  type: CardTypes;
  description: string;
  href: string;
}

export const getCards = (type: CardTypes, page?: number, size?: number) => {
  return instance.get<CardType[]>(type.toLowerCase() + `?page=${page}` + '&' + `size=${size}`);
};

export const getCard = (type: CardTypes, id: number) => {
  return instance.get<CardType>(`${type.toLowerCase()}/${id}`);
};

export const searchCards = (title: string) => {
  return instance.get<SearchCardType[]>(`search?title=${title}&size=3`);
};

export const postAnkiCard = (id: number) => {
  return instance.post(`anki/${id}`);
};