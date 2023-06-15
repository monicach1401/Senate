const app = Vue.createApp({
  data() {
    return { 
      chamber: this.getChamber()
    }
  },
  methods: {
    getChamber() {
      const params = new URL(document.location).searchParams;
      const chamber=params.get("chamber");
      return chamber;
    }
  }
});

app.mount('#app');