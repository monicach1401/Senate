
// Función obtener datos del Senado

function fetchJson(file){
  return fetch(file).then (response=>response.json());
}


// Función para generar las filas de miembros basadas en los datos JSON recibidos
function makeMemberRows(datos,party,state){
let max=datos.results[0].members.length; 
let contenido='';
const members=datos.results[0].members;
const result1=party.filter(letter=>letter=="D");
const result2=party.filter(letter=>letter=="R");
const result3=party.filter(letter=>letter=="ID");

if (max>0 && party.length==0){ // esta vacio, no hay nada seleccionado
  contenido=''
  return contenido
}

// ------  Filtro para Democrat 
if (result1.length>0){ // esta seleccionado Democrat
  if (state.length==1){// state.length=1 significa que no hay ningun state seleccionado
    for(let i=0;i<max;i++){
      if(members[i].party=="D"){
        contenido += `<tr>
        <td>${`<a href="${members[i].url}">${members[i].last_name}`}</td>
        <td>${members[i].party}</td>
        <td>${members[i].state}</td>
        <td>${members[i].seniority}</td>
        <td>${members[i].votes_with_party_pct}</td>
        </tr>`
      }
    }
  }else{//hay un state seleccionado
    contenido=''
    for(let i=0;i<max;i++){
      if(members[i].party=="D" && members[i].state==state){
        console.log('coinciden :',members[i].party,members[i].state,state)
        contenido += `<tr>
        <td>${`<a href="${members[i].url}">${members[i].last_name}`}</td>
        <td>${members[i].party}</td>
        <td>${members[i].state}</td>
        <td>${members[i].seniority}</td>
        <td>${members[i].votes_with_party_pct}</td>
        </tr>`
      }
    } 
  }
}

// ------  Filtro para Republican 
if (result2.length>0){ // esta seleccionado Republican
  if (state.length==1){// state.length=1 significa que no hay ningun state seleccionado
    for(let i=0;i<max;i++){
      if(members[i].party=="R"){
        contenido += `<tr>
        <td>${`<a href="${members[i].url}">${members[i].last_name}`}</td>
        <td>${members[i].party}</td>
        <td>${members[i].state}</td>
        <td>${members[i].seniority}</td>
        <td>${members[i].votes_with_party_pct}</td>
        </tr>`
      }
    }
  }else{//hay un state seleccionado
    contenido=''
    for(let i=0;i<max;i++){
      if(members[i].party=="R" && members[i].state==state){
        console.log('coinciden :',members[i].party,members[i].state,state)
        contenido += `<tr>
        <td>${`<a href="${members[i].url}">${members[i].last_name}`}</td>
        <td>${members[i].party}</td>
        <td>${members[i].state}</td>
        <td>${members[i].seniority}</td>
        <td>${members[i].votes_with_party_pct}</td>
        </tr>`
      }
    } 
  }
}
// ------  Filtro para Independent 
if (result3.length>0){ // esta seleccionado Independent
  if (state.length==1){// state.length=1 significa que no hay ningun state seleccionado
    for(let i=0;i<max;i++){
      if(members[i].party=="ID"){
        contenido += `<tr>
        <td>${`<a href="${members[i].url}">${members[i].last_name}`}</td>
        <td>${members[i].party}</td>
        <td>${members[i].state}</td>
        <td>${members[i].seniority}</td>
        <td>${members[i].votes_with_party_pct}</td>
        </tr>`
      }
    }
  }else{//hay un state seleccionado
    contenido=''
    for(let i=0;i<max;i++){
      if(members[i].party=="ID" && members[i].state==state){
        contenido += `<tr>
        <td>${`<a href="${members[i].url}">${members[i].last_name}`}</td>
        <td>${members[i].party}</td>
        <td>${members[i].state}</td>
        <td>${members[i].seniority}</td>
        <td>${members[i].votes_with_party_pct}</td>
        </tr>`
      }
    } 
  }
}
return contenido
}

//función que crea el menu dropdown de los estados

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

// función para crear los nuevos objetos dentro del fichero Json
function calcStatistics (datos)
{
  // creamos estructura de Senate
  const senate={
      statistics:{
        counts:{
          "Democrat":0,
          "Republican":0,
          "Independent":0
        },
        missed:{},
        least_names:[],
        least_votes:[],
        least_missed:[]
    }
  }
  
 
  // creamos estructura de House
  const house={
    statistics:{
      counts:{
        "Democrat":0,
        "Republican":0,
        "Independent":0
      },
      missed:{},
      least_names:[],
      least_votes:[],
      least_missed:[]
    }
  }

  datos.senate=senate;
  datos.house=house;
    
  // declaramos variables 
  const members=datos.results[0].members;
  const max=datos.results[0].members.length; 
 
  const partysSenate=datos.senate.statistics.counts
  const partysHouse=datos.house.statistics.counts

  let chamber = datos.results[0].chamber;
  console.log('el chamber es',chamber)
  //const party=datos[chamber].statistics.counts
  //console.log('la variable party seria',party)
  

  

  let totalD=0;
  let totalR=0;
  let totalID=0;
  

  // hemos elegido Senate--------------------------------------------------
  if (datos.results[0].chamber=="Senate"){ 
    for(let i=0;i<max;i++){
      if(members[i].party=="D"){
        totalD=totalD+1;
        partysSenate.Democrat=totalD; // ponemos el total en el objecto 
      }else if(members[i].party=="R"){
        totalR=totalR+1;
        partysSenate.Republican=totalR; 
        }else{
          totalID=totalID+1;
          partysSenate.Independent=totalID; 
        }
    }
  }else{ // hemos elegido House
    for(let i=0;i<max;i++){
      if(members[i].party=="D"){
        totalD=totalD+1;
        partysHouse.Democrat=totalD; // ponemos el total en el objecto 
      }else if(members[i].party=="R"){
        totalR=totalR+1;
        partysHouse.Republican=totalR; 
        }else{
          totalID=totalID+1;
          partysHouse.Independent=totalID; 
         }
    }
  } 
}



// función que obtenemos los valores guardados en los objectos nuevos y devolvemos el contenido para crear la tabla
function makeCountRows(datos){
  // obtenemos todos los datos del objecto nuevo Senate
  const countsSenate=datos.senate.statistics.counts; 
  const missedSenate=datos.senate.statistics.missed;
  const partysSenate=Object.keys(countsSenate); // guardamos las propiedades que son los nombres de los partidos
  const numberOfRepsSenate=Object.values(countsSenate);// guardamos los valores que son los calculos
  const votedSenate=Object.values(missedSenate);

  // obtenemos todos los datos del objecto nuevo House
  const countsHouse=datos.house.statistics.counts; 
  const missedHouse=datos.house.statistics.missed;
  const partysHouse=Object.keys(countsHouse); 
  const numberOfRepsHouse=Object.values(countsHouse);
  const votedHouse=Object.values(missedHouse);
  
 
  let contenido=''
 
  if (datos.results[0].chamber=="Senate"){ //hemos elegido Senate
    for(let i=0;i<3;i++){
      contenido+= `<tr>
      <td>${partysSenate[i]}</td>
      <td>${numberOfRepsSenate[i]}</td>
      <td>${votedSenate[i]}</td>
      </tr>`
    }
  }else{// hemos elegido House
    for(let i=0;i<3;i++){
      contenido+= `<tr>
      <td>${partysHouse[i]}</td>
      <td>${numberOfRepsHouse[i]}</td>
      <td>${votedHouse[i]}</td>
      </tr>`
    }  

  }
  return contenido
  } 

// función que nos calcula el % de los missed voted y guarda el rdo en el objecto  
function makeMissedVoteRows(datos){
  const members=datos.results[0].members;
  const max=datos.results[0].members.length;
  const missedSenate=datos.senate.statistics.missed;
  const missedHouse=datos.house.statistics.missed;
  let totalmissedSenate=0;
  let totalmissedHouse=0;
  let totalDemocratMissed=0;
  let totalRepublicanMissed=0;
  let totalIndependentMissed=0;
  console.log(datos)

  // hemos elegido Senate--------------------------------------------------
  if (datos.results[0].chamber=="Senate"){ 
    for(let i=0;i<max;i++){
      if (members[i].party=="D"){
        totalDemocratMissed= totalDemocratMissed+(members[i].missed_votes);// vamos sumando los missed_votes de todos los miembros "D"
      }else if(members[i].party=="R"){
        totalRepublicanMissed=totalRepublicanMissed+(members[i].missed_votes);// vamos sumando los missed_votes de todos los miembros "R"
      }else{
        totalIndependentMissed=totalIndependentMissed  +(members[i].missed_votes);// vamos sumando los missed_votes de todos los miembros "ID"
      }
    }  
    // calculamos el %
    totalmissedSenate=totalDemocratMissed + totalRepublicanMissed + totalIndependentMissed;
    missedSenate.Democrat=((totalDemocratMissed*100)/totalmissedSenate).toFixed(2);    // ponemos el valor en el objecto y lo rendondeamos
    missedSenate.Republican=((totalRepublicanMissed*100)/totalmissedSenate).toFixed(2) ;
    missedSenate.Independent=((totalIndependentMissed*100)/totalmissedSenate).toFixed(2) ;

  }else{ // hemos elegido House
    for(let i=0;i<max;i++){
      if (members[i].party=="D"){
        totalDemocratMissed= totalDemocratMissed+(members[i].missed_votes);// vamos sumando los missed_votes de todos los miembros "D"
      }else if(members[i].party=="R"){
        totalRepublicanMissed=totalRepublicanMissed+(members[i].missed_votes);// vamos sumando los missed_votes de todos los miembros "R"
      }else{
        totalIndependentMissed=totalIndependentMissed  +(members[i].missed_votes);// vamos sumando los missed_votes de todos los miembros "ID"
      }
    }  
    // calculamos el %
    totalmissedHouse=totalDemocratMissed + totalRepublicanMissed + totalIndependentMissed;
    missedHouse.Democrat=((totalDemocratMissed*100)/totalmissedHouse).toFixed(2);    // ponemos el valor en el objecto y lo rendondeamos
    missedHouse.Republican=((totalRepublicanMissed*100)/totalmissedHouse).toFixed(2) ;
    missedHouse.Independent=((totalIndependentMissed*100)/totalmissedHouse).toFixed(2) ;

  }
 }

// función para calcular "least engaged", los que tienen mas  missed_votes , ordenados descendente 
function leastEngaged(datos){
  const maxMembers=datos.results[0].members.length;
  const members=datos.results[0].members;
  let missedVotes=[];
  let names=[];
  let missed=[];
  let maxMissedVotes=0;
  let x=0;

  // obtenemos la lista de todos los missed_votes 
  for ( let i=0;i<maxMembers;i++){
    missedVotes[i] =members[i].missed_votes;
    maxMissedVotes=maxMissedVotes+missedVotes[i];
  }
  console.log('la suma total de missed votes',maxMissedVotes)
  console.log('lista inicial de votes ',missedVotes)
  console.log('la longitud inicial es',missedVotes.length)

  // ordenamos descendente  y eliminamos los elementos null y los 0 con filter
  missedVotes=((missedVotes.sort(function(a,b){return b-a})).filter(element => element != null)).filter(element => element > 0) 
  console.log( 'la nueva longitud eliminando los nulls es',missedVotes.length)

  // aqui los dice el maximo de item que tenemos que mostrar , solo el 10%
  missedVotes=missedVotes.slice(0,Math.round(missedVotes.length/10));

  // en la lista ponemos solo estos
  console.log('la nueva lista es ',missedVotes);
  
  // tenemos que buscar a que member pertenecen estos votos
  for ( let i=0;i<missedVotes.length;i++){ // recorremos la lista final
    let num=missedVotes[i]
    for( let i=0;i<maxMembers;i++ ){ // buscamos el valor de missed_votes en members para obtener el nombre
      if(members[i].missed_votes == num ){
        if ( (names.includes(members[i].last_name)) == false ){
          names.push(members[i].last_name)
        }
      }
    }
  } 
 

  // calculamos el % y lo guardamos en nuestro array missed
  for ( let i=0;i<missedVotes.length;i++){
    missed[i]=((missedVotes[i]*100)/maxMissedVotes).toFixed(2);
  }

  // ponemos los resultados de nuestros arrays en los valores del objeto
  if (datos.results[0].chamber=="Senate"){
    datos.senate.statistics.least_votes=missedVotes;
    datos.senate.statistics.least_missed=missed;
    datos.senate.statistics.least_names=names;
  }else{
    datos.house.statistics.least_votes=missedVotes;
    datos.house.statistics.least_missed=missed;
    datos.house.statistics.least_names=names;
  } 
    
} 


// función que crea la tabla con los datos del objecto
function makeLeastRows(datos){
  const leastSenate=datos.senate.statistics.least_votes; 
  const leastSenateMissed=datos.senate.statistics.least_missed;
  const leastSenateNames=datos.senate.statistics.least_names;
  const leastHouse=datos.house.statistics.least_votes;
  const leastHouseMissed=datos.house.statistics.least_missed;
  const leastHouseNames=datos.house.statistics.least_names;

  let contenido=''

  if (datos.results[0].chamber=="Senate"){ //hemos elegido Senate
    for(let i=0;i<leastSenate.length;i++){
      contenido+= `<tr>
      <td>${leastSenateNames[i]}</td>
      <td>${leastSenate[i]}</td>
      <td>${leastSenateMissed[i]}</td>
      </tr>`
    }
  }else{// hemos elegido House
    for(let i=0;i<leastHouse.length;i++){
      contenido+= `<tr>
      <td>${leastHouseNames[i]}</td>
      <td>${leastHouse[i]}</td>
      <td>${leastHouseMissed[i]}</td>
      </tr>`
    }  
  }
  return contenido
} 

// Exportar las funciones para que puedan ser utilizadas en index.html
export {fetchJson,makeStatesMenu,makeMemberRows,calcStatistics,makeCountRows,makeMissedVoteRows,leastEngaged,makeLeastRows};

