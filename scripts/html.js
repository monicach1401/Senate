

function fetchJson(file) {
  return fetch(file).then(response=>response.json());
}

// Función para generar las filas de miembros basadas en los datos JSON recibidos
function makeMemberRows(datos){
// console.log('primera fila','name:',datos.results[0].members[0].last_name,'party:',datos.results[0].members[0].party,'State:',datos.results[0].members[0].state,'Years:',datos.results[0].members[0].state,'%:',datos.results[0].members[0].votes_with_party_pct)
  let max=datos.results[0].members.length; 
  let contenido=''
  // ${} ponemos variables en un string , html templates
  for(let i=0;i<max;i++){
  //vamos añadiendo filas y las columnas de cada fila- tr ->fila td-> cada columna, += va añadiendo
  //contenido += `<tr><td>${datos.results[0].members[i].last_name}</td><td>${datos.results[0].members[i].party}</td><td>${datos.results[0].members[i].state}</td><td>${datos.results[0].members[i].seniority}</td><td>${datos.results[0].members[i].votes_with_party_pct}</td></tr>`
  contenido += `<tr><td>${`<a href="`+`${datos.results[0].members[i].contact_form}`+`">`+`${datos.results[0].members[i].last_name}`}</td><td>${datos.results[0].members[i].party}</td><td>${datos.results[0].members[i].state}</td><td>${datos.results[0].members[i].seniority}</td><td>${datos.results[0].members[i].votes_with_party_pct}</td></tr>`
  }
  return contenido;
}


// solo con el primero
//function crearhipervinculo(datos){
// <a href="https://www.baldwin.senate.gov/feedback">Baldwin</a>
//let contenido=''
//console.log(datos)
//contenido=`<a href="https://www.baldwin.senate.gov/feedback">`+`${datos.results[0].members[0].last_name}` //aqui ponemos directamente la url, tiene que ser una variable
//url esta en  datos.results[0].members[0].contact_form
//contenido=`<a href="`+`${datos.results[0].members[0].contact_form}`+`">`+`${datos.results[0].members[0].last_name}`
//return contenido
//}
  
// Exportar las funciones para que puedan ser utilizadas en otros archivos
export { fetchJson, makeMemberRows};