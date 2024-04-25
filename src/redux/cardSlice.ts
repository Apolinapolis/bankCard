import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CardState {
    number: string;
    name: string;
    expiry: string;
    cvc: string;
}

const initialState: CardState = {
    number: '',
    name: '',
    expiry: '',
    cvc: '',
};

const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCardNumber: (state, action: PayloadAction<string>) => {
            state.number = action.payload;
        },
        setCardName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setCardExpiry: (state, action: PayloadAction<string>) => {
            state.expiry = action.payload;
        },
        setCVC: (state, action: PayloadAction<string>) => {
            state.cvc = action.payload;
        },
    },
});

export const { setCardNumber, setCardName, setCardExpiry, setCVC } = cardSlice.actions;
export default cardSlice.reducer;

