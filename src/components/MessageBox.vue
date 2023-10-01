<template>
  <div>
    <div v-if="isMessaging" class="message-box" >
      <div class="header"
        style="display: flex; justify-content: space-between;   width: 350px;   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); height:50px; align-items: center; padding: 10px;">
        <div class="name"  style=" display: flex; " > <i id="personicons" style="margin: 0%; padding: 0%;" class="fas fa-male"></i>Yusuf Yılmaz</div>
        <div class="buttons"  >
          <button @mouseover="anlat = true" @mouseout=" anlat = false" class="button"><i
              class="fa-solid fa-person-chalkboard"></i></button>
          <div v-if="anlat" class="toolTip"> Anlat</div>
          <button @mouseover="dinle = true" @mouseout=" dinle = false" class="button"><i
              class="fa-solid fa-chalkboard-user"></i></button>
          <div v-if="dinle" class="toolTip"> dinle</div>

          <button @mouseover="sor = true" @mouseout=" sor = false"  class="button"><i class="fa-solid fa-question"></i></button>
          <div v-if="sor" class="toolTip"> sor</div>

          <button @mouseover="cevapla = true" @mouseout=" cevapla = false"  class="button"><i class="fa-solid  fa-message"></i></button>
          <div v-if="cevapla" class="toolTip"> cevapla</div>


          <button @mouseover="videocall = true" @mouseout=" videocall = false"  class="button video-call-button"> <i class="fas fa-video video-call-button"></i></button>
          <div v-if="videocall" class="toolTip"> Videolu Ara</div>
          
          <button @mouseover="close = true" @mouseout=" close = false"  class="button close-button" @click="isMessaging = false ; close = false"> <i
              class="fas fa-times close-icon"></i></button>
              <div v-if="close" class="toolTip"> Kapat</div>

        </div>

      </div>
      <div class="chat-messages">
        <!-- Your chat messages go here -->
      </div>
      <div class="send-message-box">
        <input type="text" class="message-input" placeholder="Mesaj Gönder..." />
   <i class="fa-solid fa-paper-plane" style="padding:  7px; font-size: large; color: rgb(59, 114, 255);"></i>      </div>
    </div>


    <div class="friends" style="margin-top: 15px; overflow: auto;" @click="isMessaging = true">
      <div class="search-bar"> <i class="search-icon fas fa-search" style="margin: 1px 5px; color: #ccc;"></i>
        <input type="text" class="search-input" placeholder="İsim Ara">
      </div>

      <ul>
        <li style="font-size: small">ONLINE-3</li>

        <li><i id="personicons" class="fas fa-male"></i> Yusuf Yılmaz</li>
        <li><i id="personicons" class="fas fa-pen"></i> İsmail Demir</li>
        <li><i id="personicons" class="fas fa-anchor"></i> Ahmed Arslan</li>
      </ul>

      <ul style="opacity: 0.5">
        <li style="font-size: small">OFLINE-7</li>

        <li><i id="personicons" class="fas fa-bicycle"></i> Bilal Ekinci</li>
        <li>
          <i id="personicons" class="fas fa-briefcase"></i> Hüseyin Yıldırım
        </li>
        <li><i id="personicons" class="fas fa-coffee"></i> Mustafa Çelik</li>
        <li><i id="personicons" class="fas fa-dumbbell"></i> Osman Kaya</li>
        <li>
          <i id="personicons" class="fas fa-graduation-cap"></i> Abdullah
          Öztürk
        </li>
        <li>
          <i id="personicons" class="fas fa-microphone"></i> Muhammed Aydın
        </li>
        <li><i id="personicons" class="fas fa-music"></i> İbrahim Yılmaz</li>
      </ul>
    </div>
  </div>
</template>
  
<script setup >
import { ref } from "vue";
const isMessaging = ref(false)
const anlat = ref(false)
const dinle = ref(false)
const sor = ref(false)
const cevapla = ref(false)
const close = ref(false)
const videocall = ref(false)

</script>
  
<style scoped>
.message-box {
  width: 400px;
  background-color: #fff;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
  /* Added shadow at the top */
  border-radius: 8px 8px 0 0;
  /* Rounded corners at the top */
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0%;
  right: 10%;
  width: auto;
  background: white;
  z-index: 111;
}


.name {
  margin: 0;
  font-size: 18px;
}



.button {
  background-color: transparent;
  border: none;
  color: #527aff;
  font-size: 18px;
  cursor: pointer;
  margin-left: 5px;
}


.chat-messages {
  flex-grow: 1;
  padding: 10px;
  height: 300px;
  max-height: 300px;
  overflow-y: auto;
}

.send-message-box {
  display: flex;
  padding: 10px;
}

.message-input {
  flex-grow: 1;
  padding:  0px 8px;
  background: #eee;
  border: 0px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.send-button {
  background-color: #4267b2;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}


ul {
  list-style-type: none;
  padding: 0;
  /* Remove default padding */
  margin: 0;
  /* Remove default margin */
  font-family: cursive;
  font-size: medium;
}

li {
  padding: 10px 30px;
  display: flex;
  cursor: pointer;
  border-radius: 7px 0px 0px 7px;
}

li:hover {
  background: rgb(218, 218, 218);
}

#personicons {
  background: white;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin-right: 9px;
}

.friends {
  height: 91vh;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 24px;
  padding: 8px;
  width: 80%;
}

.search-input {
  border: none;
  font-size: 16px;
  flex: 1;
  outline: none;
  width: 100%;

}

.toolTip {
  position: absolute;
  top: -20px;
  background: rgb(30, 30, 30, 0.2);
  padding: 0px 10px;
  border-radius: 10px;
}

</style>
  