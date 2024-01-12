
import { createStore, applyMiddleware, combineReducers } from 'redux';
import customizationReducer from './customizationReducer';
import thunkMiddleware from 'redux-thunk';
import AuthReducer from "./reducer/AuthReducer";
import UserReducer from "./reducer/userReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import LoaderReducer from './reducer/loader';
import SearchReducer from './reducer/searchReducer'
import FavoriteReducer from './reducer/FavoriteReducer'
import BalanceReducer from './reducer/BalanceReducer'
import BoughtReducer from './reducer/BoughtReducer'
import StatisticsReducer from './reducer/StatisticsReducer'
import WordReducer from './reducer/WordReducer'
import PresentationReducer from './reducer/PresentationReducer'
import FileReducer from './reducer/FileReducer';
import BoardReducer from './reducer/BoardReducer';
import ChatReducer from './reducer/ChatReducer';
import NoteReducer from './reducer/NoteReducer';




// const ENVIROMENT = 'DEV';

const rootReducer = combineReducers({
  customization: customizationReducer,
  auth: AuthReducer,
  UserReducer,
  LoaderReducer,
  SearchReducer,
  FavoriteReducer,
  BalanceReducer,
  BoughtReducer,
  StatisticsReducer,
  WordReducer,
  PresentationReducer,
  FileReducer,
  NoteReducer,
  BoardReducer,
  ChatReducer
})

const middleware = [thunkMiddleware];

const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
    // ENVIROMENT === "DEV" ? composeWithDevTools(applyMiddleware(...middleware)) : applyMiddleware(...middleware)
);

export default Store;