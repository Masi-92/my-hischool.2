import myAxios from "./api";
//get 
export const ClassesApi = {
    getClasses(){
        return myAxios.get("/class")
},

//byId

getClassById(id){
    return myAxios.get(`/class/${id}`)
},

addClass(body){

    return myAxios.post("/class",body)
},

deleteClass(id){
    return myAxios.delete(`/class/${id}`)
},

updateClass(id,body){
    return myAxios.put(`/class/${id}`,body)
},


}

