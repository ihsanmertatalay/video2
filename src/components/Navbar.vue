<template lang="">
  <nav
    class="navbar navbar-expand-sm"
    style="box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)"
  >
    <div class="container-fluid">
      <h2 class="logo" @click="gohome()">Anlat</h2>
    </div>
    <div style="display: flex; background: ; align-items: center ; margin-right:25px">
      <!--    <i class="fa-regular fa-bell"></i>
        <i class="fa-regular fa-comment-dots"></i>
-->

<button
        type="button"
       
      >
        <i class="fa-regular fa-bell"></i> 
      </button>
      
      <button
        type="button"
       
      >
        <i class="fa-regular fa-comment-dots"></i> 
      </button>
      
      <button
        type="button"
        @click="isProfil = !isProfil"
      >
        <i  class="fa-regular fa-user"></i> 
        
      </button>
      <div @click="logout()"  style="cursor:pointer; position:absolute; right:30px; top:8vh ; background:white; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);  padding: 5px 10px ; border-radius:5px;" v-if="isProfil">
        Logout
        </div>
    </div>
  </nav>
</template>
<script setup>
import { defineProps,ref } from "vue";
import { useRouter,useRoute } from "vue-router";
const route = useRoute();
const { id } = route.params;
console.log(id);
const props = defineProps({
  name: String,
});

const router = useRouter();
const isProfil = ref(false)
const gohome = () => {
  router.push({ path: "/home/"+ id });
};
const logout = () => {
  router.push({ path: "/"});
};
</script>
<style scoped>
i {
  font-size: large;
  margin: 0px 15px;
}

button {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  border: grey 0px solid;
  margin-right: 10px
}
</style>
