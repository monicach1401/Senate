
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
  
  countMembers(members,chamber,chamber_counts,max); // calculamos el total de miembros de cada partido
  
  // calculamos el total de missed y lo guardamos en chamber.statistics.missed
  let totalDemocratMissed=0;
  let totalRepublicanMissed=0;
  let totalIndependentMissed=0;
  let maxMissedVotes=0;

  let totalDemocratLoyalty=0;
  let totalRepublicanLoyalty=0;
  let totalIndepedentLoyalty=0;
  let maxAgainstVotes=0;
  let maxWithVotes=0;

  
 // solo hacemos un bucle del total de miembros y nos guardamos los datos para hacer los calculos
  for( let i=0;i<max;i++){
    // calculamos los totales de "missed_votes" y "votes_with_party_pct" de cada partido para crear las listas
    if (members[i].party=="D"){
      totalDemocratMissed= totalDemocratMissed+(members[i].missed_votes); 
      if (members[i].votes_with_party_pct == undefined){members[i].votes_with_party_pct=0} // si alguno tiene valor Nan, le ponemos "0"
      totalDemocratLoyalty = totalDemocratLoyalty+(members[i].votes_with_party_pct);
    }else if(members[i].party=="R"){
      totalRepublicanMissed=totalRepublicanMissed+(members[i].missed_votes);
      if (members[i].votes_with_party_pct == undefined){members[i].votes_with_party_pct=0} 
      totalRepublicanLoyalty = totalRepublicanLoyalty+(members[i].votes_with_party_pct);
    }else{
      totalIndependentMissed=totalIndependentMissed+(members[i].missed_votes);
      if (members[i].votes_with_party_pct == undefined){members[i].votes_with_party_pct=0} 
      totalIndepedentLoyalty = totalIndepedentLoyalty+(members[i].votes_with_party_pct);
    }
    // creamos las listas LEAST Y MOST ATTENDANCE
    create_Least_Most_Members_Attendance(i,members,chamber_least_missed,chamber_most_missed)
    maxMissedVotes= maxMissedVotes+members[i].missed_votes;
    // creamos las listas  LEAST Y MOST LOYALTY
    create_Least_Most_Members_Loyalty(i,members,chamber_least_loyalty,chamber_most_loyalty)
    maxWithVotes= maxWithVotes+members[i].votes_with_party_pct;
    maxAgainstVotes= maxAgainstVotes+members[i].votes_against_party_pct;
  }

  // calculamos el % de la primera tabla tanto el Attendance como en Loyalty
  create_Column_Voted_with_Party_Attendance(chamber_missed,totalDemocratMissed,totalRepublicanMissed,totalIndependentMissed);
  create_Column_Voted_with_Party_Loyalty(chamber_loyalty,totalDemocratLoyalty,totalRepublicanLoyalty,totalIndepedentLoyalty);
  // ordenamos las listas de nombres para crear las tablas LEAST y MOST tanto para Attendance como para Loyalty
  // pongo el maximo en una variable para asi poder reutilizar la funcion. Es 10 pq muestra el 10%
  let maxitemsToShow=10;
  console.log('longitud de la lista',chamber_least_missed)
  console.log('maxitems %',maxitemsToShow);
  order_descending_filter_and_showNumItems(datos,chamber,chamber_least_missed,chamber_least_loyalty,maxMissedVotes,maxAgainstVotes,maxitemsToShow);
  order_ascending_filter_and_showNumItems(datos,chamber,chamber_least_missed,chamber_least_loyalty,maxMissedVotes,maxWithVotes,maxitemsToShow);
  console.log('datos despues del calcstadistic',datos)
  console.log('longitud final para mostrar',datos[chamber].statistics.least_missed)
}

// función que guarda los datos de las columnas " Number of Reps" en los objetos- tanto de Attendance como Loyalty
function countMembers(members,chamber,chamber_counts,max){
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
}

// función que guarda los datos de las columnas " Name y Number of Missed Votes" en los objetos- 
function create_Least_Most_Members_Attendance(i,members,chamber_least_missed,chamber_most_missed){
  chamber_least_missed[i]=new Object();
  chamber_least_missed[i].name=members[i].last_name;
  chamber_least_missed[i].votes=members[i].missed_votes;
  chamber_most_missed[i]=new Object();
  chamber_most_missed[i].name=members[i].last_name;
  chamber_most_missed[i].votes=members[i].missed_votes;
 }

// función que guarda los datos de las columnas " Name y Number Party Votes" en Loyalty 
function create_Least_Most_Members_Loyalty(i,members,chamber_least_loyalty,chamber_most_loyalty){
  chamber_least_loyalty[i]=new Object();
  chamber_least_loyalty[i].name=members[i].last_name;
  // cuando el valor es undefined, le ponemos el valor 0 para que se pueda hacer la suma total
  if (members[i].votes_against_party_pct == undefined){
    members[i].votes_against_party_pct=0;
  }
  chamber_least_loyalty[i].votes=members[i].votes_against_party_pct;
  
  chamber_most_loyalty[i]=new Object();
  chamber_most_loyalty[i].name=members[i].last_name;
  if (members[i].votes_with_party_pct == undefined){
    members[i].votes_with_party_pct=0;
  }
  chamber_least_loyalty[i].votes=members[i].votes_with_party_pct;
  chamber_most_loyalty[i].votes=members[i].votes_with_party_pct;
 
}

// función que calcula los datos de la columna " % Voted with Party en Attendance" 
function create_Column_Voted_with_Party_Attendance(chamber_missed,totalDemocratMissed,totalRepublicanMissed,totalIndependentMissed){
  let totalmissed=0;
  totalmissed=totalDemocratMissed + totalRepublicanMissed + totalIndependentMissed;
  chamber_missed.Democrat=((totalDemocratMissed*100)/totalmissed).toFixed(2);    // ponemos el valor en el objecto y lo rendondeamos
  chamber_missed.Republican=((totalRepublicanMissed*100)/totalmissed).toFixed(2) ;
  chamber_missed.Independent=((totalIndependentMissed*100)/totalmissed).toFixed(2) ;
}

// función que calcula los datos de la columna " % Voted with Party en Loyalty" 
function create_Column_Voted_with_Party_Loyalty(chamber_loyalty,totalDemocratLoyalty,totalRepublicanLoyalty,totalIndepedentLoyalty){
  let totalLoyalty=0;
  // si no hay valor tiene que mostrar en la tabla 'N/A'
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
}

// función que ordena descendente,elimina los elementos null y los 0 y muestra el % de items segun el parametro maxitemsToShow
function order_descending_filter_and_showNumItems(datos,chamber,chamber_least_missed,chamber_least_loyalty,maxMissedVotes,maxAgainstVotes,maxitemsToShow){
  chamber_least_missed=((chamber_least_missed.sort(function(a,b){return b.votes-a.votes})).filter(element => element.votes != null)).filter(element => element.votes > 0); 
  chamber_least_missed=chamber_least_missed.slice(0,Math.round((chamber_least_missed.length*maxitemsToShow)/100));
  
  chamber_least_loyalty=((chamber_least_loyalty.sort(function(a,b){return b.votes-a.votes})).filter(element => element.votes != null)).filter(element => element.votes > 0); 
  chamber_least_loyalty=chamber_least_loyalty.slice(0,Math.round((chamber_least_loyalty.length*maxitemsToShow)/100));
  
  for (let i=0;i<chamber_least_missed.length;i++){
    chamber_least_missed[i].votes_percentage=new Object();
    chamber_least_missed[i].votes_percentage=(chamber_least_missed[i].votes*100/maxMissedVotes).toFixed(2)
  }

  for (let i=0;i<chamber_least_loyalty.length;i++){
    chamber_least_loyalty[i].votes_percentage=new Object();
    chamber_least_loyalty[i].votes_percentage=(chamber_least_loyalty[i].votes*100/maxAgainstVotes).toFixed(2)
  }
  // ponemos los resultados en los valores del objeto
 datos[chamber].statistics.least_missed=chamber_least_missed;
 datos[chamber].statistics.least_loyalty=chamber_least_loyalty;
}

// función que ordena ascendente,elimina los elementos null y los 0 y muestra el % de items segun el parametro maxitemsToShow
function order_ascending_filter_and_showNumItems(datos,chamber,chamber_most_missed,chamber_most_loyalty,maxMissedVotes,maxWithVotes,maxitemsToShow){
  chamber_most_missed=((chamber_most_missed.sort(function(a,b){return a.votes-b.votes})).filter(element => element.votes != null)).filter(element => element.votes > 0); 
  chamber_most_missed=chamber_most_missed.slice(0,Math.round((chamber_most_missed.length*maxitemsToShow)/100));
  chamber_most_loyalty=((chamber_most_loyalty.sort(function(a,b){return a.votes-b.votes})).filter(element => element.votes != null)).filter(element => element.votes > 0); 
  chamber_most_loyalty=chamber_most_loyalty.slice(0,Math.round((chamber_most_loyalty.length*maxitemsToShow)/100));

  // calculamos el % de cada uno y creamos una nueva propiedad
  for (let i=0;i<chamber_most_missed.length;i++){
    chamber_most_missed[i].votes_percentage=new Object();
    chamber_most_missed[i].votes_percentage=(chamber_most_missed[i].votes*100/maxMissedVotes).toFixed(2)
  }
  for (let i=0;i<chamber_most_loyalty.length;i++){
   chamber_most_loyalty[i].votes_percentage=new Object();
   chamber_most_loyalty[i].votes_percentage=(chamber_most_loyalty[i].votes*100/maxWithVotes).toFixed(2)
  }
  datos[chamber].statistics.most_missed=chamber_most_missed; 
  datos[chamber].statistics.most_loyalty=chamber_most_loyalty; 
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

