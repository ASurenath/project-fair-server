const projects = require('../Models/projectModel')

exports.addProject = async (req, res) => {
    console.log("inside addProject API");

    console.log(req.body)
    console.log(req.payload);
    const { title, languages, overview, github, website } = req.body
    const projectImage = req.file.filename
    const userId = req.payload
    try {
        const existingProject = await projects.findOne({ github })
        console.log(existingProject)
        if (existingProject) {
            res.status(406).json("Repository aleady exists")
        }
        else {
            const newProject = new projects({
                title, languages, overview, github, website, projectImage, userId
            })
            await newProject.save()
            console.log(newProject);
            res.status(200).json(newProject)
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

///get home projects 

exports.getHomeProjects = async (req, res) => {
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

///get all projects 

exports.getAllProjects = async (req, res) => {
    const searchKey=req.query.search
    const query={
        languages:{
            $regex:searchKey,
            $options:"i"
        }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

///get dashboard projects 

exports.getUserProjects = async (req, res) => {
    const userId = req.payload
    try {
        const userProjects = await projects.find({ userId })
        res.status(200).json(userProjects)
    } catch (err) {
        res.status(401).json(err)
    }
}

exports.editProject = async (req, res) => {
    console.log("inside edit Project API");
    console.log(req.body)
    console.log(req.payload);
    const userId = req.payload
    const { pid } = req.params
    const { title, languages, overview, github, website, projectImage } = req.body
    const uploadImage = req.file ? req.file.filename : projectImage
    try {
        const updatedProject = await projects.findByIdAndUpdate({ _id: pid },
            { title, languages, overview, github, website, projectImage: uploadImage, userId },
            { new: true })
        console.log(updatedProject)
        res.status(200).json(updatedProject)
    }
    catch (err) {
        res.status(401).json(err)
    }
}

//remove project
exports.removeProject = async (req, res) => {
    console.log("inside Remove Project");
    const {pid} = req.params
    console.log("pid ", pid);
    try {
        const projectDetails = await projects.findByIdAndDelete({ _id:pid })
        res.status(200).json(projectDetails)
    }
    catch (err) {
        res.status(401).json(err)
    }
}