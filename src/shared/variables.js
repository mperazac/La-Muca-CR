export const FacebookAppId = '726716517346478';

export const showSpanishDate = (date) => {
  const nombres_dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const nombres_meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const fecha_actual = new Date(date);

  const dia_mes = fecha_actual.getDate(); //dia del mes
  const dia_semana = fecha_actual.getDay(); //dia de la semana
  const mes = fecha_actual.getMonth() + 1;
  const anio = fecha_actual.getFullYear();

  let fechaHora = new Date(date);
  let horas = fechaHora.getHours();
  let minutos = fechaHora.getMinutes();
  let segundos = fechaHora.getSeconds();
  let sufijo = 'AM';

  if (horas > 12) {
    horas = horas - 12;
    sufijo = 'PM';
  }

  if (horas < 10) {
    horas = '0' + horas;
  }
  if (minutos < 10) {
    minutos = '0' + minutos;
  }
  if (segundos < 10) {
    segundos = '0' + segundos;
  }
  return nombres_dias[dia_semana] + ' ' + dia_mes + ' de ' + nombres_meses[mes - 1] + ' de ' + anio + ', '+ horas + ':'+minutos + ' ' + sufijo
}