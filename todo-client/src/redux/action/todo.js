import {
  FILTER,
  ADD_TODO,
  DELETE_TODO,
  SUBMIT_EDIT,
  SET_EDIT,
} from "../../constant/action";

export const setFilter = (payload) => {
  return { type: FILTER, payload };
};

export const addTodo = (payload) => {
  return { type: ADD_TODO, payload };
};

export const actionDeleteTodo = (payload) => {
  return { type: DELETE_TODO, payload };
};

export const actionEditTodo = (payload) => {
  return { type: SUBMIT_EDIT, payload };
};

export const actionSetEdit = (payload) => {
  return { type: SET_EDIT, payload };
};
