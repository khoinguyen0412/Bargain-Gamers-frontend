<script>
    export default{
        data(){
            return{
                signUpData: {
                    email: '',
                    username: '',
                    password: ''
                },
                loginData:{
                    username: '',
                    password: '',
                },
                overlay:null,
                loginMessage: null,
                registerMessage:null,
            }
        },

        methods:{
            clickRegisterTab(){
                var RegisterTab = document.getElementById('pills-register-tab')
                RegisterTab.click()
            },

            clickLoginTab(){
                var LoginTab = document.getElementById('pills-login-tab')
                LoginTab.click()
            },

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

            async handleLogin(){
                const errorLogin = document.getElementById('errorLogin')
                this.overlay.style.display = 'flex'
                const vm = this
    
                await this.axios.post('/api/login',{
                    username: this.loginData['username'],
                    password: this.loginData['password'],
                })
                .then(response =>{
                    if(response.data['code'] != 1){
                        errorLogin.style.display = 'block'
                        this.$store.dispatch('authenticate')
                        window.location.href='/main';
    
                    }
                    else{
                        const errorArray = []
                        for (const field in response.data['messageObject']) {
                                errorArray.push(response.data['messageObject'][field]);
                        }
                        this.loginMessage = errorArray
                        errorLogin.style.display = 'block'

                    }
                    this.overlay.style.display = 'none'
                    
                })
                .catch(error =>{
                    this.loginMessage = null
                    errorLogin.style.display = 'none'
                    this.overlay.style.display = 'none'
                    console.log(error)
                })
            },
            
            async handleRegister(){
                const errorRegister = document.getElementById('errorRegister')

                this.overlay.style.display = 'flex'
                
                await this.axios.post('/api/register',{
                        username: this.signUpData['username'],
                        email: this.signUpData['email'],
                        password: this.signUpData['password'],
                    })
                    .then(response => {
                        if(response.data['code'] != 0){
                            const errorArray = []
                            for (const field in response.data["messageObject"]) {
                                errorArray.push(...response.data['messageObject'][field])
                            }
                            this.registerMessage = errorArray
                            errorRegister.style.display = 'block'
                            
                        }
                        else{
                            this.registerMessage = null
                            errorRegister.style.display = 'none'
                            toastr.options.positionClass = 'toast-top-center'
                            toastr.options.closeButton = 'true'
                            toastr.success("Susccesfully register! Please log in again.")
                            const registerInputs = document.querySelectorAll('#register-form input')
                            for (var i = 0; i < registerInputs.length; i++) {
                                registerInputs[i].value = '';
                            }
                            this.clickLoginTab()
                        }
                        this.overlay.style.display = 'none'
                        
                        })
                    .catch(error => {
                    this.registerMessage = null
                    errorRegister.style.display = 'none'
                    this.overlay.style.display = 'none'
                    console.error(error);
                    });
                },
            
            },

            mounted(){
                var registerLink = document.getElementById('register-link')
                this.overlay = document.getElementById('overlay')
                const vm = this

                registerLink.addEventListener('click', function(e){
                    e.preventDefault()
                    vm.clickRegisterTab()
                })

                
            },
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
                                                    <input type="text" id="login-name" class="form-control" name="name" v-model.lazy="loginData.username" required autofocus autocomplete="on">
                                                </div>

                                            </div>
                                        </div>

                                        <div class="mb-2 row">
                                            <div class="row align-items-start">
                                                <div class="col-2">
                                                <label for="password" class="col-form-label">Password</label>
                                                </div>
                                                <div class="col-13 password-container">
                                                    <input type="password" id="password" class="form-control" name="password" v-model.lazy="loginData.password" required autofocus autocomplete="on">
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

                                        <div class="errorInput" id = "errorLogin">
                                                <ul >
                                                    <li v-for="value in loginMessage">
                                                        {{ value }}
                                                    </li>
                                                </ul>
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
                                                        <label for="email" class="col-form-label">Email</label>
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
                                                        <input type="text" id="name" class="form-control" name="name" v-model.lazy ="signUpData.username" required autofocus >
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="mb-3 row">
                                                <div class="row align-items-start">
                                                    <div class="col-2">
                                                    <label for="password" class="col-form-label">Password</label>
                                                    </div>
                                                    <div class="col-13 password-container" >
                                                        <input type="password" id="password-register" class="form-control" name="password" v-model.lazy="signUpData.password" required autofocus autocomplete="off">
                                                        <i class="bi bi-eye-slash" id = "show-password-register" @click ="showPasswordRegister()"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="errorInput" id = "errorRegister">
                                                <ul >
                                                    <li v-for="value in registerMessage">
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
    width: 100%;
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

    .errorInput{
        color:red;
        overflow-y: auto;
        display: none;
        padding-right: 20px;
        max-height: 70px;

    }
   
</style>