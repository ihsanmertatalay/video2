<template>
  <div
    id="vidoes"
    class="container"
    style="width: 100%; display: flex; justify-content: space-around"
  >
    <div
      class="local"
      style="width: 45%; aspect-ratio: 4/3; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);"
    ></div>
    <div
      class="remote"
      style="width: 45%; aspect-ratio: 4/3; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);"
    ></div>
  </div>

  <div
    style="
      width: 15%;
      float: right;
      display: flex;
      justify-content: space-around;
      margin: 50px 100px;
    "
  >
    <button class="btn btn-primary" type="button" id="join">Odaya Katıl</button>

    <button class="btn btn-danger" type="button" id="leave">Odadan Çık</button>
  </div>
  <div class="container mt-5">
    <!-- Button to trigger the modal -->

    <!-- The Modal -->
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content" style="border:none ; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);">
          <!-- Modal Header -->
          <div class="modal-header" style="border:none">
            <h4 class="modal-title" >Odaya Katıl</h4>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            Odayı başlatın ve kamera ve mikrofonunuzu açmak için izin verin
          </div>

          <!-- Modal footer -->
          <div class="modal-footer" style="border:none">
            <button type="button" class="btn btn-primary" id="join2">
              Odayı başlat ve katıl
            </button>

            <button type="button" class="btn btn-secondary" id="closeButton">
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-5">
    <!-- Button to trigger the modal -->

    <!-- The Modal -->
    <div class="modal" id="myModal2">
      <div class="modal-dialog">
        <div class="modal-content" style="border:none ; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);">
          <!-- Modal Header -->
          <div class="modal-header" style="border:none">
            <h4 class="modal-title">Odadan Çık</h4>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            Odadan çıkarsanız görüşme sona erdirilecektir. Odadan çıkmak
            istediğinize emin misiniz?
          </div>

          <!-- Modal footer -->
          <div class="modal-footer" style="border:none; ">
            <button type="button" class="btn btn-danger" id="closeMeeting">
              Odadan Çık
            </button>
            <button type="button" class="btn btn-primary" id="closeModal2">
              Vazgeç
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<script setup>
import { ref, computed } from "vue";

import { onMounted, onUnmounted } from "vue";
import { useRouter, useRoute, RouterView } from "vue-router";

const router = useRouter();
const route = useRoute();
const { id } = route.params;
const Apiurl = "http://localhost:3000";

const myRooms = ref([]);
const myuser = ref({
  name: "",
});
const myToken = ref("")

async function getUser() {
  const response = await fetch(Apiurl + "/user/" + id);
  const json = await response.json();
  myuser.value = json;
}
async function getRooms() {
  const response = await fetch(Apiurl + "/room/");
  const json = await response.json();
  myRooms.value = json;
}


async function deleteRoom() {
  const response = await fetch(Apiurl + "/room/" + myRooms.value[0]._id, {
    method: "DELETE",
  });
}

async function getToken2(name,channel) {
  const data = { name , channel }; // Create an object with the "name" property
  
  const response = await fetch(Apiurl + "/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Specify the content type as JSON
    },
    body: JSON.stringify(data), // Convert the data object to a JSON string
  });
  
  const json = await response.json();
  myToken.value =  json;
  return myToken.value
}

let options = {
  // Pass your App ID here.
  appId: "acec74e5063744bfa5d5ac184d1fa4b3",
  // Set the channel name.
  channel: "a",
  // Pass your temp token here.
  token: myToken.value,
  // Set the user ID.
  uid: "0",
};

let channelParameters = {
  // A variable to hold a local audio track.
  localAudioTrack: null,
  // A variable to hold a local video track.
  localVideoTrack: null,
  // A variable to hold a remote audio track.
  remoteAudioTrack: null,
  // A variable to hold a remote video track.
  remoteVideoTrack: null,
  // A variable to hold the remote user id.s
  remoteUid: null,
};
async function startBasicCall() {
  const AgoraRTC = await import("agora-rtc-sdk-ng");

  // Create an instance of the Agora Engine
  const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp9" });
  // Dynamically create a container in the form of a DIV element to play the remote video track.
  // Dynamically create a container in the form of a DIV element to play the local video track.
  const localPlayerContainers = document.getElementsByClassName("local");
  const localPlayerContainer = localPlayerContainers[0];
  const remotePlayerContainers = document.getElementsByClassName("remote");
  const remotePlayerContainer = remotePlayerContainers[0];
  console.log(
    "----------------------------------------------------------------"
  );

  //const localPlayerContainer = document.createElement("div");

  // Specify the ID of the DIV container. You can use the uid of the local user.
  localPlayerContainer.id = options.uid;
  // Set the textContent property of the local video container to the local user id.
  // localPlayerContainer.textContent = "Local user " + options.uid;
  // Set the local video container size.
  // Set the remote video container size.

  // Listen for the "user-published" event to retrieve a AgoraRTCRemoteUser object.
  agoraEngine.on("user-published", async (user, mediaType) => {
    // Subscribe to the remote user when the SDK triggers the "user-published" event.
    await agoraEngine.subscribe(user, mediaType);
    console.log("subscribe success");
    // Subscribe and play the remote video in the container If the remote user publishes a video track.
    if (mediaType == "video") {
      // Retrieve the remote video track.
      channelParameters.remoteVideoTrack = user.videoTrack;
      // Retrieve the remote audio track.
      channelParameters.remoteAudioTrack = user.audioTrack;
      // Save the remote user id for reuse.
      channelParameters.remoteUid = user.uid.toString();
      // Specify the ID of the DIV container. You can use the uid of the remote user.
      remotePlayerContainer.id = user.uid.toString();
      channelParameters.remoteUid = user.uid.toString();
      //remotePlayerContainer.textContent = "Remote user " + user.uid.toString();

      // Play the remote video track.
      channelParameters.remoteVideoTrack.play(remotePlayerContainer);
    }
    // Subscribe and play the remote audio track If the remote user publishes the audio track only.
    if (mediaType == "audio") {
      // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
      channelParameters.remoteAudioTrack = user.audioTrack;
      // Play the remote audio track. No need to pass any DOM element.
      channelParameters.remoteAudioTrack.play();
    }
    // Listen for the "user-unpublished" event.
    agoraEngine.on("user-unpublished", (user) => {
      router.push({ path: "/Home/" + id });
      $toast.warning("Karşı Taraf Görüşmeyi Sonlandırdı", {
        duration: 3500,
      });
      channelParameters.localAudioTrack.close();
      channelParameters.localVideoTrack.close();
      // Remove the containers you created for the local video and remote video.
      // Leave the channel
      agoraEngine.leave();
      console.log("You left the channel");
      // Refresh the page for reuse

      console.log(user.uid + "has left the channel");
    });
  });
  async function wonLoad() {
    // Listen to the Join button click event.
    document.getElementById("join").onclick = async function startMeeting() {
      // Join a channel.
      options.channel = myRooms.value[0].anlat;
      options.uid = myuser.value.name;
      options.token = myToken.value
      await agoraEngine.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );
      console.log(options.channel + "-------------------------------------");
      // Create a local audio track from the audio sampled by a microphone.
      channelParameters.localAudioTrack =
        await AgoraRTC.createMicrophoneAudioTrack();
      // Create a local video track from the video captured by a camera.
      channelParameters.localVideoTrack =
        await AgoraRTC.createCameraVideoTrack();

      // Publish the local audio and video tracks in the channel.
      await agoraEngine.publish([
        channelParameters.localAudioTrack,
        channelParameters.localVideoTrack,
      ]);
      // Play the local video track.
      channelParameters.localVideoTrack.play(localPlayerContainer);
      console.log("publish success!");
    };
    document.getElementById("join2").onclick = async function startMeeting() {
      // Join a channel.
      options.channel = myRooms.value[0].anlat;
      options.uid = myuser.value.name;
      options.token = myToken.value

      await agoraEngine.join(
        options.appId,
        options.channel,
        options.token,
        options.uid
      );
      console.log(options.channel + "-------------------------------------");
      // Create a local audio track from the audio sampled by a microphone.
      channelParameters.localAudioTrack =
        await AgoraRTC.createMicrophoneAudioTrack();
      // Create a local video track from the video captured by a camera.
      channelParameters.localVideoTrack =
        await AgoraRTC.createCameraVideoTrack();

      // Publish the local audio and video tracks in the channel.
      await agoraEngine.publish([
        channelParameters.localAudioTrack,
        channelParameters.localVideoTrack,
      ]);
      // Play the local video track.
      channelParameters.localVideoTrack.play(localPlayerContainer);
      console.log("publish success!");
    };
    // Listen to the Leave button click event.
    document.getElementById("closeMeeting").onclick = async function () {
      // Destroy the local audio and video tracks.
      channelParameters.localAudioTrack.close();
      channelParameters.localVideoTrack.close();
      // Remove the containers you created for the local video and remote video.
      // Leave the channel
      await agoraEngine.leave();
      console.log("You left the channel");
      // Refresh the page for reuse
    };
  }
  wonLoad();
}

// Remove the video stream from the container.
function removeVideoDiv(elementId) {
  console.log("Removing " + elementId + "Div");
  let Div = document.getElementById(elementId);
  if (Div) {
    Div.remove();
  }
}

const modalfunction = () => {
  document.getElementById("myModal").style.display = "block";
  document.getElementById("myModal2").style.display = "none";

  document.getElementById("closeButton").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
  });

  document.getElementById("join2").addEventListener("click", function () {
    document.getElementById("myModal").style.display = "none";
  });

  document.getElementById("leave").addEventListener("click", function () {
    document.getElementById("myModal2").style.display = "block";
  });
  document
    .getElementById("closeMeeting")
    .addEventListener("click", function () {
      router.push({ path: "/Home/" + id });
    });

  document.getElementById("closeModal2").addEventListener("click", function () {
    document.getElementById("myModal2").style.display = "none";
  });
};
onMounted(async () => {
  await getUser(); // Wait for getUser to complete
  await getRooms();
  await getToken2(myuser.value.name,myRooms.value[0].anlat)
  await deleteRoom();
  await startBasicCall(); // Wait for startBasicCall to complete
  await modalfunction(); // Wait for modalfunction to complete
});
</script>
