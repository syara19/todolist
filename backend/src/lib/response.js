
const successResponse = ({message,data})=>{
    
    if(data){
        return{
            succes:true,
            message,
            data
        }
    }
    return{
        succes:true,
        message
    }
}


module.exports = {successResponse}