<template lang="">
  <div class="container" style="background: ">
    <div class="myimage">
      <img src="@/assets/log.png" alt="asdasd" width="300" />
    </div>
    <div class="form">
      <h1 class="logo" @click="routeAnlat('/')">Anlat</h1>

        <input v-model="name" type="text" placeholder="İsim" />
      <input v-model="password" type="password" placeholder="Şifre" />
      <button  type="button" @click="login" class="login-btn">Giriş</button>
      <button type="button" @click="signup" class="signup-btn">Üye Ol</button>


      <div class="forgot-password"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
const router = useRouter();
const Apiurl = "https://anlat-iake.onrender.com";
const users = ref([]);
const name = ref("");
const password = ref("");
const myid = ref("");
const isLogin = ref(false);
const exist = ref(false);

async function getUsers() {
  const response = await fetch(Apiurl + "/user");
  const json = await response.json();
  users.value = json;
}

async function login() {
  getUsers();
  users.value.forEach((user) => {
    if (user.name == name.value && user.password == password.value) {
      isLogin.value = true;
      myid.value = user._id;
    }
  });
  if (isLogin.value) {
    router.push({ path: `/home/` + myid.value });
    $toast.info("Hoşgeldin " + name.value, {
        duration: 1500,
      });
  }
  isLogin.value = false;

}
async function login2() {
  
}
 
async function signup() {
  users.value.forEach((user) => {
    if (user.name == name.value) {
      exist.value = true;
      $toast.warning("Bu isim kullanılıyor", {
        duration: 1000,
      });
    }
  });
  if (exist.value) {
    exist.value = false;
    return;
  }

  const response = await fetch(Apiurl + "/user", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      password: password.value,
    }),
  });
  const json = await response.json;
  $toast.success("Kayıt tamamlandı", {
    duration: 1000,
  });
  name.value = "";
  password.value = "";
  getUsers();
}

onMounted(() => {
  getUsers();
});
</script>
<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #fafafa;
  display: flex;

  height: 100vh;
  margin: 0;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin: 0;
}

.myimage {
  flex: 1;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  flex: 2;
  padding: 30px;
  text-align: center;
}
input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
}

.login-btn,
.signup-btn {
  background-color: #3897f0;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  margin-top: 10px;
}

.signup-btn {
  background-color: #e3bc12;
}

.forgot-password {
  color: #003569;
  margin-top: 10px;
}
</style>
