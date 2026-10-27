<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Gallery</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Gallery</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-button @click="getDataGalleries">Ambil Data</ion-button>
      <ion-grid :fixed="true">
        <ion-row v-for="gallery in dataGalleries" :key="gallery.id">
          <ion-col>
                <ion-card>
                  <img :src="gallery.url" :alt="gallery.title">
                  <ion-card-header>
                    <ion-card-title> {{ gallery.title }} </ion-card-title>
                  </ion-card-header>
              </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- <ExploreContainer name="Tab 3 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';
import EndPointAccess from '@/services/EndPointAccess';

let resData: any

export default defineComponent({
  name: 'Galleries',
  data() {
    return {
      dataGalleries: null
    }
  },
  methods: {
    getDataGalleries(){
      resData = new
      EndPointAccess('https://jsonplaceholder.typicode.com/photos')
      resData.getRes().then((response: any) => (this.dataGalleries = response.data))
    }
  },
  components: {
        IonContent,
        IonHeader,
        IonPage,
        IonTitle,
        IonToolbar,
        IonCard,
        IonCardHeader,
        IonCardTitle
  } 
})


</script>
