import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
    const toastSuccess = (msg: string) => {
        toast.success(msg);
    }

    const toastError = (msg: string)=>{
        toast.error(msg);
    }

    const toastWarning = (msg: string)=>{
        toast.warning(msg);
    }

    return {
        toastSuccess,
        toastError,
        toastWarning,
    }
}
export default useToast;