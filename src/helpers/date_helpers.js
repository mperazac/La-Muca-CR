const nombresDias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const getSpanishDate = (date) => {
  const fecha = new Date(date);
  const diaMes = fecha.getDate();
  const diaSemana = fecha.getDay();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  return `${nombresDias[diaSemana]} ${diaMes} de ${nombresMeses[mes - 1]} de ${anio}`;
};

export const getEventTime = (date) => {
  if (!date) return '';
  const fechaHora = new Date(date.substr(0, date.length - 5));
  let horas = fechaHora.getHours();
  let minutos = fechaHora.getMinutes();
  let sufijo = 'AM';

  if (horas > 12) {
    horas -= 12;
    sufijo = 'PM';
  }

  if (horas < 10) {
    horas = `0${horas}`;
  }
  if (minutos < 10) {
    minutos = `0${minutos}`;
  }
  return `${horas}:${minutos} ${sufijo}`;
};

export const getMonth = (date) => {
  if (!date) return 0;
  const month = new Date(date.substr(0, date.length - 5)).getMonth();
  return nombresMeses[month];
};

export const getDay = (date) => {
  if (!date) return 0;
  const date2 = new Date(date.substr(0, date.length - 5));
  return date2.getDate();
};

export const getWeekDay = (date) => {
  if (!date) return 0;
  const date2 = new Date(date.substr(0, date.length - 5));
  return nombresDias[date2.getDay()];
};
