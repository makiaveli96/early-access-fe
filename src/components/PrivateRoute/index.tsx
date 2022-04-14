import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContextApi';
import { VerifySession } from '../api/routes';
import styles from './styles.module.css'

export default function PrivateRoute({ page } : { page?: string }){
    const navigate = useNavigate();
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);

    async function verifySession(){
        try{
            let token = localStorage.getItem("_EA_TOKEN");
            if(token){
                const res = await VerifySession();
                if(res.status !== 200){
                    navigate('/')
                }else{
                    setAuth(true)
                    setUserDetails(res.user)
                    setIsTokenValidated(true)
                }
            }else{
                setAuth(false)
                setIsTokenValidated(true); // in case there is no token
            }
        }catch(err){
            navigate('/');
            setAuth(false)
            setIsTokenValidated(true); // in case there is no token
            if(err?.response){
                if(err?.response?.data?.status ==  403){
                    navigate('/');
                    setAuth(false)
                }
            }
        }
    }

    useEffect(()=>{
        if(auth){
            // return <Outlet />
        }
    },[auth])

    useEffect(()=>{
        verifySession()
    },[])

    if(!isTokenValidated){
        return (
            <div className={styles.container}>
                <span className={styles.loader}></span>
            </div>
        )
    }

    // user can't access whitelist page after successful whitelist
    if(page == 'whitelist'){
        if(userDetails.isWhitelisted){
            return <Navigate to="/home" /> 
        }
    }

 
    return auth ? <Outlet /> : <Navigate to='/' />;
}