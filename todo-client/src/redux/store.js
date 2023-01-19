import { createStore } from "redux";
import todoReducer from "./reducer/todoReducer";

export const store = createStore(todoReducer);
