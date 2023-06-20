
const app = Vue.createApp({
  data() {
    return { 
      chamber: this.getChamber(),
      senate: this.created_senate("data/congress-117-senate.json"),
      house: this.created_house("data/congress-117-house.json"),
      members_senate: [],
      members_house:[],
      partyInfo:{
        Democrat:0,
        Republican:0,
        Independent:0
      }

      
    }
  },
  
  methods: {
    getChamber() {
      const params = new URL(document.location).searchParams;
      let chamber=params.get("chamber");
      if (chamber==null){chamber="senate"}; // sino ponemos nada, por defecto es senate
      return chamber;
    },
    created_senate(file){
      fetch(file)
      .then (response=>response.json())
      .then ((data) => {
              this.senate=data;
              this.members_senate=data.results[0].members;
              this.partyInfo.Democrat=calculateTotalDemocrats(data);
              this.partyInfo.Republican=calculateTotalRepublican(data);
              this.partyInfo.Independent=calculateTotalIndependent(data);
              }
      )
     .catch(error=>console.log("Error"))
    },
    created_house(file){
      fetch(file)
      .then (response=>response.json())
      .then ((data) => {
              this.house=data;
              this.members_house=data.results[0].members;
              }
      )
     .catch(error=>console.log("Error"))
    }
   
  },    
});

function calculateTotalDemocrats(data){
  let count=0;
  const members=data.results[0].members;
  const max=data.results[0].members.length; 

  for(let i=0;i<max;i++){
    if(members[i].party=="D"){
      count=count+1;
    }
  }
  return count;
}

function calculateTotalRepublican(data){
  let count=0;
  const members=data.results[0].members;
  const max=data.results[0].members.length; 
 
  for(let i=0;i<max;i++){
    if(members[i].party=="R"){
      count=count+1;
    }
  }
  return count;
}

function calculateTotalIndependent(data){
  let count=0;
  const members=data.results[0].members;
  const max=data.results[0].members.length; 
 
  for(let i=0;i<max;i++){
    if(members[i].party=="I"){
      count=count+1;
   }
 }
 return count;
}


app.mount('#app');




