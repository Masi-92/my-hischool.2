import myAxios from "./api";

export const SchoolsApi = {
  getSchools() {
    return myAxios.get("/school");
  },
  getSchoolById(id) {
    return myAxios.get(`/school/${id}`);
  },
  getMySchool() {
    return myAxios.get(`/school/my`);
  },
  addSchool(body) {
    return myAxios.post("/school", body);
  },
  deleteSchool(id) {
    return myAxios.delete(`/school/${id}`);
  },
  updateSchool(id, body) {
    return myAxios.put(`/school/${id}`, body);
  },
};
