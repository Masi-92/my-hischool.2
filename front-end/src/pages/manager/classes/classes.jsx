import { Delete, Edit, ChildFriendly, People } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClassesApi } from "../../../api/classesApi";
import DataTable from "../../../components/datatable/datatable";
import style from "./classes.module.scss";
import { useTranslation } from "react-i18next";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const { t } = useTranslation("translation", { keyPrefix: "classes" });

  useEffect(() => {
    getAllData();
  }, []);

  function getAllData() {
    ClassesApi.getClasses()
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => toast.error(err));
  }

  function handleRemoveItem(classId) {
    ClassesApi.deleteClass(classId)
      .then((res) => {
        getAllData();
        toast.success(t("messageDeleted"));
      })
      .catch((err) => toast.error(err));
  }

  const columns = [
    {
      header: t("name"),
      accessorKey: "name",
    },
    { header: t("teacher"), accessorKey: "teacher.fullName" },
    {
      header: t("actions"),
      enableSorting: false,
      accessorFn: (row) => (
        <>
          <IconButton onClick={() => handleRemoveItem(row._id)}>
            <Delete />
          </IconButton>
          <Link to={`/manager/classes/edit/${row._id}`}>
            <IconButton>
              <Edit />
            </IconButton>
          </Link>
          <Link
            to={`/manager/students?classId=${row._id}&className=${row.name}`}
          >
            <IconButton>
              <People />
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
        <Link to="/manager/classes/add">
          <Button variant="contained">{t("add")}</Button>
        </Link>
      </header>

      <DataTable data={classes} columns={columns} />
    </div>
  );
};

export default Classes;
