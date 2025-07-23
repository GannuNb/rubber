// utils/showSuccessModal.js
import Swal from 'sweetalert2';
import logo from './images/lavalogo.png'; // adjust path as needed

export const showCompactLoginSuccess = (userName = 'User', message = 'Login successful!') => {
  Swal.fire({
    title: `<span class="swal-title"> ${userName}!</span>`,
    imageUrl: logo,
    imageWidth: '50%',
    imageAlt: 'Lava Rubber Logo',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    customClass: {
      popup: 'swal-logo-only',
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
  });
};
