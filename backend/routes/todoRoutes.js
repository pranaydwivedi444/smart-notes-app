const {Router} = require('express');
const authenticateMiddleware = require('../middlewares/authMiddleware');
const { createNewTodo, getselectedId, getAllTodos, updateTodo, removeTodo, clearAllTodos } = require('../controller/todoController');
const router = Router();

router.use(authenticateMiddleware);
// / get all to dos
router.get('/todos',getAllTodos);
  

//get via Id
router.get('/:id', getselectedId);
//post create  todo
router.post('/', createNewTodo);
//todo:id update
router.put('/:id', updateTodo);
//delte todo :id
router.delete('/:id', removeTodo);
//clear all todos
router.delete('/all',clearAllTodos);