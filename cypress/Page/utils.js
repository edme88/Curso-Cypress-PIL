class Utils {
  /**
   * @method getCompleteDate
   * @returns {Array} [Dia, Mes, Año] - Ejemplo [2, "Agosto", 2023]
   */
  getCompleteDate = () => {
    const nombresMeses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();
    const anioActual = fechaActual.getFullYear();
    const nombreMesActual = nombresMeses[mesActual];
    const diaActual = fechaActual.getDate();

    cy.log(nombreMesActual); // Por ejemplo, "Agosto"
    cy.log(anioActual); // Por ejemplo, "2023"
    cy.log(diaActual); // Por ejemplo, "4"
    return [diaActual, nombreMesActual, anioActual];
  };
}

export default new Utils();
