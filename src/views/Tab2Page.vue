<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Jakarta Weather</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Jakarta Weather</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- <ExploreContainer name="Tab 2 page" /> -->

      <!-- jalankan fungsi getDataWeather ketika tombol di klik -->
       <ion-button @click="getDataWeather" expand="block" >Ambil Data</ion-button>

            <ion-grid :fixed="true">

              <!-- perulangan untuk atribut hourlyList dan dibatasi sampai 10 -->
                <ion-row v-for="item in hourlyList.slice(0,10)" :key="item.time">
                    <ion-col>
                        <ion-card>
                            <ion-row>
                              <ion-col>
                                <ion-card-header>
                                  <ion-card-title> Jakarta </ion-card-title>

                                  <!-- menampilkan data per jam menggunakan fungsi format time agar rapi -->
                                  <ion-card-subtitle> {{ formatTime(item.time) }} </ion-card-subtitle>
                                </ion-card-header>
                              </ion-col>
                              <ion-col style="text-align: center; justify-content: center;">
                                <ion-card-content>

                                  <!-- menampilkan suhu per jam -->
                                    <h2 style="font-weight: bold; color: black; font-size: 24px;">
                                      {{ item.temperature }} °C
                                    </h2>
                                </ion-card-content>
                              </ion-col>
                            </ion-row>                      
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonCol, IonRow } from '@ionic/vue';
import { defineComponent } from 'vue';
import EndPointAccess from '../services/EndPointAccess';
// import ExploreContainer from '@/components/ExploreContainer.vue';

let resData: any

export default defineComponent({
  name: 'Weather',
    data() {
        return {
            dataWeather: null,
            hourlyList: []
        }
    },
  methods: {

    // fungsi ketika klik tombol ambil data 
      getDataWeather(){
          resData = new

          // consume API dari class EndPointAccess
          EndPointAccess('https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m') 

          // jalankan fungsi asynchronous dari class EndPointAccess
          resData.getRes().then((response: any) => {

            // simpan data response dari API
            this.dataWeather = response
            console.log("🚀 ~ response:", response)

            // pisahkan atribut hourly dari dataWeather
            const {time, temperature_2m} = response.data.hourly
            
            // lakukan perulangan atribut hourly dan simpan kedalam array hourlyList
            this.hourlyList = time.map((t: string, i: number) => ({
              time: t,
              temperature: temperature_2m[i],
            }))
          })
      },
      formatTime(t: string){
        return new Date(t).toLocaleString('id-ID', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
  },
  components: {
      IonButton,
      IonCard,
      IonContent,
      IonHeader,
      IonPage,
      IonTitle,
      IonGrid,
      IonRow,
      IonCol,
      IonToolbar,
      IonCardContent,
      IonCardHeader,
      IonCardTitle
  }
})

</script>

<style scoped>
  ion-button {
    margin: 16px 8px;
  }

  ion-card {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
</style>
