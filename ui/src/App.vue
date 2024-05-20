<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <AddTask></AddTask>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import AddTask from './components/AddTask.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    AddTask
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
