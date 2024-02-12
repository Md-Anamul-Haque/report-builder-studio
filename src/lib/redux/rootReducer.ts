/* Instruments */
import { counterSlice, staticPageSlice } from './slices';

export const reducer = {
    counter: counterSlice.reducer,
    staticPage:staticPageSlice.reducer,
};