<script setup>
    import HomeSection from "./HomeSection.vue"
    import AboutSection from "./AboutSection.vue"
    import MoreSection from "./MoreSection.vue"

</script>

<script>
export default {
    mounted(){
        // this.scrollToMemorized()
        const navElements = document.querySelectorAll(".box")
        const wrapper = document.querySelectorAll(".wrapper")[0]
        const sections = document.querySelectorAll(".homepage-section")
        for(var navElement of navElements){
            navElement.addEventListener("click", function(e){
                for(var inElement of navElements){
                    inElement.classList.remove("activeBox")
                }
                e.target.classList.add("activeBox");
            })
            }
        
        navElements.forEach(element=>{
        element.addEventListener("click", () => {
            document.querySelector("#"+ element.id.split("box-")[1]).scrollIntoView({behavior: "smooth",block: "nearest", inline: "start"})
            if(element.id.split("box-")[1] == "about"){
                document.querySelector("."+ element.id.split("box-")[1]+"-background").classList.add("fade-in")
                document.querySelector("."+ element.id.split("box-")[1]+"-section").classList.add("fade-top")
            }
           
        })

        })

        wrapper.addEventListener("scrollend", () => {
            var current = ''
            var x = wrapper.scrollLeft
            sections.forEach(section => {

        // offsetLeft calculates the most left position of the section to the the left side of the parent element
        // getBoundingClientRect.left calculates the distance between the left side of the section to the left side of the current window
            const sectionDistance = section.offsetLeft - section.getBoundingClientRect().left/3
            if (x == sectionDistance){
                current= section.getAttribute('id')
            }
        })

    // Click the section button
        navElements.forEach(element=>{
                if(element.id.split("box-")[1] == current){
                    document.getElementById(element.id).click();
                }
            })
            
        })
        wrapper.addEventListener("scrollend", this.handleScroll)
    },

    methods:{
        handleScroll(){
            var scrollPosition = document.getElementsByClassName('activeBox')[0].id.split("box-")[1]
            document.cookie = "scrollPosition=" + scrollPosition + "; path=/"
        },
        
        scrollToMemorized(){
            var lastSection = this.getCookie("scrollPosition")
            if (lastSection != null || lastSection != undefined){
                document.querySelector("#"+ lastSection).scrollIntoView(true)
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
</script >

<template>
    <HomeSection class="shared-style"></HomeSection>
    <AboutSection class="shared-style"></AboutSection>
    <MoreSection class="shared-style"></MoreSection>
    
</template>

<style scoped>

body {
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevent default scrollbars */
}
.wrapper{
    scroll-snap-type: y mandatory;
    display: flex;
    flex-direction: column;
    height: 300%;
    width: 100vw;
    overflow-y: scroll;
}

.wrapper::-webkit-scrollbar{
    display: none;
}


.shared-style{
    flex:1;
    cursor:default;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    background-image: url(../images/background-image.jpg);
    min-height: 100vh;
    max-width: 100vw;
    display: flex;
    caret-color: transparent;
}

</style>
