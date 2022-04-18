import { Notifier } from "../components/Notifier"

export const ErrorHandler = (err: any, navigate: any, setAuth: any, showCreatePass?: any) => {
    if(err.response){
        if(err?.response?.data.status == 403){
            Notifier('Session expired, log in again', 'warning')
            setTimeout(() => {
                setAuth(false)
                navigate('/')
            }, 2000);
        }else{
            if(err?.response?.data?.APP_ERR == 'CREATE_PASSWORD'){
                return showCreatePass(true)
            }
            Notifier(err?.response?.data.message || 'Something went wrong, please try again.', 'error')
        }
    }
}