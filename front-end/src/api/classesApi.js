import myAxios from "./api";

export const ClassesApi = {
    getClasses(){
        return myAxios.get("/class")
}}
