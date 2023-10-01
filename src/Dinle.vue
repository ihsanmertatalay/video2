<template>
  <header></header>

  <main>
    <Navbar :name="myuser.name" />

    <div
      style="
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: 30px auto 0px;
        align-items: center;
      "
    >
    <h3 style="text-align: end">Dinleyen</h3>

    <h3>Anlatan</h3>
    </div>
  
    <my-video2></my-video2>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import MyVideo2 from "./components/MyVideo2.vue";

const Apiurl = "https://anlat-iake.onrender.com";
const myuser = ref([]);
const router = useRouter();
const route = useRoute();
const { id } = route.params;

const myName = computed(() => store.getters.getmyName);

async function getUser() {
  const response = await fetch(Apiurl + "/user/" + id);
  const json = await response.json();
  myuser.value = json;
}

onMounted(() => {
  getUser();

});
</script>
<style scoped>
h1 {
  color: Blue;
  margin-top: 30px;
  text-align: center;
}

h3 {
  width: 33%;
}
#videoElement {
  width: 400px;
  height: 300px;
  border: 1px solid #ccc;
}
</style>
