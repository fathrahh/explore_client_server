import { TodoInput, TodoOutput } from "./../model/todo.model";
import { TodoModel as Todo } from "../model";

class TodoService {
  constructor() {}

  public async getAllTodo(): Promise<TodoOutput[]> {
    const todos = await Todo.findAll();
    return todos;
  }

  public async createTodo(payload: TodoInput) {
    const createTodo = await Todo.create(payload);
    return createTodo;
  }

  public async updateTodo(payload: TodoInput) {
    const updateTodo = await Todo.update(payload, {
      where: {
        id: {
          equals: payload.id,
        },
      },
    });

    return updateTodo;
  }

  public async deleteTodoById(id: string): Promise<number> {
    const deleteTodo = await Todo.destroy({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return deleteTodo;
  }
}

export default TodoService;
