const Todos =  require('../models/Todo');
async function getAllTodos(req,res,next){
    const username = req.username;
    //getting the username and its tasks
    const listOfTodosByUser  = await Todos.find({
        username,
    })

    if(listOfTodosByUser.length){
        res.json({
            success : true,
            data : listOfTodosByUser,
        })
    }
}

async function createNewTodo(req,res,next){
    const {title, tasks} = req.body;
    const newTodo = await Todos.create({
        title,
        tasks,
        username: req.username,
    });

    res.status(201).json({ message: 'Todo created successfully', todoId: newTodo._id });

}


async function getselectedId(req,res,next){
    const todoId = req.body.id;
    const result  =  await Todos.findById(todoId);
    if(!result){
        res.status(400).json({
            success:false,
            message : 'not found',
        })
    }
    else {
        res.status(200).json({
            success:true,
            data : result,
        })
    }
    
}

//udate whole todo , replace the tasks with new tasks
async function updateTodo(req,res,next){
    const todoId = req.params.id || req.body.id;
    const newTasksArray = req.body.tasks;

    await Todos.updateOne(
        { _id: todoId },
        { $set: { tasks: newTasksArray } }
    );
    res.json({ success: true, message: 'Tasks list updated successfully' });
}

async function removeTodo(req,res,next){
    const todoId = req.params.id;
    const result = await Todos.findByIdAndDelete(todoId);
    if(result){
        res.json({ success: true, message: 'Todo Deleted successfully' });
    }
    else {
        res.status(400).json({
            success:false,
            message : 'not found',
        })
    }
}

async function clearAllTodos(req,res,next){
    const username = req.username;
    await Todos.deleteMany({username});
    res.json({
        success: true,
        message: 'All todos cleared'
    });

}

module.exports = {
    getAllTodos,
    getselectedId,
    updateTodo,
    removeTodo,
    clearAllTodos,
    createNewTodo
}