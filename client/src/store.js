import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userSlice from './Store/UserAuthSlice';
import urlSlice from './Constants/urls';
import BuyStockSlice from './Store/BuyStockSlice';
import BuyDataSlice from './Store/BuyDataSlice';
import DashBoardOptionsSlice from './Store/DashBoardOptionsSlice';
import loginSeenSlice from './Store/LoginSeenSlice';
import globalUserSlice from './Store/globalUser';
import ShortListSlice from './Store/ShortListSlice';
import NotificationSlice from './Store/NotificationSlice';
import FilterDataSlice from './Store/FilterDataSlice';
import MessageSlice from './Store/MessageSlice';
import IsAdminSlice from './Store/IsAdminSlice';
import ArticleSlice from './Store/ArticleSlice';
const rootReducer = combineReducers({
  user:userSlice,
  url:urlSlice,
  stock:BuyStockSlice,
  buyData:BuyDataSlice,
  dashboard:DashBoardOptionsSlice,
  loginSeen:loginSeenSlice,
  globalUsers:globalUserSlice,
  shortList:ShortListSlice,
  notification:NotificationSlice,
  filter:FilterDataSlice,
  message:MessageSlice,
  admin:IsAdminSlice,
  article:ArticleSlice,
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
  shortList:ShortListSlice,
  notification:NotificationSlice,
  filter:FilterDataSlice,
  message:MessageSlice,
  admin:IsAdminSlice,
  article:ArticleSlice,

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
