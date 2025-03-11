<script setup>
import NavbarComponent from './components/layout/NavbarComponent.vue';
import AllRoomComponent from './components/layout/AllRoomComponent.vue';
</script>

<template>
  <!-- <div class="main-container"> -->
      <img src="./assets/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg" class="image" alt="image" />
      <NavbarComponent/>
      <AllRoomComponent/>
  <!-- </div> -->
</template>

<style scoped>
.image{
  width: 100%; 
  height: 50vh;  
  object-fit:cover;  
  position: absolute; 
  top: 0;
  left: 0;
}


</style>
