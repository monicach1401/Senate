
const app = Vue.createApp({
  data() {
    return { 
      chamber: this.getChamber(),
      senate: this.created_senate("/data/congress-117-senate.json"),
      house: this.created_house("/data/congress-117-house.json"),
      members_senate: [],
      members_house:[]
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


app.mount('#app');






