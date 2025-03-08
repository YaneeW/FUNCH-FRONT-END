<script setup>
import HelloWorld from './components/HelloWorld.vue'
import NavbarComponent from './components/NavbarComponent.vue';
</script>

<template>
  <div>
      <img src="./assets/manuel-moreno-DGa0LQ0yDPc-unsplash.jpg" class="image" alt="image" />
  </div>
  <NavbarComponent/>
</template>

<style scoped>
.image{
  width: 100%; 
  height: 50vh;  
  object-fit:cover;  
  position: absolute; 
  top: 0;
  left: 0;
  /* z-index: -1; */
}
</style>
