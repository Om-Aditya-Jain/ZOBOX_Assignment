import express from 'express';

import { getTodos, createTodo, getTodoById, deleteTodo, updateTodo, deleteAllTodos } from '../controllers/todos.js';

const router = express.Router();

router.get('/', getTodos);

router.get('/:id', getTodoById);

router.post('/', createTodo);

router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo);

router.delete('/', deleteAllTodos);

export default router;