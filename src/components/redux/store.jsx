import cartReducer from "./reducer";
import { createStore } from 'redux'

const store = createStore(cartReducer);

export default store;