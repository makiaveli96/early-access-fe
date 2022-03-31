import React, { useState, useEffect, useContext } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContextApi';
import { VerifySession } from './api/routes';


export default function PrivateRoute({ page }: {page?: string}){
    const navigate = useNavigate();
    const [isTokenValidated, setIsTokenValidated] = useState(false);
    const { auth, setAuth, userDetails, setUserDetails }: any = useContext(AuthContext);

    async function verifySession(){
        let token = localStorage.getItem("_EA_TOKEN");
        if(token){
            const res = await VerifySession();
            console.log(res.status, ' refresh')
            if(res.status !== 200){
                console.log(res, ' er r fo protc')
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
        return <p>loading</p>
    }

    if(page == 'whitelist'){
        if(userDetails.isWhitelisted){
            return navigate('/home')
        }else{
            return navigate('/')
        }
    }
 
    return auth ? (
        <Outlet />
    ) : <Navigate to='/' />;
}