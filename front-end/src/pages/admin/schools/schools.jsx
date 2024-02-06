import { Delete, Edit, People } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClassesApi } from "../../../api/classesApi";
import DataTable from "../../../components/datatable/datatable";
import style from "./schools.module.scss";
import { SchoolsApi } from "../../../api/schoolApi";
import { useTranslation } from "react-i18next";

const Schools = () => {
  const [data, setData] = useState([]);
  const {t} =useTranslation("translation",{keyPrefix : "schools"})

  useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    SchoolsApi.getSchools()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => toast.error(err));
  }

  function handleRemoveItem(id) {
    SchoolsApi.deleteSchool(id)
      .then((res) => {
        getAllData();
        toast.success("School deleted");
      })
      .catch((err) => toast.error(err));
  }

  const columns = [
    {
      header: t("name"),
      accessorKey: "name",
    },{
      header: t("address"),
      accessorKey: "address",
    },{
      header: t("tel"),
      accessorKey: "tel",
    },{
      header: t("email"),
      accessorKey: "email",
    },{
      header: t("manager"),
      accessorKey: "admin.fullName",
    },{
      header: t("actions"),
      enableSorting: false,
      accessorFn: (row) => (
        <>
          <IconButton onClick={() => handleRemoveItem(row._id)}>
            <Delete />
          </IconButton>
          <Link to={`/admin/schools/edit/${row._id}`}>
            <IconButton>
              <Edit />
            </IconButton>
          </Link>
        </>
      ),
      size: 150,
    },
  ];

  return (
    <div className={style.page}>
      <header className={style.header}>
        <h1>{t("title")}</h1>
        <Link to="/admin/schools/add">
          <Button variant="contained">{t("addBtn")}</Button>
        </Link>
      </header>

      <DataTable data={data} columns={columns} />
    </div>
  );
};

export default Schools;
