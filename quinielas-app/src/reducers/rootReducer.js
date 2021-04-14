import { combineReducers } from "redux";
import { authReducer } from "../Auth/AuthReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
});
