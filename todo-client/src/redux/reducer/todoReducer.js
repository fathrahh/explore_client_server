import deepCopy from "../../utils/deepCopy";

const initialValue = {
  editId: null,
  todo: [],
  filter: "all",
};

export default function todoReducer(state = initialValue, action) {
  const onDelete = (id) => {
    const deepCopyState = deepCopy(state);
    return deepCopyState.todo.filter((todo) => todo.id !== id);
  };

  const onEdit = ({ id, ...restPayload }) => {
    const [key, value] = Object.entries(restPayload)[0];
    const deepCopyState = deepCopy(state);
    const targetEditIndex = state.todo.findIndex((todo) => todo.id === id);
    deepCopyState.todo[targetEditIndex][key] = value;
    return deepCopyState.todo;
  };

  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todo: [...state.todo, action.payload] };
    case "SET_EDIT":
      return { ...state, editId: action.payload };
    case "DELETE_TODO":
      return { ...state, todo: [...onDelete(action.payload)] };
    case "SUBMIT_EDIT":
      const { id, ...restPayload } = action.payload;
      return { ...state, todo: [...onEdit({ id, ...restPayload })] };
    case "FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}
