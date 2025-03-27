import axios from "axios"


//fn to get the all the dynamic activities
//according to the activity name

export const getDynamicActivities=async(activity_name)=>{
    try {

        
        const response=await axios.get(`/api/admin/getDynamicForms/${activity_name}`)

        console.log("Dynamic Forms:",response.data)

        return {forms:response.data.forms,status:response.status}
        
    } catch (error) {
        console.log("Error Getting Dynamic Activity:",error)
        return {forms:[],status:error.response?.status}
    }
}