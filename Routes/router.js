const express=require('express')
const userController=require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')
const router=new express.Router()

//register API
router.post('/register',userController.register)
//login API
router.post('/login',userController.login)
//add project API
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)
//get home projects
router.get('/home-projects',projectController.getHomeProjects)
//get all projects
router.get('/all-projects',jwtMiddleware, projectController.getAllProjects)
//get user projects
router.get('/user-projects',jwtMiddleware, projectController.getUserProjects)
// edit profile
router.put('/user/edit',jwtMiddleware,multerConfig.single('profileImage'), userController.editUser)
//update project
router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single('projectImage'), projectController.editProject)
//delete project
router.delete('/project/delete/:pid',jwtMiddleware, projectController.removeProject)

module.exports=router