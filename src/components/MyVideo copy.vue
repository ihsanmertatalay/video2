<template>
  <header></header>

  <main>
    <div style="width: 90%; margin: auto">
      <div
        class="videos"
        style="
          display: flex;
          justify-content: space-between;
          padding: 5px;
          align-items: center;
        "
      >
        <video id="videoElement" autoplay></video>
        <div class="loading" v-if="isLoading">
          <div class="loading-spinner"></div>
          <h2 style="color: lightgray; text-align: center">
            Konuşmacı Bağlanıyor...
          </h2>
        </div>
        <video id="videoElement2" v-if="!isLoading"></video>
      </div>
      <div
        class="chat"
        style="
          margin: 5px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
        "
      >
        <div style="display: flex ; " >
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <i class="fa-solid fa-microphone"></i> Mute
          </div>
          <i v-if="0" class="fa-solid fa-microphone-slash"></i>

          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <i class="fa-solid fa-video"></i>Stop Video
          </div>
          <i v-if="0" class="fa-solid fa-video-slash"></i>
        </div>
        <div style="display: flex">
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <i class="fa-solid fa-thumbs-up"> </i>
            Reactions
          </div>

          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
            Share Screen
          </div>

          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <i class="fa-solid fa-message"></i>
            Chat
          </div>
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <i class="fa-solid fa-plus"></i>
            Ask For Time
          </div>
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <i class="fa-solid fa-award"></i>
            Award 
          </div>
          <div
            style="display: flex; flex-direction: column; align-items: center"
          >
            <i class="fa-solid fa-flag"></i>
            Report 
          </div>
        </div>
        <div style="margin-right:30px ;">
          <button class="btn btn-danger">Leave</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    message: 5;
    isLoading: true;
    return {
      message: 5,
      isLoading: true,
    };
  },
  mounted() {
      navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = document.getElementById("videoElement");
        videoElement.srcObject = stream;
      })
      .catch((error) => console.error("Error accessing media devices:", error));

    setTimeout(() => {
      this.isLoading = false; // Set isLoading to false after the operation is complete
    }, 2000);
  },
  methods: {
    up: function () {
      this.message++;
    },
  },
};
</script>
<style scoped>
h1 {
  color: Blue;
  margin-top: 30px;
  text-align: center;
}
#videoElement {
  width: 49%;
  aspect-ratio: 4/3;
  border: 1px solid #ccc;
}

#videoElement2 {
  width: 49%;
  aspect-ratio: 4/3;
  border: 1px solid #ccc;
  background-image: url("../assets/mert.jpg");
  background-size: 100% 100%;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 49%;
  border: 1px solid #ccc;
  aspect-ratio: 4/3;
}

.loading-spinner {
  border: 4px solid #f3f3f3; /* Set the border color */
  border-top: 4px solid #3498db; /* Set the top border color */
  border-radius: 50%;
  width: 50%;
  aspect-ratio: 1;
  animation: spin 2s linear infinite; /* Add animation for spinning effect */
}
i {
  font-size: 33px;
  margin: 15px 35px 5px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
