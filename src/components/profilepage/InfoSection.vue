<script>

    export default{
        props:{
            dataProp: Object,
            loadingState: Boolean,
        },

        data(){
            return{
                editMode:false,
                loadedCountry:false,
                countryDropdown:null,
                timeout:null,
                inputAge:null,
            
                formData:{
                    username:'',
                    age: '',
                    gender: '',
                    location: '',  
                },
                
                overlay:null,
            }
        },

        computed:{
            submitState(){
                for (const key in this.formData){
                    if (this.formData[key] != this.dataProp[key] && this.formData[key] != ''){
                        return true
                    }
                }
                return false
            },


            displayGender(){
                let temp = this.dataProp.gender
                return temp ? (temp == 1 ? "Male":"Female") : "N/A"
            },

           
        },

    
        watch:{
           dataProp: {
                handler(newValue) {
                // Here, you can access the new and old values of the "user" prop
                    this.inputAge = `${newValue.age}`
                },
                deep: true,
           }
        },

        mounted(){
            this.overlay = document.getElementById("overlay")
        },

        methods: {
            toggleEditMode(){
                if(this.editMode){
                    this.editMode = false;
                    document.getElementById("edit-button").innerHTML = "Edit"
                    document.getElementById("form-header").innerHTML = "Information"
                }
                else{
                    this.editMode = true;
                    document.getElementById("edit-button").innerHTML = "Back"
                    document.getElementById("form-header").innerHTML = "New Information"
                    if(!this.loadedCountry){
                        this.populateCountry()
                    }
                }
            },

            saveAge(){
                this.formData.age = `${this.inputAge}`
            },

            delayUpdate(){
                clearTimeout(this.timeout)
                this.timeout = setTimeout(()=>{
                    this.saveAge()
                },500)
            },

            async populateCountry(){
                try{
                    let countries = []
                    const response = await this.axios.get('https://restcountries.com/v3.1/all')
                    const data = response.data
                    this.countryDropdown = document.getElementById("countryDropdown")

                    data.forEach(country => {
                        countries.push(country.name.common)
                    })
                    countries = countries.filter(e => e !== this.dataProp.location)
                    countries.sort()
                    countries.forEach(country => {
                        const option = document.createElement("option")
                        option.value = country
                        option.text = country
                        this.countryDropdown.appendChild(option)
                    });
                    
                }catch(error) {
                    console.error(error)
                }
            },

            limitSize(){
                if(this.countryDropdown.options.length>5){
                    this.countryDropdown.size=8
                }
            },

            onChange(){
                this.countryDropdown.size=0
            },

            async checkChanges(){
                if(this.dataProp.age == this.formData.age){
                    this.formData.age = null
                }
                if(this.dataProp.gender == this.formData.gender){
                    this.formData.age = null
                }
                if(this.dataProp.location == this.formData.location){
                    this.formData.age = null
                }
            },

            async saveChanges(){
                try{
                    await this.checkChanges()
                    this.overlay.style.display = "flex"
                    const response = await this.axios.patch(`/api/user/${this.dataProp.username}/edit`,{
                        username: this.formData.username,
                        age:this.formData.age,
                        gender:this.formData.gender,
                        location:this.formData.location,
                    })
                    if (response.data['code'] = '0'){
                        this.overlay.style.display = "none"
                        toastr.options.positionClass = 'toast-top-center'
                        toastr.options.closeButton = 'true'
                        toastr.success("Changes saved")
                        setTimeout(() => {
                            location.reload();
                        }, 2000);

                    }
                    else{
                        this.overlay.style.display = "none"
                        toastr.options.positionClass = 'toast-top-center'
                        toastr.options.closeButton = 'true'
                        toastr.warning("Something went wrong")
                    }
                }catch(error){
                    this.overlay.style.display = "none"
                    console.log(error)
                }
            }
        }
    }
</script>

<template>
    <div class = "container">
        <div class="card bg-dark">
            <div class = "card-header">
                <div id="form-header">Information</div>
                <button v-if="dataProp.allow_edit" @click="toggleEditMode" class="btn btn-info edit-button" id="edit-button">
                    Edit 
                </button>
            </div>

            <div v-if="loadingState" class="card-body overlay">
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
                <div class="skeleton"></div>
            </div>


            <div v-else-if="!loadingState && !dataProp.allow_edit" class="card-body">
                <div class="info-tag">Age:
                    <div class="detail-info">{{ dataProp.age }}</div>
                </div>
                <div class="info-tag">Gender:
                    <div class="detail-info">{{ displayGender }}</div>
                </div>
                <div class="info-tag">Posts:
                    <div class="detail-info">{{ dataProp.posts }}</div>
                </div>
                
            </div>

            <div v-else-if="editMode && !loadingState && dataProp.allow_edit" class="card-body">
                    <form id="edit-form" action="" method="POST" @submit.prevent="saveChanges">
                        <label for="age" class="col-form-label">Age</label>
                        <div class="col-2 changeInput">
                            <input v-if = "!dataProp.age" type = "number" class="form-control" name="age" min="0" max="100" v-model="inputAge" placeholder="0 - 100" @input="delayUpdate">
                            <input v-else type = "number" class="form-control" name="age" min="0" max="100" v-model="inputAge" :placeholder=dataProp.age @input="delayUpdate">
                        </div>

                        <label for="gender" class="col-form-label">Gender</label>
                        <div class="col-2 changeInput" style="position: relative;">
                            <select class="form-control" name="gender" v-model="formData.gender">
                                <option v-if="dataProp.gender" value="">{{ displayGender }}</option>
                                <option v-else value="">-- Select Gender --</option>
                                <option v-if="dataProp.gender!=1" value="1">Male</option>
                                <option v-if="dataProp.gender!=2" value="2">Female</option>
                            </select>
                        </div>      

                        <label for="location" class="col-form-label">Country</label>
                        <div class="col-4 changeInput" style="position: relative;">
                            <select  class="form-control" name="location" id="countryDropdown" v-on:mousedown="limitSize" @change="onChange" @blur="onChange" v-model="formData.location">
                                <option value="">{{ dataProp.location }}</option>
                            </select>
                        </div>
                        <div class="submit-div">
                            <button id="submit-change" type="submit" class="btn btn-primary col-5" v-show="submitState">Save Changes</button>
                        </div>
                    </form>
            </div>

            <div v-else class="card-body">
                <div class="info-tag" id="email">Email:
                    <div  class="detail-info">{{ dataProp.email }}</div>
                </div>
                <div class="info-tag">Age:
                    <div class="detail-info">{{ dataProp.age }}</div>
                </div>
                <div class="info-tag">Gender:
                    <div class="detail-info">{{ displayGender }}</div>
                </div>
                <div  class="info-tag" id="location">Country:
                    <div v-if="dataProp.location" class="detail-info">{{ dataProp.location}}</div>
                    <div v-else class="detail-info">N/A</div>
                </div>
                <div class="info-tag">Posts:
                    <div class="detail-info">{{ dataProp.posts }}</div>
                </div>
              
            </div>
        </div>
    </div>
</template>


<style scoped>

.overlay{
    height: 100%;
    width:100%
}

.card{
    width: 55vw;
    height: 70vh;
}

.col-form-label{
    color: white;
}

.changeInput{
    margin-bottom: 25px;
}

#errorInput{
    display: none;
    margin-top: 50px;
    max-height: 70px;
    color:red;
    overflow-y: auto;
}

.skeleton{
    animation: skeleton-loading 1s linear infinite alternate;
    color:transparent !important;
    height: 0.8rem !important;
    width: 100%;
    margin-top: 20px;
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

#edit-form{
    height:100%;
    font-size: 1.2rem;
}

.submit-div{
    display: flex;
    justify-content: center;
}

#submit-change{
    position: absolute;
    bottom: 5vh;
}

.skeleton:last-child{
    width:80% !important;
}


.card-header{
    height: 8vh;
    color:cyan;
    display: flex;
    align-items: center;
    font-size: 2.0rem;
    border-bottom: 3px solid black;
    position: relative;
}

.edit-button{
    position: absolute;
    right:10px;
    top: 10px;
    width: 65px;
    border-radius: 5px;
}

#countryDropdown{
    cursor: pointer;
    position: absolute;
    z-index: 5;
}

.info-tag{
    margin-top: 10px;
    color: gray;
    font-size: 1.6rem;
}

.detail-info{
    color:white;
    display: inline-block;
    margin-left: 2vh;
    font-size: 1.4rem;
}


.container{
    width:60%;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>