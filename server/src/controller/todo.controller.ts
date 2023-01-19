import { NextFunction, Request, Response, Router } from "express";
import { TodoInput } from "../model/todo.model";
import TodoService from "../service/todo.service";
import Controller from "../utils/interface/controller.interface";

class TodoController implements Controller {
  public path = "/todo";
  public route = Router();
  private todoService: TodoService;

  constructor() {
    this.todoService = new TodoService();

    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.route.get(`${this.path}`, this.getAllTodos);
    this.route.post(`${this.path}/create`, this.createTodos(this.todoService));
  }

  private getAllTodos = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const todos = await this.todoService.getAllTodo();
    res.status(200).send(todos);
  };

  // Option 1. dependecy injection
  // private getAllTodos(todoService: TodoService) {
  //   return async (req: Request, res: Response, next: NextFunction) => {
  //     const todos = await todoService.getAllTodo();
  //     res.status(200).send(todos);
  //   };
  // }

  private createTodos(todoService: TodoService) {
    return async (
      req: Request<{}, {}, TodoInput>,
      res: Response,
      next: NextFunction
    ) => {
      const { task } = req.body;
      const todos = await todoService.createTodo({
        task,
      });
      res.status(200).send(todos);
    };
  }
}

export default TodoController;
