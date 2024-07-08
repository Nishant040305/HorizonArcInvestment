import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userSlice from './Store/UserAuthSlice';
import urlSlice from './Constants/urls';
import BuyStockSlice from './Store/BuyStockSlice';
import BuyDataSlice from './Store/BuyDataSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { persistStore } from 'redux-persist';


const rootReducer = combineReducers({
  user:userSlice,
  url:urlSlice,
  land:BuyStockSlice,
  buyData:BuyDataSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);