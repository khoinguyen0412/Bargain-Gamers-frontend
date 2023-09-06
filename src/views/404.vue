<script>

</script>


<template>
    <div class = "container">
        <div class="error-message">
            <h1 style="color:red; margin-right: 10px;">404</h1>
            <h1>The page you find doesn't exist</h1>
        </div>
        <RouterLink to = "/"  id = "start-button" class="btn btn-danger" style ="background-color:rgb(206,2,65)"> Go Back Home
        </RouterLink>
    </div>
</template>

<style scoped>
    .container{
        width:100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    h1{
        font-size: 3rem;
    }

    .error-message{
        margin-bottom: 20px;
        display: inline-flex;
    }
    

</style>

