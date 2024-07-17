import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userSlice from './Store/UserAuthSlice';
import urlSlice from './Constants/urls';
import BuyStockSlice from './Store/BuyStockSlice';
import BuyDataSlice from './Store/BuyDataSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { persistStore } from 'redux-persist';
import DashBoardOptionsSlice from './Store/DashBoardOptionsSlice';

import loginSeenSlice from './Store/LoginSeenSlice';

const rootReducer = combineReducers({
  user:userSlice,
  url:urlSlice,
  land:BuyStockSlice,
  buyData:BuyDataSlice,
  dashboard:DashBoardOptionsSlice,
  loginSeen:loginSeenSlice
});
export const store = configureStore({
  reducer:{
    user:userSlice,
  url:urlSlice,
  land:BuyStockSlice,
  buyData:BuyDataSlice,
  dashboard:DashBoardOptionsSlice,
  loginSeen:loginSeenSlice,
  }
})

// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1,
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({ serializableCheck: false }),
// });

// export const persistor = persistStore(store);
