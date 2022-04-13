import React, { useContext, useEffect, useState } from "react";
import Modal from "../Modal";
import { AuthContext } from "../../contexts/authContextApi";
import { ToastContainer } from "react-toastify";
import { getReferrals } from '../../components/api/routes'
import styles from "./styles.module.css";
import { GeneralContext } from "../../contexts/generalContextApi";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "../../components/Button";
import { ErrorHandler } from "../../helpers/Errorhandler";
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from "date-fns";


function Referrals() {
  const navigate = useNavigate();
  const { auth, setAuth, userDetails, setUserDetails }: any =
    useContext(AuthContext);
  const { referrals, showReferrals, showNewReferral, GetReferrals, _referrals } = useContext(GeneralContext);
  // const [_referrals, _setRefferals] = useState<Array<ReferralI>>([])

  // async function GetReferrals(){
  //   try{
  //     const res = await getReferrals(userDetails?.email)
  //     if(res.status == 200){
  //       _setRefferals(res.data)
  //     }
  //   }catch(err){
  //     ErrorHandler(err, navigate, setAuth)
  //   }
  // }


  useEffect(()=>{
    GetReferrals(userDetails?.email, navigate, setAuth);
  },[])

  
  const [selectedAccount, setSelectedAccount] = useState("personal");
  const isProfileSet = true;

  const getStatusColor=(status: string)=>{
    switch(status){
        case 'pending':
            return { bgColor: '#FFFBEB', color: '#F59E0B' }
        case 'rejected':
            return { bgColor: '#FEF2F2', color: '#DC2626' };
        case 'paid':
            return { bgColor: '#F0FDF4', color: '#16A34A' } 
    }
  }

  const columns: GridColDef[] = [
    { field: "receiverName", sortable: false, headerName: "Name", width: 220, 
    renderCell: (params) => (
      <span>
        <p style={{textTransform: 'capitalize', margin: 0, color: '#57584E'}}>{params.row.receiverName}</p>
        <p style={{margin: 0, color: '#94A3B8', fontSize: '12px'}}>{format(parseISO(params.row.time), "LLL, dd, yyyy")}</p>
      </span>
    ) },
    { field: "receiverEmail", sortable: false, headerName: "Email", width: 160, 
      renderCell: (params) => (
        <p style={{color: '#57584E'}}>{params.row.receiverEmail}</p>
      )  
    },
    { field: "receiverType", headerName: "Class", sortable: false, width: 160,
      renderCell: (params) => <span style={{ color: params.row.receiverType == 'nil'? 'lightgrey' : 'black' }}>{params.row.receiverType}</span>
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 160,
      renderCell: (params) => <span style={{ color: getStatusColor(params.row.status)?.color }}>{params.row.status}</span>,
    },
  ];

  const rows = [
    { id: 1, name: 'Makinde timilehin', email: "makindetimi@gmail.com", class: "private", status: 'pending' },
    { id:2, name: 'Femi toscar', email: "oscar@gmail.com", class: "Business", status: 'pending' },
  ];



  return (
    <>
      
      <Modal modal={referrals} showModal={showReferrals} backdropClose>
        <main className={styles.container}>
          <div className={styles.header}>
            <h2>Your Referrals</h2>
          </div>
          <div className={styles.main}>
            <DataGrid
              getRowId={(row) => row._id} 
              rows={_referrals}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection={false}
            />
          </div>
          <div className={styles.footer}>
            <Button
              onClick={()=>{showReferrals(false); showNewReferral(true);}}
              text="New Referral"
              bgColor="#0099D6"
              height="36px"
              width="124px"
            />
          </div>
        </main>
      </Modal>
    </>
  );
}

export default Referrals;
