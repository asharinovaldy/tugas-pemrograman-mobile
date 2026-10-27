<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    Data Users
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen="true" >
            <ion-header collapse="condense" translucent="true">
                <ion-toolbar>
                    <ion-title size="large">Data Users</ion-title>
                </ion-toolbar>
            </ion-header>
            <!-- <ExploreContainer name="Tab 4 Page" /> -->

            <ion-button @click="getDataUsers" >Ambil Data</ion-button>
            <ion-grid :fixed="true">
                <ion-row v-for="user in dataUsers" :key="user.id">
                    <ion-col>
                        <ion-card>
                            <ion-card-header>
                              <ion-card-title> {{ user.name }} </ion-card-title>
                              <ion-card-subtitle> {{ user.email }} </ion-card-subtitle>
                            </ion-card-header>
                            <ion-card-content>
                                {{ user.company.name }}
                            </ion-card-content>
                            <ion-button fill="clear">action 1</ion-button>
                        </ion-card>
                    </ion-col>
                </ion-row>
            </ion-grid>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { defineComponent } from 'vue';
import EndPointAccess from '../services/EndPointAccess';

let resData: any;


export default defineComponent ({
    // name: 'Tab4',
    // components: {
    //     ExploreContainer, IonHeader, IonContent, IonPage, IonTitle, IonToolbar
    // }
    
    name: 'Users',
    data() {
        return {
            dataUsers: null
        }
    },
    methods: {
        getDataUsers(){
            resData = new
            EndPointAccess('https://jsonplaceholder.typicode.com/users')
            resData.getRes().then((response: any) => (this.dataUsers = response.data))
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