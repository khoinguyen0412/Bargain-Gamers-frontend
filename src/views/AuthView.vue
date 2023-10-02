<script setup>
    import NavBar from '../components/navBar/NavBar.vue';
    import AuthForm from '../components/auth/AuthForm.vue';
    import loadingOverlay from '../components/loadingOverlay.vue';
</script>

<template>
    <NavBar></NavBar>
    <main>
        <loadingOverlay></loadingOverlay>
        <AuthForm></AuthForm>
    </main>
</template>

<style></style>

