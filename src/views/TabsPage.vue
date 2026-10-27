<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Tab 1</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/weather">
          <ion-icon aria-hidden="true" :icon="cloud" />
          <ion-label>Weather</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/gallery">
          <ion-icon aria-hidden="true" :icon="image" />
          <ion-label>Gallery</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/tabs/users">
          <ion-icon aria-hidden="true" :icon="person" />
          <ion-label>Users</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { cloud, ellipse, image, person, square, star, triangle } from 'ionicons/icons';
</script>
