<script setup>
    import NavBar from '../components/navBar/NavBar.vue';
    import ProfileSection from '../components/profilepage/ProfileSection.vue';
    import InfoSection from '../components/profilepage/InfoSection.vue';
    import loadingOverlay from '../components/loadingOverlay.vue';
</script>

<script>
    export default{
        components: {
            ProfileSection,
            InfoSection,
        },

        data(){
            return{
                briefInfo:{
                    username:null,
                    joinedDate:null,
                },
                detailedInfo:{
                    allow_edit: null,
                    age:null,
                    email:null,
                    gender:null,
                    location:null,
                    posts:null,
                    username:null,
                },
                loadingState:true,
            }
        },
        mounted(){
            const paramUsername = this.$route.params.username
            const vm = this

            async function fetchData(){
                try{
                    const response = await vm.axios.get(`api/user/${paramUsername}`)
                    const resultData = response.data['resultData']
                    if (resultData.allow_edit){
                        vm.detailedInfo.email = resultData.email;
                        vm.detailedInfo.location = resultData.location;
                    }
                    vm.briefInfo.username = resultData.username
                    vm.detailedInfo.username = resultData.username

                    const receiveDate = new Date(resultData['join_date'])
                    const timezoneOffsetMinutes = new Date().getTimezoneOffset();
                    const convertedDate = new Date(receiveDate.getTime() - timezoneOffsetMinutes * 60000);
                    // Use toLocaleDateString with options to get month in word form
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    const formattedDate = convertedDate.toLocaleDateString(undefined, options);
                    vm.briefInfo.joinedDate = "Joined " +formattedDate

                    vm.detailedInfo.allow_edit = resultData.allow_edit;
                    vm.detailedInfo.age= resultData.age;
                    vm.detailedInfo.gender = resultData.gender;
                    vm.detailedInfo.posts = resultData.posts

                }
                catch(error){
                    console.error(error)
                }
            }

            async function loadData(){
               try{
                 const response = await fetchData()
                 vm.loadingState = false;
               }catch(error){
                    console.error(error)
               }
            }
            loadData()
        }
    }
</script>

<template>
    <NavBar></NavBar>
    <main>
        <loadingOverlay></loadingOverlay>
        <ProfileSection :dataProp="briefInfo" :loadingState="loadingState"></ProfileSection>
        <InfoSection ref="InfoRef" :dataProp="detailedInfo" :loadingState="loadingState"></InfoSection>
    </main>
</template>

<style scoped>

main{
    background-color: gray;
    padding-top: 96px;
    height: 100vh;
    display:flex
}

</style>