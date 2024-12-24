import Swal from 'sweetalert2'

export const useAlert = () => {
  const showSuccess = (message: string) => {
    return Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: message,
      confirmButtonColor: '#3B82F6',
    })
  }

  const showError = (message: string) => {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#3B82F6',
    })
  }

  const showConfirm = (message: string) => {
    return Swal.fire({
      icon: 'warning',
      title: 'Konfirmasi',
      text: message,
      showCancelButton: true,
      confirmButtonColor: '#3B82F6',
      cancelButtonColor: '#EF4444',
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    })
  }

  return {
    showSuccess,
    showError,
    showConfirm
  }
} 