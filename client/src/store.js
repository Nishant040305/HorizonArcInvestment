import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userSlice from './Store/UserAuthSlice';
import urlSlice from './Constants/urls';
import BuyStockSlice from './Store/BuyStockSlice';
import BuyDataSlice from './Store/BuyDataSlice';
import DashBoardOptionsSlice from './Store/DashBoardOptionsSlice';
import loginSeenSlice from './Store/LoginSeenSlice';
import globalUserSlice from './Store/globalUser';
import GeolocationSlice from './Store/GeolocationSlice';
import ShortListSlice from './Store/ShortListSlice';
import NotificationSlice from './Store/NotificationSlice';
const rootReducer = combineReducers({
  user:userSlice,
  url:urlSlice,
  stock:BuyStockSlice,
  buyData:BuyDataSlice,
  dashboard:DashBoardOptionsSlice,
  loginSeen:loginSeenSlice,
  globalUsers:globalUserSlice,
  geoLocation:GeolocationSlice,
  shortList:ShortListSlice,
  notification:NotificationSlice,
});
export const store = configureStore({
  reducer:{
    user:userSlice,
  url:urlSlice,
  stock:BuyStockSlice,
  buyData:BuyDataSlice,
  dashboard:DashBoardOptionsSlice,
  loginSeen:loginSeenSlice,
  globalUsers:globalUserSlice,
  geoLocation:GeolocationSlice,
  shortList:ShortListSlice,
  notification:NotificationSlice,
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
