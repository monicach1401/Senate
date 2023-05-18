

function fetchJson(file) {
  return fetch(file).then(response=>response.json());
}

// Función para generar las filas de miembros basadas en los datos JSON recibidos
function makeMemberRows(datos){
// console.log('primera fila','name:',datos.results[0].members[0].last_name,'party:',datos.results[0].members[0].party,'State:',datos.results[0].members[0].state,'Years:',datos.results[0].members[0].state,'%:',datos.results[0].members[0].votes_with_party_pct)
  console.log(datos)
  let max=datos.results[0].members.length; 
  let contenido=''
  // ${} ponemos variables en un string , html templates
 for(let i=0;i<max;i++){
    // vamos añadiendo filas y las columnas de cada fila- tr ->fila td-> cada columna, += va añadiendo
    contenido +=`<tr><td>${datos.results[0].members[i].last_name}</td><td>${datos.results[0].members[i].party}</td><<td>${datos.results[0].members[i].state}</td><<td>${datos.results[0].members[i].seniority}</td><<td>${datos.results[0].members[i].votes_with_party_pct}</td></tr>`
  }
  return contenido;
}
  
// Exportar las funciones para que puedan ser utilizadas en otros archivos
export { fetchJson, makeMemberRows };