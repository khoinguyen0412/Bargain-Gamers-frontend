<script setup>
    import {RouterView } from 'vue-router'
    import { cookieValidate } from './checkToken'
    
    window.addEventListener("load",function(){
        setTimeout(function(){
            $("#loader-wrapper").fadeOut("slow",function(){
            $(this).remove()
        })
        },1000)
    })

</script>


<template>
    <div id= "loader-wrapper">
        <span class="loader"><span class="loader-inner"></span></span>
    </div>
    <RouterView />
</template>


<style>

body{
    font-family: 'Nunito';
}

#loader-wrapper {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgb(0,117,199);
    display:flex;
    justify-content: center;
    align-items: center;
    z-index: 101;
    visibility: visible;
  }

  .loader {
    display: inline-block;
    width: 30px;
    height: 30px;
    position: relative;
    border: 4px solid #Fff;
    animation: loader 2s infinite ease;
  }
  .loader-inner {
    vertical-align: top;
    display: inline-block;
    width: 100%;
    background-color: #fff;
    animation: loader-inner 2s infinite ease-in;
  }
  
  @keyframes loader {
    0% { transform: rotate(0deg);}
    25% { transform: rotate(180deg);}
    50% { transform: rotate(180deg);}
    75% { transform: rotate(360deg);}
    100% { transform: rotate(360deg);}
  }
  
  @keyframes loader-inner {
    0% { height: 0%;}
    25% { height: 0%;}
    50% { height: 100%;}
    75% { height: 100%;}
    100% { height: 0%;}
  }

</style>
