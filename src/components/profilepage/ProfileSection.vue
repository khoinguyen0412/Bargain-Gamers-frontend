<script>
    export default{
        props:{
            dataProp: Object,
            loadingState: Boolean,
        }
    }

</script>

<template>
    <div class = "container">
        <div class = "card bg-dark">
            <div class = "card-body">
                <div class="profile-pic">
                </div>
                <div v-if="loadingState" class="general-info">
                    <div class="info-content">
                        <div class="username skeleton">
                        </div>
                        <div class="date-joined skeleton">
                        </div>
                    </div>
                </div>
                <div v-else class="general-info">
                    <div class="username">
                        {{ dataProp.username }}
                    </div>
                    <div class="date-joined">
                        {{ dataProp.joinedDate }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>

.skeleton{
    animation: skeleton-loading 1s linear infinite alternate;
    color:transparent !important;
    height: 0.8rem !important;
    width: 100%;
    margin-bottom: 30px;
    border-radius: 10px;
}


@keyframes skeleton-loading{
    0%{
        background-color: hsl(0,0%,30%);
    }

    100%{
        background-color: hsl(0,0%,50%);
    }
}


.card{
    width: 35vw;
    height: 70vh;
}

.info-content{
    width: 100%;
    height:100%;
}

.general-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    color:white;
    font-size: 1.2rem;
    height: 60px;
    width: 60%;
}

.username{
    height: 20px;
    margin-bottom: 30px;
} 
.card-body{
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container{
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-pic{
    background-image: url(../images/default-profile.jpg);
    height: 170px;
    width: 170px;
    background-size: contain;
    border-radius: 85px;
}

</style>