<template >
    <div>
       <h1 style="color: red; text-align: center;">Admin Paneli</h1>
<h1>Kullanıcılar</h1>
        <table class="table">
        <thead>
            <tr>
                <th>İsim</th>
                <th>Şifre</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users">
                <td>{{ user.name }}</td>
                <td>{{ user.password }}</td>
               
            </tr>
           
        </tbody>
    </table>

    <h1>Boş Odalar</h1>
        <table class="table">
        <thead>
            <tr>
                <th>Anlatan</th>
                <th>Dinleyen</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="room in rooms">
                <td>{{ room.anlat }}</td>
                <td>{{ room.dinle }}</td>
               
            </tr>
           
        </tbody>
    </table>
</div>
</template>
<script setup>
    import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";

const Apiurl = "https://anlat-iake.onrender.com";
const users = ref([]);

async function getUsers() {
  const response = await fetch(Apiurl + "/user/" );
  const json = await response.json();
  users.value = json;
}

const rooms = ref([]);

async function getRooms() {
  const response = await fetch(Apiurl + "/room/" );
  const json = await response.json();
  rooms.value = json;
}

onMounted(() => {
  getUsers();
  getRooms()
});

</script>
<style >

</style>