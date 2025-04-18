import DoctorModel from "../models/doctorModel.js";

const changeAvailability = async (req,res) =>{
    try {
         const {docId} = req.body

         const docData = await DoctorModel.findById(docId)
          await DoctorModel.findByIdAndUpdate(docId,{available:!docData.available})
          res.json({success:true,message:'Availability changed'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const doctorslist = async(req,res) =>{
    try {
        const doctors = await DoctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
export {changeAvailability,doctorslist}