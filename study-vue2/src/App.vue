<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
     <img alt="Vue logo" src="./assets/logo.png">
    <hello-world></hello-world>
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  components: {
    HelloWorld
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style scoped>
#app{
  background: #ccc;
}
.hello >>> p{
  color: red;
  border: 4px solid #42b983;
}
</style>