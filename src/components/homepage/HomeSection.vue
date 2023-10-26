<template>
    <div class="homepage-section" id="home">
        <div id = "welcome-section">
            <div id = "welcome-wrap">
                <h1 id="welcome-1">Made for gamers.</h1>
                <h1 id="welcome-2">Game on a budget !</h1>
                <p>Connect with other players, find everything about your favorite games. What are you waiting for?</p>
                <RouterLink to = "/profile"  id = "start-button" class="btn btn-danger" style ="background-color:rgb(206,2,65)"> Get Started 
                    <i class="bi bi-arrow-right "></i>
                </RouterLink>
            </div>
        </div>

        <div class = "featured-deals">
            <div id="featured-wrapper">
            <h2 id="featured-games">Featured Games</h2>
            <div id="my_carousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active" data-bs-interval="3000">
                            <img src="../images/game1.jpg"  alt="..." >
                            <div id= "carousel-footer">FIFA 23
                                <i class="bi bi-steam"></i>
                                <img src = "../images/epic_logo.svg" alt="Icon" class="svg-icon">
                            </div>
                        </div>
                        <div class="carousel-item" data-bs-interval="2000">
                        <img src="../images/game2.jpg"  alt="..." >
                            <div id= "carousel-footer">FAR CRY 4
                            <i class="bi bi-steam"></i>
                            <img src = "../images/epic_logo.svg" alt="Icon" class="svg-icon">
                            </div>
                        </div>
                        <div class="carousel-item" data-bs-interval="2000">
                        <img src="../images/game3.jpg"  alt="..." >
                            <div id= "carousel-footer">GTA V
                                <i class="bi bi-steam"></i>
                                <img src = "../images/epic_logo.svg" alt="Icon" class="svg-icon">
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#my_carousel" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#my_carousel" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.svg-icon{
    width:30px;
    height:35px;
    padding-bottom: 5px;
    padding-left: 5px;
}

#welcome-1{
    color:bisque;
}

#welcome-2{
    color:cyan
}

#featured-games{
    width: 250px;
    padding-left: 10px;
    background-color: rgb(230, 230, 0);
}

.carousel-inner > .carousel-item > img {
    width:100%;
    height:400px;
  }


#carousel-footer{
    height: 40px;
    font-weight: bold;
    font-size: 20px;
    background-color: white;
    border-color: black;
    border-style: solid;
    border-width: 1px;
    padding-top: 5px;
    padding-left: 5px;
}

#my_carousel{
    width: 800px;
}

.featured-deals{
    width:65%;
    display:flex;
    justify-content: center;
    align-items: center;
}

#welcome-section{
    width:35%;
    display:flex;
    padding-left: 7%;
    justify-content: center;
    align-items: center;
}

#welcome-wrap{
    font-weight: bold;
    color:white;
}

#welcome-wrap p{
    font-size: 1.2rem;
}

#welcome-wrap h1{
    text-transform: uppercase;
}


</style>