import { Avatar, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "./modalAgreement.module.scss";
import { EventAgreementApi } from "../../../../api/eventAgreementApi";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import DataTable from "../../../../components/datatable/datatable";
import { AccountCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Roles } from "../../../../store/slice/auth.slice";
import { useTranslation } from "react-i18next";

const ModalAgreement = ({ open, onClose, eventId }) => {
  const [agreements, setAgreements] = useState([]);
  const { role } = useSelector((store) => store.auth);
  const { t } = useTranslation("translation", { keyPrefix: "modalAgreement" });

  useEffect(() => {
    if (eventId) {
      EventAgreementApi.getUserAgreements(eventId)
        .then((res) => {
          setAgreements(res.data);
        })
        .catch((err) => toast.error(err));
    }
  }, [eventId]);

  const columns = [
    {
      header: t("userImage"),
      accessorFn: (row) => {
        return row.image ? (
          <img src={row.user.image} className={style.avatar} alt="" />
        ) : (
          <AccountCircle className={style.avatar}></AccountCircle>
        );
      },
      width : 100
    },
    {
      header: t("user"),
      accessorKey: "user.fullName",
    },
    {
      header: t("class"),
      accessorKey: "user.class.name",
    },
    {
      header: t("date"),
      accessorFn: (row) => dayjs(row.createdAt).format("D MMM"),
    },
  ];

  if (role === Roles.TEACHER) columns.splice(2, 1);

  return (
    <Modal open={open} onClose={onClose}>
      <div className={style.modal}>
        <h3>{t("title")}</h3>
        <div>
          <DataTable data={agreements} columns={columns}></DataTable>
        </div>
      </div>
    </Modal>
  );
};

export default ModalAgreement;
