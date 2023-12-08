import myAxios from "./api";
export const teachersApi = {
  getTeacher() {
    return myAxios.get("/manageTeacher");
  },
  getTeacherById(id) {
    return myAxios.get(`/managerTeacher/${id}`);
  },

  addTeacher(body) {
    return myAxios.get("mangerTeacher", body);
  },

  deleteTeacher(id) {
    return myAxios.delete(`/managerTeacher/${id}`);
  },

  updateTEacher(id, body) {
    return myAxios.put(`/managerTeacher/${id}`, body);
  },
};
