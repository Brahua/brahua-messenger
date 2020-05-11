import Swal from 'sweetalert2';

export class MessageUtil {
  public static loading() {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Cargando'
    });
    Swal.showLoading();
  }

  public static close() {
    Swal.close();
  }

  public static success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Operación completada',
      text: message,
    });
  }

  public static error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }
}
