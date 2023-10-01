<template>
    <header></header>
  
    <main>
     
  
      <h1>Cevapla</h1>
  
    </main>
  </template>
  
  <script>
  
  
  
  export default {
  
  
    data() {
      message: 5;
      return {
        message: 5,
      };
      
    },
  
    methods: {
      up: function () {
        this.message++;
      },
    
    },
  };
  
  
  </script>
  <style scoped>
  .box {
    width: 45%;
    border: 1px solid white;
    border-radius: 5px;
    text-align: center;
  }
  
  .box:hover {
    filter: brightness(1.1);
  }
  .box:active {
    filter: brightness(1.5);
  }
  
  h1 {
    color: Blue;
    margin-top: 30px;
    text-align: center;
  }
  </style>
  