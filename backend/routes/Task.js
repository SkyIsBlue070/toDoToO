const router = require("express").Router();
const task= require("../models/Task");
const user = require("../models/User");
const authenticateToken = require("./Auth");

//create Task :
router.post("/create-task",authenticateToken, async(req,res)=>{
    try {
        const {title,desc}=req.body;
        const {id}= req.headers;

        const newTask = new task({title: title, desc: desc});
        const saveTask = await newTask.save();
        const taskId= saveTask._id;
        await user.findByIdAndUpdate(id, {$push: {tasks: taskId._id}});
        res.status(200).json({ message: "New Task Created!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
})


//Get All Tasks
router.get("/get-all-tasks",authenticateToken,async(req,res)=>{
    try {
        const {id}= req.headers;
        //here we will use the timestamps to sort the TASKS in descending order and then print them:
        const userData = await user.findById(id).populate({
            path :"tasks",
            options : {sort : {createdAt: -1}},
        });
        res.status(200).json({ data : userData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//Delete Tasks:
router.delete("/delete-task/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}= req.params;
        const userId= req.headers.id;
        //Deleting Task from User's Docs
        await task.findByIdAndDelete(id);
        //Deleting Task from Task Array
        await user.findByIdAndUpdate(userId,{$pull:{tasks : id}});
        res.status(200).json({ message : "Task deleted!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//Update Task:
//1- Updating Title and Desc 
router.put("/update-task/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}= req.params;
        const {title,desc}= req.body;
        await task.findByIdAndUpdate(id,{title: title, desc: desc});
        res.status(200).json({ message : "Task Updated Successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//Updating if a task is Important 
router.put("/update-imp-task/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}= req.params;
        const taskData = await task.findById(id);
        const impTask = taskData.important;
        await task.findByIdAndUpdate(id,{important: !impTask });
        res.status(200).json({ message : "Task Updated Successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//Updating if a task has been Completed 
router.put("/update-complete-task/:id",authenticateToken,async(req,res)=>{
    try {
        const {id}= req.params;
        const taskData = await task.findById(id);
        const compTask = taskData.complete;
        await task.findByIdAndUpdate(id,{complete: !compTask });
        res.status(200).json({ message : "Task Updated Successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//Get important Task :
router.get("/get-important-tasks",authenticateToken,async(req,res)=>{
    try {
        const {id}= req.headers;
        //here we will use the timestamps to sort the TASKS in descending order and then print them:
        const data = await user.findById(id).populate({
            path :"tasks",
            match: {important:true},
            options : {sort : {createdAt: -1}},
        });
        const impTaskData= data.tasks;
        res.status(200).json({ data : impTaskData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//Get completed Tasks :
router.get("/get-complete-tasks",authenticateToken,async(req,res)=>{
    try {
        const {id}= req.headers;
        //here we will use the timestamps to sort the TASKS in descending order and then print them:
        const data = await user.findById(id).populate({
            path :"tasks",
            match: {complete:true},
            options : {sort : {createdAt: -1}},
        });
        const comTaskData= data.tasks;
        res.status(200).json({ data : comTaskData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

//Get Incomplete Tasks :
router.get("/get-incomplete-tasks",authenticateToken,async(req,res)=>{
    try {
        const {id}= req.headers;
        //here we will use the timestamps to sort the TASKS in descending order and then print them:
        const data = await user.findById(id).populate({
            path :"tasks",
            match: {complete:false},
            options : {sort : {createdAt: -1}},
        });
        const incomTaskData= data.tasks;
        res.status(200).json({ data : incomTaskData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
});

module.exports = router;




// {
//     "title": "MERN",
//     "desc": "This is MERN dev"
//   }