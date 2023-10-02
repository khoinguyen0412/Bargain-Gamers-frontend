<template>

    <div id="overlay" class="overlay hidden">
        <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

</template>


<style scoped>

.overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); 
    backdrop-filter: blur(5px); 
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 999; 
}

</style>