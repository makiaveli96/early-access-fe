import React, { useState, useContext } from 'react'
import Modal from "../Modal";
import { AuthContext } from '../../contexts/authContextApi';
import styles from './styles.module.css'
import Resizer from "react-image-file-resizer";
import { Icon } from "@iconify/react";
import Button from '../Button';
import { HiOutlineTrash } from 'react-icons/hi'
import { Notifier } from '../Notifier';
import { uploadProfileImage } from '../../components/api/routes'
import { ErrorHandler } from "../../helpers/Errorhandler";
import { useNavigate } from 'react-router-dom'
import { GeneralContext } from '../../contexts/generalContextApi';

function UploadImage({ modal, showModal }) {

  const navigate = useNavigate()
  const { showUploadImage }: any = useContext(GeneralContext)
  const { setAuth, userDetails, setUserDetails }:any = useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState<any | null>(null);
  const [imageName, setImageName] = useState('');
  const [loading, setLoading] = useState(false);

  function handleProfilePhoto(event: any) {
    // setProfilePhoto(event.target.files[0])
    // setIsImg(true)
    setImageName(event.target.files[0].name)
    if(event.target.files[0].size > 1000000){
      return Notifier('Image size should be less than 1mb', 'warning')
    }
    try{
      Resizer.imageFileResizer(
        event.target.files[0],
        270,170,"JPEG",80,0,
        (uri) => {
          setProfilePhoto(uri)
        },
        "base64",
        200,
        200
      );
    }catch(err){
      Notifier('Something went wrong, please try again', 'error')
    }
  }

  const uploadImage=async()=>{
    try{
      setLoading(true)
      const res = await uploadProfileImage(profilePhoto);
      if(res.status == 200){
        setLoading(false);
        setUserDetails(res.user)
        setProfilePhoto(null)
        setImageName('')
        Notifier(res.message, 'success');
      }else{
        setLoading(false)
        Notifier(res.message, 'error');
      }
    }catch(err){
      setLoading(false)
      ErrorHandler(err, navigate, setAuth)
    }
  }
  
  const deleteIcon=()=>{
    setProfilePhoto(null)
    setImageName('')
  }

  return (
    <Modal modal={modal} showModal={showModal} backdropClose>
      <main className={styles.container}>
        <div className={styles.header}>
          <span>Update profile photo</span>
          <span onClick={()=>showUploadImage(false)} style={{cursor: 'pointer'}}>
            <Icon icon="clarity:times-line" height={25} width={25} />
          </span>
        </div>
        <div className={styles.main}>
          {userDetails?.profilePhoto && (
            <img src={userDetails?.profilePhoto} style={{width: "80px", height: "80px", borderRadius: '50%'}} />
          )}
          <p>Upload an image from your computer to set it as your profile photo. </p>
          {profilePhoto? (
            <div className={styles.image_container}>
              <div className={styles.col1}>
                <img src="/icons/image_grid.png" />
                <img src={profilePhoto} height="90px" width="90px" style={{borderRadius: '5px', margin: '10px'}} />
                <p>{imageName.length > 15? imageName.substring(0,15)+"...":imageName}</p>
              </div>
              <span onClick={()=>deleteIcon()} style={{ cursor: 'pointer' }}>
                <HiOutlineTrash />
              </span>
            </div>
          ):(
            <label htmlFor="photo" className={styles.uploadBtn}> + Add media</label>
          )}
          <input
            style={{display: 'none'}}
            type="file"
            accept="image/png, image/jpeg, .gif"
            id="photo"
            onChange={(e) => handleProfilePhoto(e)}
          />
          <Button onClick={()=>uploadImage()} loading={loading} disabled={profilePhoto? loading : true} bgColor="#0099D6" width="80%" height='58px' text="Upload" />
        </div>
      </main>
    </Modal>
  )
}

export default UploadImage