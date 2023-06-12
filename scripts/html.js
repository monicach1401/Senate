
// Función obtener datos del fichero Json
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

// función para crear los nuevos objetos y nos calcula todas las estadisticas
function calcStatistics (datos)
{

  const senate={
      statistics:{
        counts:{
          Democrat:0,
          Republican:0,
          Independent:0
        },
        missed:{},
        least_missed:[],
        most_missed:[],
        loyalty:{},
        least_loyalty:[],
        most_loyalty:[]
     }
  }

  const house={
    statistics:{
      counts:{
        Democrat:0,
        Republican:0,
        Independent:0
      },
      missed:{},
      least_missed:[],
      most_missed:[],
      loyalty:{},
      least_loyalty:[],
      most_loyalty:[]
    }
  }

  datos.senate=senate;
  datos.house=house;

  const members=datos.results[0].members;
  const max=datos.results[0].members.length; 
  let chamber = (datos.results[0].chamber).toLowerCase();
  let chamber_counts=datos[chamber].statistics.counts;
  let chamber_missed=datos[chamber].statistics.missed;
  let chamber_least_missed=datos[chamber].statistics.least_missed;
  let chamber_most_missed=datos[chamber].statistics.most_missed;
  let chamber_loyalty=datos[chamber].statistics.loyalty;
  let chamber_least_loyalty=datos[chamber].statistics.least_loyalty;
  let chamber_most_loyalty=datos[chamber].statistics.most_loyalty;
  
 

  // calculamos el total de miembros de cada partido y lo guardamos en chamber.statistics.counts
  let totalD=0;
  let totalR=0;
  let totalID=0;
  
  for(let i=0;i<max;i++){
    if(members[i].party=="D"){
      totalD=totalD+1;
      chamber_counts.Democrat=totalD; 
    }else if(members[i].party=="R"){
      totalR=totalR+1;
      chamber_counts.Republican=totalR; 
      }else{
        totalID=totalID+1;
        chamber_counts.Independent=totalID; 
      }
  }
 
  // calculamos el total de missed y lo guardamos en chamber.statistics.missed
 
  let totalmissed=0;
  let totalDemocratMissed=0;
  let totalRepublicanMissed=0;
  let totalIndependentMissed=0;
  let maxMissedVotes=0;

  let totalDemocratLoyalty=0;
  let totalRepublicanLoyalty=0;
  let totalIndepedentLoyalty=0;
  let totalLoyalty=0;
  let maxAgainstVotes=0;
  let maxWithVotes=0;

  
 // en el total de miembros sumamos los missed_votes y votes_with_party_pct y creamos las listas de least y most
  for( let i=0;i<max;i++){

    if (members[i].party=="D"){
      totalDemocratMissed= totalDemocratMissed+(members[i].missed_votes); //vamos sumando los missed_votes de todos los miembros "D"
      if (members[i].votes_with_party_pct == undefined){members[i].votes_with_party_pct=0} // si alguno tiene valor Nan, le ponemos "0"
      totalDemocratLoyalty = totalDemocratLoyalty+(members[i].votes_with_party_pct);//vamos sumando los votes_with_party_pct de todos los miembros "D"
    }else if(members[i].party=="R"){
      totalRepublicanMissed=totalRepublicanMissed+(members[i].missed_votes);// vamos sumando los missed_votes de todos los miembros "R"
      if (members[i].votes_with_party_pct == undefined){members[i].votes_with_party_pct=0} // si alguno tiene valor Nan, le ponemos "0"
      totalRepublicanLoyalty = totalRepublicanLoyalty+(members[i].votes_with_party_pct);//vamos sumando los votes_with_party_pct de todos los miembros "R"
      }else{
        totalIndependentMissed=totalIndependentMissed+(members[i].missed_votes);// vamos sumando los missed_votes de todos los miembros "ID"
        if (members[i].votes_with_party_pct == undefined){members[i].votes_with_party_pct=0} // si alguno tiene valor Nan, le ponemos "0"
        totalIndepedentLoyalty = totalIndepedentLoyalty+(members[i].votes_with_party_pct);//vamos sumando los votes_with_party_pct de todos los miembros "ID"
      }

    // creamos las listas LEAST Y MOST 
    chamber_least_missed[i]=new Object();
    chamber_least_missed[i].name=members[i].last_name;
    chamber_least_missed[i].votes=members[i].missed_votes;
    chamber_most_missed[i]=new Object();
    chamber_most_missed[i].name=members[i].last_name;
    chamber_most_missed[i].votes=members[i].missed_votes;
    maxMissedVotes= maxMissedVotes+members[i].missed_votes;
    
    chamber_least_loyalty[i]=new Object();
    chamber_least_loyalty[i].name=members[i].last_name;
    
    // cuando el valor es undefined, le ponemos el valor 0 para que se pueda hacer la suma total
    if (members[i].votes_against_party_pct == undefined){members[i].votes_against_party_pct=0;}
    chamber_least_loyalty[i].votes=members[i].votes_against_party_pct;
    maxAgainstVotes= maxAgainstVotes+members[i].votes_against_party_pct;
   
    chamber_most_loyalty[i]=new Object();
    chamber_most_loyalty[i].name=members[i].last_name;
    if (members[i].votes_with_party_pct == undefined){members[i].votes_with_party_pct=0;}
    chamber_least_loyalty[i].votes=members[i].votes_with_party_pct;
    chamber_most_loyalty[i].votes=members[i].votes_with_party_pct;
    maxWithVotes= maxWithVotes+members[i].votes_with_party_pct;
  }
   
  // calculamos el % de missed
  totalmissed=totalDemocratMissed + totalRepublicanMissed + totalIndependentMissed;
  chamber_missed.Democrat=((totalDemocratMissed*100)/totalmissed).toFixed(2);    // ponemos el valor en el objecto y lo rendondeamos
  chamber_missed.Republican=((totalRepublicanMissed*100)/totalmissed).toFixed(2) ;
  chamber_missed.Independent=((totalIndependentMissed*100)/totalmissed).toFixed(2) ;

  //  calculamos el % de Voted with Party , si es 0 tenemos que poner N/A
  totalLoyalty=totalDemocratLoyalty + totalRepublicanLoyalty + totalIndepedentLoyalty;
  if (totalDemocratLoyalty>0){
    chamber_loyalty.Democrat=((totalDemocratLoyalty*100)/totalLoyalty).toFixed(2);
    }else{chamber_loyalty.Democrat='N/A'}
  if (totalRepublicanLoyalty>0){
    chamber_loyalty.Republican=((totalRepublicanLoyalty*100)/totalLoyalty).toFixed(2);
    }else{chamber_loyalty.Republican='N/A'} 
  if (totalIndepedentLoyalty>0){
    chamber_loyalty.Independent=((totalIndepedentLoyalty*100)/totalLoyalty).toFixed(2);
    }else{chamber_loyalty.Independent='N/A'}  

  // calculamos las listas de LEAST Y MOST

  // LEAST: ordenamos descendente  y eliminamos los elementos null y los 0 con filter, del total solo mostrar el 10%
  chamber_least_missed=((chamber_least_missed.sort(function(a,b){return b.votes-a.votes})).filter(element => element.votes != null)).filter(element => element.votes > 0); 
  chamber_least_missed=chamber_least_missed.slice(0,Math.round(chamber_least_missed.length/10)); 

  chamber_least_loyalty=((chamber_least_loyalty.sort(function(a,b){return b.votes-a.votes})).filter(element => element.votes != null)).filter(element => element.votes > 0); 
  chamber_least_loyalty=chamber_least_loyalty.slice(0,Math.round(chamber_least_loyalty.length/10));
 

  // MOST: ordenamos ascendente  y eliminamos los elementos null y los 0 con filter, del total solo mostrar el 10%
  chamber_most_missed=((chamber_most_missed.sort(function(a,b){return a.votes-b.votes})).filter(element => element.votes != null)).filter(element => element.votes > 0);
  chamber_most_missed= chamber_most_missed.slice(0,Math.round(chamber_most_missed.length/10)); 
  chamber_most_loyalty=((chamber_most_loyalty.sort(function(a,b){return a.votes-b.votes})).filter(element => element.votes != null)).filter(element => element.votes > 0);
  chamber_most_loyalty= chamber_most_loyalty.slice(0,Math.round(chamber_most_loyalty.length/10)); 
 
   let maxItem=chamber_least_missed.length; // podria ser cualquiera pq tienen las 2 la misma longitud
 
  // calculamos el % de cada uno y creamos una nueva propiedad
  for (let i=0;i<maxItem;i++){
    chamber_least_missed[i].votes_percentage=new Object();
    chamber_least_missed[i].votes_percentage=(chamber_least_missed[i].votes*100/maxMissedVotes).toFixed(2)
    chamber_most_missed[i].votes_percentage=new Object();
    chamber_most_missed[i].votes_percentage=(chamber_most_missed[i].votes*100/maxMissedVotes).toFixed(2)
  }
  
  for (let i=0;i<chamber_least_loyalty.length;i++){
    chamber_least_loyalty[i].votes_percentage=new Object();
    chamber_least_loyalty[i].votes_percentage=(chamber_least_loyalty[i].votes*100/maxAgainstVotes).toFixed(2)
    chamber_most_loyalty[i].votes_percentage=new Object();
    chamber_most_loyalty[i].votes_percentage=(chamber_most_loyalty[i].votes*100/maxWithVotes).toFixed(2)
  }
    
   // ponemos los resultados en los valores del objeto
  datos[chamber].statistics.least_missed=chamber_least_missed;
  datos[chamber].statistics.most_missed=chamber_most_missed; 
  datos[chamber].statistics.least_loyalty=chamber_least_loyalty;
  datos[chamber].statistics.most_loyalty=chamber_most_loyalty; 


  console.log('datos despues del calcstadistic',datos)
}

// función creamos la tabla Senate/House at a Glance Attendance
function makeMissedVoteRows(datos){
  let chamber = (datos.results[0].chamber).toLowerCase();
  const chamber_counts=datos[chamber].statistics.counts;
  const chamber_missed=datos[chamber].statistics.missed;
  const party=Object.keys(chamber_counts);
  const numberOfReps=Object.values(chamber_counts);
  const voted=Object.values(chamber_missed);
  let contenido=''
 
  for(let i=0;i<3;i++){
    contenido+= `<tr>
    <td>${party[i]}</td>
    <td>${numberOfReps[i]}</td>
    <td>${voted[i]}</td>
    </tr>`
  }
  return contenido
} 

// función que crea la tabla Least Engaged 
function makeLeastMissedRows(datos){
  let chamber = (datos.results[0].chamber).toLowerCase();
  let chamber_least_missed=datos[chamber].statistics.least_missed
  let contenido=''
  for(let i=0;i<chamber_least_missed.length;i++){
    contenido+= `<tr>
    <td>${chamber_least_missed[i].name}</td>
    <td>${chamber_least_missed[i].votes}</td>
    <td>${chamber_least_missed[i].votes_percentage}</td>
    </tr>`
  }
  return contenido
} 

// función que crea la tabla Most Engaged
function makeMostMissedRows(datos){
  let chamber = (datos.results[0].chamber).toLowerCase();
  let chamber_most_missed=datos[chamber].statistics.most_missed
  let contenido=''
  for(let i=0;i<chamber_most_missed.length;i++){
    contenido+= `<tr>
    <td>${chamber_most_missed[i].name}</td>
    <td>${chamber_most_missed[i].votes}</td>
    <td>${chamber_most_missed[i].votes_percentage}</td>
    </tr>`
  }
  return contenido
} 

// función creamos la tabla Senate/House at a Glance Attendance
function makeLoyalRows(datos){
  let chamber = (datos.results[0].chamber).toLowerCase();
  const chamber_counts=datos[chamber].statistics.counts;
  const chamber_loyalty=datos[chamber].statistics.loyalty;
  const party=Object.keys(chamber_counts);
  const numberOfReps=Object.values(chamber_counts);
  const loyalty=Object.values(chamber_loyalty);
 
  let contenido=''
 
  for(let i=0;i<3;i++){
    contenido+= `<tr>
    <td>${party[i]}</td>
    <td>${numberOfReps[i]}</td>
    <td>${loyalty[i]}<td>
    </tr>`
  }

  return contenido
} 

// función que crea la tabla Least Loyal 
function makeLeastLoyalRows(datos){
  let chamber = (datos.results[0].chamber).toLowerCase();
  let chamber_least_loyalty=datos[chamber].statistics.least_loyalty
  let contenido=''
  for(let i=0;i<chamber_least_loyalty.length;i++){
    contenido+= `<tr>
    <td>${chamber_least_loyalty[i].name}</td>
    <td>${chamber_least_loyalty[i].votes}</td>
    <td>${chamber_least_loyalty[i].votes_percentage}</td>
    </tr>`
  }
  return contenido
} 

// función que crea la tabla Most Loyal 
function makeMostLoyalRows(datos){
  let chamber = (datos.results[0].chamber).toLowerCase();
  let chamber_most_loyalty=datos[chamber].statistics.most_loyalty
  let contenido=''
  for(let i=0;i<chamber_most_loyalty.length;i++){
    contenido+= `<tr>
    <td>${chamber_most_loyalty[i].name}</td>
    <td>${chamber_most_loyalty[i].votes}</td>
    <td>${chamber_most_loyalty[i].votes_percentage}</td>
    </tr>`
  }
  return contenido

}


// Exportar las funciones para que puedan ser utilizadas en index.html
export {fetchJson,makeStatesMenu,makeMemberRows,calcStatistics,makeMissedVoteRows,makeLeastMissedRows,makeMostMissedRows,makeLoyalRows,makeLeastLoyalRows,makeMostLoyalRows};

