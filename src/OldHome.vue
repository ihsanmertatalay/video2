<template>
  <header></header>
  <main>
    <Navbar :name="myuser.name" />

    <div class="container-fluid mt-5" style="margin-top: 100px">
      <div style="display: flex; justify-content: center">
        <div
          class="box"
          @click="routeAnlat('/anlat/')"
          style="background: rgb(239, 239, 239)"
        >
          <h1 style="color: #336699">Anlat</h1>
          <i
            class="fa-solid fa-person-chalkboard"
            style="color: #336699; font-size: 30px; margin-bottom: 30px"
          ></i>
        </div>

        <div
          class="box"
          @click="routeDinle()"
          style="border-radius: 0px 5px 5px 0px"
        >
          <h1 style="color: #4e95dc">Dinle</h1>
          <i
            class="fa-solid fa-chalkboard-user"
            style="color: #4e95dc; font-size: 30px; margin-bottom: 30px"
          ></i>
        </div>
      </div>
      <!--
        <div style="display: flex; justify-content: center">
        <div class="box" @click="routeAnlat('/sor/')">
          <h1 style="color: rgb(255, 200, 50)">Sor</h1>

          <i
            class="fa-solid fa-question"
            style="
              color: rgb(255, 200, 50);
              font-size: 30px;
              margin-bottom: 30px;
            "
          ></i>
        </div>
        <div
          class="box"
          @click="routeAnlat('/cevapla/')"
          style="border-radius: 0px 5px 5px 0px"
        >
          <h1 style="color: rgb(250, 226, 160)">Cevapla</h1>
          <i
            class="fa-solid fa-message"
            style="
              color: rgb(250, 226, 160);
              font-size: 30px;
              margin-bottom: 30px;
            "
          ></i>
        </div>
      </div>
      -->

    </div>

  <!--  <table
      class="table custom-table"
      style="width: 70%; align-items: center; margin: auto; margin-bottom: 30px"
    >
      <thead>
        <tr>
          <th style="width: 60%">Old Talks With</th>
          <th>Date</th>
          <th>Duration</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <i class="fa-solid fa-circle-user"></i>
            John Doe
          </td>
          <td>2023-06-01</td>
          <td>03:15</td>
          <td>
            Sor <i class="fa-solid fa-question" style="font-size: 19px"></i>
          </td>
        </tr>
        <tr>
          <td>
            <i class="fa-solid fa-circle-user"></i>
            Jane Smith
          </td>
          <td>2023-06-02</td>
          <td>09:23</td>
          <td>
            Anlat
            <i
              class="fa-solid fa-person-chalkboard"
              style="font-size: 19px"
            ></i>
          </td>
        </tr>
        <tr>
          <td>
            <i class="fa-solid fa-circle-user"></i>
            David Johnson
          </td>
          <td>2023-06-03</td>
          <td>10:01</td>
          <td>
            Dinle
            <i class="fa-solid fa-chalkboard-user" style="font-size: 19px"></i>
          </td>
        </tr>
        <tr>
          <td>
            <i class="fa-solid fa-circle-user"></i>
            Sarah Williams
          </td>
          <td>2023-06-04</td>
          <td>08:45</td>
          <td>
            Anlat
            <i
              class="fa-solid fa-person-chalkboard"
              style="font-size: 19px"
            ></i>
          </td>
        </tr>
        <tr>
          <td>
            <i class="fa-solid fa-circle-user"></i>
            Michael Brown
          </td>
          <td>2023-06-05</td>
          <td>01:59</td>
          <td>
            Dinle
            <i class="fa-solid fa-chalkboard-user" style="font-size: 19px"></i>
          </td>
        </tr>
      </tbody>
    </table>-->
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();
const Apiurl = "http://localhost:3000";
const myuser = ref([]);
const myRooms = ref([]);
const router = useRouter();
const route = useRoute();
const { id } = route.params;

async function getUser() {
  const response = await fetch(Apiurl + "/user/" + id);
  const json = await response.json();
  myuser.value = json;
}
async function routeAnlat(link) {
  router.push({path:link + id}) 
  //  router.go(0)
  // window.location.href = link + id;
}

async function routeDinle() {
 await getRooms();

  if (myRooms.value.length > 0) {
     router.push({path:"/dinle/" + id})
 //  router.go(0)

 //window.location.href = "/dinle/" + id;
  }  else{
    $toast.warning("Anlatıcı Odaları Boş", {
        duration: 1500,
      });
  }
}

async function getRooms() {
  const response = await fetch(Apiurl + "/room/");
  const json = await response.json();
  myRooms.value = json;
}

onMounted(() => {
  getUser();
});
</script>
<style scoped>
.box {
  background: whitesmoke;
}
h1 {
  color: lightblue;
  margin-top: 30px;
}

tr {
  border: 1px solid rgb(177, 172, 172);
}

tr:hover {
  border-collapse: collapse;
  border: 1.2px solid black !important;
}
.custom-table {
  background-color: #cbaaaa; /* Replace with your desired background color */
}
m {
  color: #4e95dc;
}
</style>
