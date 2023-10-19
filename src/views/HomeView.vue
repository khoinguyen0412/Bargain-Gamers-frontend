<script setup>
import HomeSection from '../components/homepage/HomeSection.vue';
import AboutSection from '../components/homepage/AboutSection.vue';
import MoreSection from '../components/homepage/MoreSection.vue';
import NavBar from '../components/navBar/NavBar.vue';
</script>

<script>
export default{
  mounted(){
        this.scrollToMemorized()
        const navElements = document.querySelectorAll(".box")
        const sections = document.querySelectorAll(".homepage-section")


        function checkClass(){
          const trackedElement = document.getElementById('box-about')
          if (trackedElement.classList.contains('activeBox')){
            document.querySelector(".about-background").classList.add("fade-in")
            document.querySelector(".about-section").classList.add("fade-top")
          }
        }
       
        const observer = new MutationObserver(checkClass);
        // Start observing changes in the class list of the element
        observer.observe(document.getElementById('box-about'), { attributes: true, attributeFilter: ['class'] });

        
        navElements.forEach(element=>{
        element.addEventListener("click", () => {
            document.querySelector("#"+ element.id.split("box-")[1]).scrollIntoView({behavior: "smooth",block: "nearest", inline: "start"})
            })
        })

        window.addEventListener("scrollend", () => {
            var current = ''
            sections.forEach(section => {
        // offsetLeft calculates the most left position of the section to the the left side of the parent element
        // getBoundingClientRect.left calculates the distance between the left side of the section to the left side of the current window
            const sectionDistance = section.offsetTop - section.clientHeight/3
            if (window.scrollY >= sectionDistance){
                current= section.getAttribute('id')
            }
        })
        // console.log(current)
        document.querySelector("#"+ (`box-${current}`)).click()
  
        navElements.forEach((navElement)=>{
            navElement.classList.remove("activeBox")
            if(navElement.classList.contains(current)){
              navElement.classList.add("activeBox")
            }
        })
            
        })
      window.addEventListener("scrollend", this.handleScroll)
    },

    methods:{
        handleScroll(){
            var scrollPosition = document.getElementsByClassName('activeBox')[0].id.split("box-")[1]
            document.cookie = "scrollPosition=" + scrollPosition + "; path=/"
        },
        
        scrollToMemorized(){
            var lastSection = this.getCookie("scrollPosition")
            if (lastSection != null || lastSection != undefined){
                // document.querySelector("#"+ lastSection).scrollIntoView(true)
                const element = document.getElementById(lastSection)
                window.scrollTo({
                      top: element.offsetTop,
                      left: element.offsetLeft,
                      behavior: 'auto'
                    });
            }
            else{
                document.querySelector("#home").scrollIntoView(true)
            }
        },

        // Get the value of the cookie
        getCookie(name){
            const cookieString = document.cookie
            const cookies = cookieString.split("; ");
            for (const cookie of cookies){
                const [cookieName,cookieValue] = cookie.split("=")
                
                if (cookieName === name){
                    return decodeURIComponent(cookieValue)
                }
            }
            return null
        }
    }
}

</script>

<template>
  <NavBar class="nav-bar"></NavBar>
  <main>
    <div class="home-wrapper">
      <HomeSection class="shared-style"></HomeSection>
      <AboutSection class="shared-style"></AboutSection>
      <MoreSection class="shared-style"></MoreSection>
    </div>
  </main>
  
</template>

<style scoped>
 body {
      overflow: hidden;
}
.home-wrapper{
    scroll-snap-type: y mandatory;
    height: 100vh;
    width: 100%;
    /* overflow-y: scroll; */
}

.nav-bar{
  width: 99.2vw;
} 
.home-wrapper::-webkit-scrollbar{
  background: #5555;
  width: 0.8vw;
} 

.home-wrapper::-webkit-scrollbar-thumb{
  background-color: gray;
}


.shared-style{
    padding-top: 96px;
    scroll-snap-align: start;
    scroll-snap-stop: end;
    flex:1;
    cursor:default;
    background-image: url(../components/images/background-image.jpg);
    height: 100vh;
    display: flex;
    caret-color: transparent;
    
}

</style>



