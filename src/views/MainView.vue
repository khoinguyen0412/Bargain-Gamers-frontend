<script setup>
    import NavBar from '../components/navBar/NavBar.vue';
</script>


<template>
    <NavBar></NavBar>
    <main>
        <div class="section" style="background-color: aqua;">Section 1</div>
        <div class="section" style="background-color: black;">Section 2</div>
        <div class="section" style="background-color: red;">Section 3</div>
    </main>
</template>

<style scoped>
.section{
    height: 100vh;
    width:100vw;
    color: grey;
}

</style>