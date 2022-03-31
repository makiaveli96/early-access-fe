import { Notifier } from "../components/Notifier"

export const ErrorHandler = (err, navigate, setAuth) => {
    if(err.response){
        if(err?.response?.data.status == 403){
            Notifier('Session expired, log in again', 'warning')
            setTimeout(() => {
                setAuth(false)
                navigate('/')
                console.log('log out')
            }, 2000);
        }else{
            Notifier(err?.response?.data.message || 'Something went wrong, please try again.', 'error')
        }
    }
}