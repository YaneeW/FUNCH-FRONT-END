<template>
    <div  class="navbar-container">
        <div v-if="!isLogin" class="navbar">
            <BRow class="content">
                <BCol cols="8">
                    <span class="logo">Heaven Hotel
                        <font-awesome-icon :icon="['fas', 'star']" style="color: #f5f5dc;;" size="xs"/>
                        <font-awesome-icon :icon="['fas', 'star']" style="color: #f5f5dc;;" size="xs"/>
                        <font-awesome-icon :icon="['fas', 'star']" style="color: #f5f5dc;;" size="xs"/>
                        <font-awesome-icon :icon="['fas', 'star']" style="color: #f5f5dc;;" size="xs"/>
                    </span>
                </BCol>
                <BCol cols="2" class="box-booking">
                    <BButton class="btn-auth" v-b-modal.modal-register  @click="resetValue()">Sign up</BButton>
                </BCol>
                <BCol cols="2" class="box-booking">
                    <BButton class="btn-auth" v-b-modal.modal-login @click="resetValue()">Log in</BButton>
                </BCol>
            </BRow>
           
            <BModal id="modal-register" v-model="modalregister" title="register" no-footer no-close-on-backdrop>
                <BRow class="m-b-1">
                    <label for="username">Username<span class="color-red">*</span></label>
                    <BCol>
                        <BFormInput id="username" v-model="form.username"/>
                    </BCol>
                </BRow>
                <BRow class="m-b-1">
                    <label for="phone-number" >Phone number<span class="color-red">*</span></label>
                    <BCol>
                        <BFormInput id="phone-number" v-model="form.phone_number"/>
                    </BCol>
                </BRow>
                <BRow class="m-b-1">
                    <label for="email-register">Email<span class="color-red">*</span></label>
                    <BCol>
                        <BFormInput id="email-regidtor" v-model="form.email"/>
                    </BCol> 
                </BRow>
                <BRow class="m-b-1">
                    <label for="password-regidtor">Password<span class="color-red">*</span></label>
                    <BCol>
                        <BFormInput id="password-register" v-model="form.password"/>
                    </BCol>
                </BRow>
                <span v-if="messageAlert && messageAlert.length !== 0" class="color-red">{{messageAlert}}</span>
                <hr/>
                <div class="m-t-1 p-r-1 content-right">
                    <BButton class="m-r-1" variant="danger" @click="onCancel('register')">Cancel</BButton>
                    <BButton variant="success" @click="register()">Submit</BButton>
                </div>
            </BModal>

            <BModal id="modal-login" v-model="modalLogin" title="Login" no-footer no-close-on-backdrop>
                <BRow class="m-b-1">
                    <label for="email-login">Email<span class="color-red">*</span></label>
                    <BCol>
                        <BFormInput id="email-login" v-model="form.email"/>
                    </BCol> 
                </BRow>
                <BRow class="m-b-1">
                    <label for="password">Password<span class="color-red">*</span></label>
                    <BCol>
                        <BFormInput id="password" v-model="form.password"/>
                    </BCol>
                </BRow>
                <span v-if="messageAlert && messageAlert !== {}" class="color-red">{{messageAlert}}</span>
                <hr/>
                <div class="m-t-1 p-r-1 content-right">
                    <BButton class="m-r-1" variant="danger" @click="onCancel('login')">Cancel</BButton>
                    <BButton variant="success" @click="onLogin()">Log in</BButton>
                </div>
            </BModal>
        </div>

        <div v-else class="navbar">
            <BRow class="content">
                <BCol cols="3">
                    <span class="color-white font-500 label-box">Check in date</span>
                    <div class="relative">
                        <font-awesome-icon :icon="['fas', 'calendar-days']" class="icon-calendar"/>
                        <Datepicker v-model="bookingDetails.check_in_date"
                            class="custom-datepicker"
                        />
                    </div>
                </BCol>
                <BCol cols="3">
                    <span  class="color-white font-500 label-box">Check out date</span>  
                    <div class="relative">
                        <font-awesome-icon :icon="['fas', 'calendar-days']" class="icon-calendar"/>
                        <Datepicker v-model="bookingDetails.check_out_date"
                            class="custom-datepicker"
                        />
                    </div>
                    
                </BCol>
                <BCol cols="3">
                    <span  class="color-white font-500 label-room">Room type</span>
                    <div>
                        <BFormSelect v-model="selectedRoomType" :options="roomTypes"></BFormSelect>
                    </div>
                </BCol>
                <BCol cols="3" class="box-booking">
                    <BButton class="btn-booking" @click="bookRoom()">
                        BOOK NOW
                    </BButton>
                </BCol>
            </BRow>
        </div>


    </div>
    
</template>

<script>
import { BButton, BCol, BContainer, BFormSelect, BModal, BRow } from 'bootstrap-vue-next';
import Datepicker from "vue3-datepicker"
import {API} from "../../api"
import Swal from 'sweetalert2';


export default {
    data(){
        return{
            isLogin: false,
            form: {
                username:null,
                phone_number:null,
                email:null,
                password:null
            },
            modalregister: false,
            modalLogin: false,
            roomTypes: [],
            selectedRoomType: null,
            bookingDetails: {
                user_id: null,  
                room_id: null,  
                check_in_date: null, 
                check_out_date: null
            },
            sessionDetails: {
                user_id: null
            },
            messageAlert: null
          
        }
    },
    methods: {
        onCancel(modal){
            this.form = {
                username:null,
                phone_number:null,
                email:null,
                password:null
            }
            if(modal === 'register'){
                this.modalregister = false
            }else{
                this.modalLogin = false
            }
            
        },
        onLogin() {
            const loginForm = {
                email: this.form.email,
                password: this.form.password
            }

            try{
                API.post("/auth/login", loginForm)
                .then(response=>{
                    Swal.fire({
                        title: "Register sucess",
                        icon: "success",
                        draggable: true
                    });
                    this.isLogin = true;
                    
                })
                .catch(error=>{
                    Swal.fire({
                        title: "Wrong email or password",
                        icon: "warning",
                        draggable: true
                    });
                })
            }
            catch(error){
                Swal.fire({
                        title: "Wrong email or password",
                        icon: "warning",
                        draggable: true
                    });
            }
        },
        register(){
            try{
                API.post("/auth/register",this.form)
                .then(response=>{
                    this.modalregister = false
                    Swal.fire({
                        title: "Register sucess",
                        icon: "success",
                        draggable: true
                    });
                    this.modalLogin = true
                })
                .catch(error=>{
                    this.messageAlert = error.response.data.message === {} ? error.response.data.message:  "Somethig wrong! please try again"
                    console.log("error",error)
                })
            }
            catch(error){
                this.messageAlert = error.response.data.message === {} ? error.response.data.message:  "Somethig wrong! please try again"
                console.log("error",error)
            }
        },
        resetValue(){
            this.form = {
                username:null,
                phone_number:null,
                email:null,
                password:null
            }
            this.messageAlert = null
        },
        async fetchRoomTypes() {
            try {
                const response = await API.get("/rooms/room-types");
      
                this.roomTypes = response.data.data.map(room => ({
                    value: room.room_id, 
                    text: `${room.room_type} Room ${room.room_number}`
                }));
            } catch (error) {
                console.error("Error fetching room types", error);
            }
        },
        async checkSession() {
            try {
                const res = await API.get("/auth/session", { withCredentials: true });
                this.isLogin = res.data.isAuthenticated;
                this.sessionDetails.user_id = res.data.user.user_id;
            } catch (error) {
                console.error("Session Check Failed:", error);
            }
        },
        bookRoom() {
            const req = {
                user_id: this.sessionDetails.user_id,
                room_id: this.selectedRoomType,
                check_in_date: this.bookingDetails.check_in_date,
                check_out_date: this.bookingDetails.check_out_date
            }
            console.log('req', req)
           
            try {
                API.post("/rooms/booking", req) 
                .then(response => {
                    console.log("Room booked successfully");
                })
                .catch(error => {
                    console.log("Error booking room", error);
                });
            } catch (error) {
                console.log("Error", error);
            }
        }

    },
    mounted() {
       this.checkSession();
       this.fetchRoomTypes();
    },
    components: {
        Datepicker
    }
}
</script>

<style lang="scss">
@use "../../sass/navbar.scss";
@use "../../sass/custom.scss"
</style>