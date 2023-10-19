<template>
    <div class="homepage-section" id="about">
        <div class= "wrapper">
            <div class = "about-section">
                <div class= "about-para">
                    <h1>Why Bargain Gamers</h1>
                    <div>This is the community for gamers (who are on a budget).
                        Why buying original-price games instead of on-sale ones ? Wishing all the users a good price hunting.</div>
                </div>
                <div class= "about-connect">
                    <h1>Connect with me</h1>
                    <div id="social-icons">
                        <a href="" class="text-white me-4" id = "social-network">
                            <i class="bi bi-facebook" width="32" height="32"></i>
                        </a>
                        <a href="https://t.me/khoinguyen0412" class="text-white me-4" id = "social-network">
                            <i class="bi bi-telegram"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/khoi-nguyen-1698a4199/" class="text-white me-4" id = "social-network">
                            <i class="bi bi-linkedin"></i>
                        </a>
                        <a href="https://github.com/khoinguyen0412" class="text-white me-4" id = "social-network">
                            <i class="bi bi-github"></i>
                        </a>
                    </div>
                </div>
            </div>
            <img class = "about-background" src = "../images/final-about-v2.png">
        </div>
    </div>
</template>


<style scoped>
.wrapper{
    width: 100vw;
    position: relative;
}

.about-section{
    display: flex;
    height: 350px;
    padding-top: 100px;
    opacity:1;
    transform: translateY(-150px);
    transition: 1.5s all ease;
}

.about-section div{
    flex: 1;
}

.about-section.fade-top{
  transform: translateY(0);
}


#social-icons{
    padding-top: 15px;
}

i{
    font-size: 2rem;
    padding-left: 20px;
}



.about-para{
    padding-left: 140px;
}

.about-para h1{
    color:cyan;
}

.about-para div{
    padding-top: 15px;
    color: white;
    font-size: 1.2rem;
}

.about-connect{
    text-align: center;
    color:cyan;
}

 .about-background.fade-in{
  transform: translateY(0);
  opacity: 0.6;
} 


.about-background{
    position: absolute;
    bottom:0;
    height:500px;
    width: 100%;
    opacity: 0;
    transform: translateY(150px);
    transition: 1.5s all ease;
}


</style>