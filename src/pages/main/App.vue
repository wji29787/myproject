<template>
  <div id="app">
    <Hearders :message="1"></Hearders>  
    <img src="../../assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import Hearders from '../../components/Hearders';
export default {
  name: 'App',
  components:{
    Hearders
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>