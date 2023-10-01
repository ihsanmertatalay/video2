<template>
  <header>
    <font-awesome-icon icon="check" />
  </header>

  <main >
    

    <router-view  />
  </main>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  data() {
    x: 1;
    message: 5;
    y: 2;
    return {
      message: 5,
      url: "aa.vue",
    };
  },

  methods: {
    up: function () {
      this.message++;
    },
    routeAnlat(route) {
      this.$router.push(route);
    },
    redirectToUrl() {
      window.open(this.url, "_blank");
    },
  },
};
</script>

<style>

.logo {
  cursor: pointer;
  margin-left: 30px;
  font-size: 33px;
  font-family: Pacifico, cursive;
  color: #336699;
}

body {
  background: rgb(243, 243, 243);
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden ;
}

h1 {
  color: white;
  margin-top: 30px !important;
  font-size: 33px;
}
</style>

<style>
body{
  background: rgb(249, 249, 249);
}
</style>
