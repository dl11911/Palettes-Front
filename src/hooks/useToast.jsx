import { useCallback } from 'react';
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    customClass: {
        container: 'toastContainer',
    }
})

const useToast = () => {
  const toastUp = useCallback((message) => {
    Toast.fire({
      icon: 'success',
      title: message,
      width: 450
    });
  }, []);

  return toastUp;
};

export default useToast;