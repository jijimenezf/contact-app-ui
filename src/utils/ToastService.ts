import { toast, type ToastOptions } from "react-toastify";

const toastConfig: ToastOptions = {
    //position: toast.POSITION.TOP_RIGHT,
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"
};

export function toastInfo(message: string) {
    toast.info(message, toastConfig);
}

export function toastSuccess(message: string) {
    toast.success(message, toastConfig);
}

export function toastWarning(message: string) {
    toast.warn(message, toastConfig);
}

export function toastError(message: string) {
    toast.error(message, toastConfig);
}
