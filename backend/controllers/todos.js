import { v4 as uuid } from 'uuid';
import fs from 'fs';

// Get all todos - 
export const getTodos = (req, res) => {   
    const todos = JSON.parse(fs.readFileSync('todos.json','utf-8'));

    res.send(todos);
}

// Get todo by Id - 
export const getTodoById = (req, res) => {
    const todos = JSON.parse(fs.readFileSync('todos.json','utf-8'));
    const foundTodo = todos.find((todo) => todo.id === req.params.id);

    res.send(foundTodo);
};

// Create new todo - 
export const createTodo = (req, res) => {   
    const todo = req.body;
    const todos = JSON.parse(fs.readFileSync('todos.json','utf-8'));
    todos.push({...todo, id: uuid(), creationDate: Date.now()});    
    fs.writeFileSync('todos.json', JSON.stringify(todos));

    res.send(`Todo [${todo.task}] added to the database.`);
};

// Update Todo - 
export const updateTodo =  (req,res) => {

    const todos = JSON.parse(fs.readFileSync('todos.json','utf-8'));
    const todo = todos.find((todo) => todo.id === req.params.id);
    
    todo.task = req.body.task;
    todo.date = req.body.date;
    todo.isCompleted = req.body.isCompleted;

    fs.writeFileSync('todos.json', JSON.stringify(todos));

    res.send(`Todo Task has been updated to ${req.body.task} \n date has been updated to ${req.body.date}`);
};

// Delete Todo - 
export const deleteTodo = (req, res) => { 
    let todos = JSON.parse(fs.readFileSync('todos.json','utf-8'));
    todos = todos.filter((todo) => todo.id !== req.params.id);
    fs.writeFileSync('todos.json', JSON.stringify(todos));

    res.send(`todo with id ${req.params.id} has been deleted`);
};

// Delete All Todos - 
export const deleteAllTodos = (req, res) => { 
    const todos = [];
    fs.writeFileSync('todos.json', JSON.stringify(todos));

    res.send(`All todos has been deleted`);
};