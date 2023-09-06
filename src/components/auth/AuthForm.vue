<script setup>
    import axios from 'axios'
</script>

<script>
    export default{
        data(){
            return{
                signUpData: {
                    email: '',
                    username: '',
                    password: ''
                },
                responseData:null,
                responseMessage:null,
                csrfToken: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            }
        },

        mounted(){
            var registerLink = document.getElementById('register-link')
            var RegisterTab = document.getElementById('pills-register-tab')
            registerLink.addEventListener('click', function(e){
                e.preventDefault();
                RegisterTab.click()
            })
        },
        methods:{
            showPassword(){
                var x = document.getElementById('password')
                var showPassword = document.getElementById('show-password-login')
                showPassword.classList.toggle("bi-eye")

                if(x.type == 'password'){
                    x.type = 'text'
                }
                else{
                    x.type = 'password'
                }
            },

            showPasswordRegister(){
                var x = document.getElementById('password-register')
                var showPassword = document.getElementById('show-password-register')
                showPassword.classList.toggle("bi-eye")


                if(x.type == 'password'){
                    x.type = 'text'
                }
                else{
                    x.type = 'password'

                }
            },

            handleLogin(){
                axios.get('/sanctum/csrf-cookie').then(response=>{
                    console.log(response)
                })
            },
            
            async handleRegister(){
                await axios.get('/sanctum/csrf-cookie')
                await axios.post('/api/register',{
                    username: this.signUpData['username'],
                    email: this.signUpData['email'],
                    password: this.signUpData['password'],
                })
                .then(response => {
                    console.log(response)
                    if(response.data['code'] != 0){
                        this.responseMessage = response.data["messageObject"];
                        const errorArray = []
                        for (const field in this.responseMessage) {
                            errorArray.push(...this.responseMessage[field]);
                        }
                        this.responseMessage = errorArray
                    }
                    else{
                        this.responseMessage = null
                    }
                   
                    })
                .catch(error => {
                console.error(error);
                });
            }
        }
    }

</script>

<template>
    <div class="auth-section">
        <div class= "container">
            <div class="wrapper">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="pills-login-tab" data-bs-toggle="pill" data-bs-target="#pills-login" type="button" role="tab" aria-controls="pills-login" aria-selected="true">Login</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-register-tab" data-bs-toggle="pill" data-bs-target="#pills-register" type="button" role="tab" aria-controls="pills-register" aria-selected="false">Register</button>
                    </li>
                </ul>

                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab" tabindex="0">
                        <div class="login-container">
                            <div class="row justify-content-center">
                                <div class="col-md-9">
                                    <form id ="login-form" action="" method="POST" @submit.prevent = "handleLogin" >
                                        <div class="mb-2 row">
                                            <div class="row align-items-start">
                                                <div class="col-2">
                                                    <label for="name" class="col-form-label">Username</label>
                                                </div>
                                                <div class="col-13">
                                                    <input type="text" id="login-name" class="form-control" name="name"  required autofocus autocomplete="on">
                                                </div>

                                            </div>
                                        </div>

                                        <div class="mb-2 row">
                                            <div class="row align-items-start">
                                                <div class="col-2">
                                                <label for="password" class="col-form-label">Password</label>
                                                </div>
                                                <div class="col-13 password-container">
                                                    <input type="password" id="password" class="form-control" name="password"  required autofocus autocomplete="on">
                                                    <i class="bi bi-eye-slash" id = "show-password-login" @click ="showPassword()"></i>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-2 row">
                                            <div class="row align-items-start">
                                                <div>
                                                    <button type="submit" class="btn btn-primary col-12 submit-button" >
                                                    Log In
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div class="row">
                                            <div class="row align-items-start">
                                                <div class="extra-section col-12">
                                                        <p>Forgot Password?</p>
                                                        <p id ="register-link">Not a user yet ? Register now</p>
                                                </div>     
                                            </div>      
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab" tabindex="0">
                            <div class="register-container">
                                <div class="row justify-content-center">
                                    <div class="col-md-9">
                                        <form id ="register-form" action="" method="POST" @submit.prevent = "handleRegister">
                                            <div class="mb-2 row">
                                                <div class="row align-items-start">
                                                    <div class="col-2">
                                                        <label for="name" class="col-form-label">Email</label>
                                                    </div>
                                                    <div class="col-13">
                                                        <input type="email" id="email" class="form-control" name="email" v-model.lazy = "signUpData.email" required autofocus>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mb-2 row">
                                                <div class="row align-items-start">
                                                    <div class="col-2">
                                                        <label for="name" class="col-form-label">Username</label>
                                                    </div>
                                                    <div class="col-13">
                                                        <input type="text" id="name" class="form-control" name="name" v-model.lazy ="signUpData.username" required autofocus>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="mb-3 row">
                                                <div class="row align-items-start">
                                                    <div class="col-2">
                                                    <label for="password" class="col-form-label">Password</label>
                                                    </div>
                                                    <div class="col-13 password-container" >
                                                        <input type="password" id="password-register" class="form-control" name="password" v-model.lazy="signUpData.password" required autofocus >
                                                        <i class="bi bi-eye-slash" id = "show-password-register" @click ="showPasswordRegister()"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="errorInput">
                                                <ul >
                                                    <li v-for="value in responseMessage">
                                                        {{ value }}
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="mb-2 row">
                                                <div class="row align-items-start">
                                                    <div>
                                                        <button type="submit" class="btn btn-primary col-12 submit-button" >
                                                        Register
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
            <div id="auth-image"></div>
        </div>
    </div>
</template>


<style scoped>

    #register-link:hover{
        text-decoration: underline;
    }
   .auth-section{
    display:flex;
    height:100vh;
    align-items: center;
    justify-content: center;
    overflow-x:hidden;
    overflow-y: hidden;
    background-image: url(../images/background-image.jpg);
   }

   .container{
        background-color: white;
        display:flex;
        height: 500px;
        width: 776px;
        padding-left: 0px;
        padding-right: 0px;
        margin-top: 50px;
        border-radius: 8px;
   }

   .wrapper{
    width: 70%;
   }

   
   .login-container{
    margin-top: 25px;
   }

   

   .extra-section{
    margin-top: 10px;
    text-align: center;
   }

   .extra-section p{
    cursor: pointer;
    display: block;
    color:grey;
    caret-color: transparent;
    margin: 0;
   }

   .extra-section p:hover{
        text-decoration: underline;
   }

   :focus{ 
        outline: none; 
   }

   .tab-content{
    width:100%;
   }

   #pills-tab{
    justify-content: center;
    border-color: black;
    border-bottom: solid 2px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top-left-radius: 6px;
    background-color: rgba(128,128,128,0.5);
   }

   .submit-button{
    margin-top: 10px;
   }

   #auth-image{
    background-image: url('../images/auth-background.jpg');
    background-size: cover;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    width:30%;
    filter: brightness(0.7);
   }

   .nav-pills .nav-link.active {
    background-color: rgb(206,2,65) !important;
}

    .nav-link{
        color:black;
        font-weight: bold;
}

    .password-container{
        position: relative;
    }

    .bi{
        font-size: 1.5rem;
        position: absolute;
        top:10%;
        right:5%;
        cursor:pointer;
        caret-color: transparent;
    }

    #errorInput{
        color:red;
        overflow-y: auto;
        padding-right: 20px;
        max-height: 70px;

    }
   
</style>