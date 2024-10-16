import handleError from "../errors/handle.error.js"
import courseModel from "../model/course.model.js"


export const getCourse =  async(req, res)=>{
    try{
        const getCourse = await courseModel.find();
        if(getCourse){
            return handleError(res, 200, getCourse)
        }else{
            return handleError(res, 400, "course not found")
        }
    }catch(e){
        handleError(res, 500, e.message)
    }
}

export const getCourseByFaculty =  async(req, res)=>{
    const id =  req.params.id;
    try{
        const getCourseByFaculty = await courseModel.find({courseId:id});
        if(getCourseByFaculty){
            return handleError(res, 200, getCourseByFaculty)
        }else{
            return handleError(res, 400, "course not found")
        }
    }catch(e){
        handleError(res, 500, e.message)
    }
}
