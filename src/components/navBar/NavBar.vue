
<script>
    import { mapState } from 'vuex';
    export default{
        computed:{
            ...mapState(['authenticated']) 
            
        },

        data(){
            return{
                dropDown: false,
            }
        },

        methods: {
            dropDownProfile(){
                const dropDown = document.getElementById("user-dropdown")
                const profilePicture =document.getElementById("profile-img")

                dropDown.style.display = "block"

                document.addEventListener("click", function (event) {
                    if (event.target !== profilePicture && event.target !== dropDown) {
                        dropDown.style.display = "none";
                        }
                    });
                

                profilePicture.addEventListener("click", function (event) {
                    event.stopPropagation()
                    if (dropDown.style.display === "block") {
                        dropDown.style.display = "none";
                    } else {
                        dropDown.style.display = "block";
                    }
                    });
                },

            toggleDropDown(){
                this.dropDown = !this.dropDown;

                if(this.dropDown){
                    document.getElementById("user-dropdown").style.display = "block";
                }
                else{
                    document.getElementById("user-dropdown").style.display = "none";
                }
            },

            closeDropdown(event){
                if(this.dropDown && !document.getElementById('user-dropdown').contains(event.target)){
                    this.dropDown = false
                    document.getElementById("user-dropdown").style.display = "none";
                }
            }

        },

        mounted(){
            document.addEventListener("click", this.closeDropdown)
        }
    }

</script>


<template>
    <header class="p-2 bg-dark">
      
      <div id="logo-container">
          <RouterLink :to = "{name:'home'}">
              <img id = "site-logo" src ="../images/site-logo.png">
          </RouterLink>
          <div id="site-name">
              <RouterLink :to = "{name:'home'}">Bargain Gamers</RouterLink>
          </div>
      </div>
     
      
      <div id="home-nav">
            <div v-if="$route.path === '/'">
                <a class="home box activeBox" id="box-home">
                Home</a>
                <a class="about box" id="box-about">
                About</a>
                <a class="more box" id="box-more">
                More</a>
            </div>
      </div>
      
            <div v-if = "!authenticated" class = "text-end auth-container">
                        <RouterLink v-if="$route.path==='/'" to="/auth" id="login-button">Join Us</RouterLink>
                        <button v-if="$route.path==='/auth'" id="login-button-active">Join Us</button>
            </div>

            <div v-else class="auth-container">
                <div class="username">nguyenkhoi2227</div>
                <div class="profile-pic">
                    <img id= "profile-img" class="profile-img" src="../images/default-profile.jpg" alt="profile-pic" @click="toggleDropDown">
                    <div class="user-action" id="user-dropdown"></div>
                </div>
            </div>
    </header>
</template>

<style scoped>
    #site-logo{
        height: 80px;
        width:80px;
    }

    #site-name{
        display:flex;
        font-size: 30px;
        align-items: center;
    }

    a{
        text-decoration: none;
    }

    header{
        font-family: 'Roboto';
        display: flex;
        width:100vw;
        z-index: 100;
        position:fixed;
        caret-color: transparent;
        
    }

    #logo-container{
        display: flex;
        width: 30%;
    }

    #home-nav{
        display:flex;
        width: 40%;
        height:80px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 58px;
    }

    .auth-container{
        display: flex;
        align-items: flex-end;
        justify-content:end;
        width: 30%;
        margin-bottom: 15px;
        color:white;
        padding-right: 15px;
    }

    #site-name a{
    text-decoration: none;
    color: white;
    }

    #site-name:hover{
        cursor: pointer;
    }

    #login-button{
    width:95px;
    height: 37.6px;
    padding: 0.375rem 0.75rem;
    border: 1px solid transparent;
    font-weight: 400;
    text-align: center;
    border-radius: 5px;
    border-color: #0dcaf0;
    background-color: transparent;
    color:#0dcaf0;
    margin-right: 10px;
    }

    #login-button-active{
        width:95px;
        height: 37.6px;
        padding: 0.375rem 0.75rem;
        border: 1px solid transparent;
        font-weight: 400;
        text-align: center;
        border-radius: 5px;
        border-color: black;
        background-color: #0dcaf0;
        color: black;
        margin-right: 10px;
        pointer-events: none;
    }

    #login-button:hover{
    box-shadow: inset 0 0 20px rgba(255, 255, 255, .5), 0 0 20px rgba(255, 255, 255, .2);
    text-shadow: 1px 1px 2px #427388; 
    }

    .box{
    position: relative;
    width: 80px;
    height:35px;
    text-align: center;
    padding-top: 4px;
    float: left;
    margin: 0 20px;
    text-transform: uppercase;
    color:white;
    font-size: 20px;
    background-color: transparent;
    border-color: transparent;
    }

    .activeBox {
    background:rgb(206,2,65);
    height: 37px;
    border-radius: 5px;
    }

    @media (hover: hover) {
    .box:hover{
        cursor: pointer;
        border: 2px solid rgb(206,2,65);
        border-width: 0 medium 0 medium;
  }
}

.username{
    height:50px;
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 1.1rem;
}

.profile-pic{
    height: 50px;
    width:50px;
    position: relative;
}


.profile-img{
    z-index:105px;
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
    cursor: pointer;
    white-space: nowrap;
}

.user-action{
    display: none;
    position: absolute;
    background-color: white;
    height: 100px;
    width: 200px;
    bottom: -105px;
    left: -155px;
}

.user-action:focus{

}

   
</style>