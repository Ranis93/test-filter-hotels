<template>
  <div id="App">
    <div class="basic">
      <AppAside />
      <AppMain />
    </div>
  </div>
</template>

<script>
import AppMain from '../components/AppMain.vue'
import AppAside from '../components/AppAside.vue'
import allHotels from '../assets/hotels.json'
export default {
  name: 'IndexPage',
  components: { AppMain, AppAside },
  created () {
    this.$store.commit('data/setHotels', { value: allHotels })
  }
}
</script>
<style>
*, *::before, *::after {
  box-sizing: border-box;
  font-family: 'PT Sans';
}
img{
  width: 100%;
  height: 100%;
}
#App{
  margin: 56px 0 108px 0;
}
.basic{
  display: flex;
  column-gap: 40px;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 20px;
}
</style>
