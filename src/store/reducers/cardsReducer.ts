import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CardType } from '../../api/cards';

const initialState = {
  cards: [] as CardType[],
  pickedCard: {
    id: 0,
    title: 'British Council',
    imageUrl: '/images/resources-default.png',
    description: `The British Council is the United Kingdom's international organization for cultural relations and educational opportunities.`,
    href: 'https://learnenglish.britishcouncil.org/',
  } as CardType, 
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialState,
  reducers: {
    setCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload;
    },
    addCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards.push(...action.payload);
    },
    addPickedCard: (state, action: PayloadAction<CardType>) => {
      state.pickedCard = action.payload;
    },
  },
});

export default cardsSlice.reducer;
export const { actions } = cardsSlice;
