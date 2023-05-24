
// Función obtener datos del Senado
function fetchJson(file){
  return fetch(file).then(response=>response.json());
}
// Función obtener datos de los estados
function fetchJson2(file){
  return fetch(file).then(response=>response.json());
  
}

// Función para generar las filas de miembros basadas en los datos JSON recibidos
function makeMemberRows(datos,party,state){
 
 let max=datos.results[0].members.length; 
 let contenido=''

 if (max>0 && party.length==0){ // esta vacio, no hay nada seleccionado
  contenido=''
  return contenido
 }

 const result1=party.filter(letter=>letter=="D")
 const result2=party.filter(letter=>letter=="R")
 const result3=party.filter(letter=>letter=="ID")
 console.log(result1.length,result2.length,result3.length)

 // ------  Filtro para Democrat 
 if (result1.length>0){ // esta seleccionado Democrat
   if (state.length==1){// state.length=1 significa que no hay ningun state seleccionado
      for(let i=0;i<max;i++){
       if(datos.results[0].members[i].party=="D"){
        contenido += `<tr>
                       <td>${`<a href="${datos.results[0].members[i].contact_form}">${datos.results[0].members[i].last_name}`}</td>
                       <td>${datos.results[0].members[i].party}</td>
                       <td>${datos.results[0].members[i].state}</td>
                      <td>${datos.results[0].members[i].seniority}</td>
                      <td>${datos.results[0].members[i].votes_with_party_pct}</td>
                     </tr>`
      }
    }
  }else{//hay un state seleccionado
      contenido=''
      for(let i=0;i<max;i++){
        if(datos.results[0].members[i].party=="D" && datos.results[0].members[i].state==state){
          console.log('coinciden :',datos.results[0].members[i].party,datos.results[0].members[i].state,state)
        contenido += `<tr>
                     <td>${`<a href="${datos.results[0].members[i].contact_form}">${datos.results[0].members[i].last_name}`}</td>
                     <td>${datos.results[0].members[i].party}</td>
                     <td>${datos.results[0].members[i].state}</td>
                     <td>${datos.results[0].members[i].seniority}</td>
                     <td>${datos.results[0].members[i].votes_with_party_pct}</td>
                   </tr>`
        }
       } 
      }
 }

 // ------  Filtro para Republican 
 if (result2.length>0){ // esta seleccionado Republican
  if (state.length==1){// state.length=1 significa que no hay ningun state seleccionado
     for(let i=0;i<max;i++){
      if(datos.results[0].members[i].party=="R"){
       contenido += `<tr>
                      <td>${`<a href="${datos.results[0].members[i].contact_form}">${datos.results[0].members[i].last_name}`}</td>
                      <td>${datos.results[0].members[i].party}</td>
                      <td>${datos.results[0].members[i].state}</td>
                     <td>${datos.results[0].members[i].seniority}</td>
                     <td>${datos.results[0].members[i].votes_with_party_pct}</td>
                    </tr>`
     }
   }
 }else{//hay un state seleccionado
     contenido=''
     for(let i=0;i<max;i++){
       if(datos.results[0].members[i].party=="R" && datos.results[0].members[i].state==state){
         console.log('coinciden :',datos.results[0].members[i].party,datos.results[0].members[i].state,state)
       contenido += `<tr>
                    <td>${`<a href="${datos.results[0].members[i].contact_form}">${datos.results[0].members[i].last_name}`}</td>
                    <td>${datos.results[0].members[i].party}</td>
                    <td>${datos.results[0].members[i].state}</td>
                    <td>${datos.results[0].members[i].seniority}</td>
                    <td>${datos.results[0].members[i].votes_with_party_pct}</td>
                  </tr>`
       }
      } 
     }
}
// ------  Filtro para Independent 
if (result3.length>0){ // esta seleccionado Independent
  if (state.length==1){// state.length=1 significa que no hay ningun state seleccionado
     for(let i=0;i<max;i++){
      if(datos.results[0].members[i].party=="ID"){
       contenido += `<tr>
                      <td>${`<a href="${datos.results[0].members[i].contact_form}">${datos.results[0].members[i].last_name}`}</td>
                      <td>${datos.results[0].members[i].party}</td>
                      <td>${datos.results[0].members[i].state}</td>
                     <td>${datos.results[0].members[i].seniority}</td>
                     <td>${datos.results[0].members[i].votes_with_party_pct}</td>
                    </tr>`
     }
   }
 }else{//hay un state seleccionado
     contenido=''
     for(let i=0;i<max;i++){
       if(datos.results[0].members[i].party=="ID" && datos.results[0].members[i].state==state){
         console.log('coinciden :',datos.results[0].members[i].party,datos.results[0].members[i].state,state)
       contenido += `<tr>
                    <td>${`<a href="${datos.results[0].members[i].contact_form}">${datos.results[0].members[i].last_name}`}</td>
                    <td>${datos.results[0].members[i].party}</td>
                    <td>${datos.results[0].members[i].state}</td>
                    <td>${datos.results[0].members[i].seniority}</td>
                    <td>${datos.results[0].members[i].votes_with_party_pct}</td>
                  </tr>`
       }
      } 
     }
}


 
  return contenido
}



function makeStatesMenu(datos){
  let contenido=''
  const max=datos.length;
  const first="Select a state"
  contenido=`<option value=" ">${first}</option>`
  for(let i=0;i<max;i++){
     contenido +=`<option value=${datos[i].abbreviation}>${datos[i].abbreviation} : ${datos[i].name}</option>`
  }

  return contenido
 }


// Exportar las funciones para que puedan ser utilizadas en index.html
export { fetchJson,fetchJson2, makeStatesMenu,makeMemberRows};

