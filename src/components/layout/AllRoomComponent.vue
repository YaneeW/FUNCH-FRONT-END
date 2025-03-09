<template>
  <div class="allroom-container">
    <div class="card-room">
        <BRow>
            <BCol class="bg-white relative" cols="6">
                <span class="label">Deluxe Room</span>
                <BCarousel
                controls
                indicators
                background="#ababab"
                interval="3000"
                >
                    <BCarouselSlide
                        v-for="(type, key) in superior"
                        :key="key"
                        :img-src="type.room_images"
                        class="slide"
                    >
                    </BCarouselSlide>
                </BCarousel>

            </BCol>
            <BCol class="bg-white relative" cols="6">
                <span class="label">Superior Room</span>
                <BCarousel
                controls
                indicators
                background="#ababab"
                interval="3000"
                >
                    <BCarouselSlide
                        v-for="(type, key) in deluxe"
                        :key="key"
                        :img-src="type.room_images"
                        class="slide"
                    >
                    </BCarouselSlide>
                </BCarousel>

            </BCol>
        </BRow> 

    </div>
  </div>
</template>

<script>
import { BCarousel, BCarouselSlide } from "bootstrap-vue-next";
import {API} from "../../api";
import axios from 'axios'

export default {
    data(){
        return{
            rooms: [],
            superior: [],
            deluxe: []
        }
    },
    mounted(){
        this.getAllRoom()
    },
    methods: {
        getAllRoom(){
            try{
                API.get("rooms/room-types")
                .then(response=>{
                    // console.log("response",response)
                    if(response.status === 200){
                        // this.rooms = response.data.data
                        response.data.data.forEach(room=>{
                            if(room.room_type === 'เตียงเดี่ยว'){
                                this.superior.push(room)
                            }else{
                                this.deluxe.push(room)
                            }
                        })
                    }
                    console.log("room",this.superior,this.deluxe)
                })
                .catch(error=>{
                    console.log("error",error)
                })
            }
            catch(error){
                console.log("error",error)
            }
        }
    },
    components: {
        BCarousel,
        BCarouselSlide
    }

}
</script>

<style lang="scss">
@use "../../sass/allroom.scss"
</style>