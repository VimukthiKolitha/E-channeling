import {v2 as cloudinary} from 'cloudinary'

const connectCloudinry = async () =>{

    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECREATE_KEY
    })
}
export default connectCloudinry