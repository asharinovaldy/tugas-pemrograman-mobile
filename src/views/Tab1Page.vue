<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cryptocurrency</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Cryptocurrency</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- refresher -->
      <ion-refresher slot="fixed" @ionRefresh="onRefresh">
        <ion-refresher-content pulling-text="Tarik untuk memuat ulang" refreshing-text="Memuat..." />
      </ion-refresher>

      <!-- tombol refresh untuk jalankan fungsi refreshData -->
      <ion-button @click="refreshData" expand="block" style="margin: 12px 8px;">Refresh</ion-button>

      <!-- spinner -->
      <div v-if="initialLoading" class="ion-text-center ion-padding">
        <ion-spinner />
      </div>

      <!-- pesan error jika  -->
      <ion-text color="danger" v-else-if="error && !coins.length">
        <p class="ion-padding ion-text-center">{{ error }}</p>
      </ion-text>

      <!-- list data -->
      <ion-list v-else lines="none" class="coin-list">
        <ion-item v-for="coin in coins" :key="coin.id" class="coin-item">
          <ion-grid>
            <ion-row>
              <ion-col> 
                <ion-label>Rank</ion-label>
                <ion-text>
                  <h1>   
                    {{ coin.rank }}
                  </h1>
                </ion-text>
              </ion-col>
              <ion-col> 
                <ion-label>{{ coin.name }}</ion-label>
                <ion-text>
                  <h1>   
                    {{ coin.symbol }}
                  </h1>
                </ion-text>
              </ion-col>
              <ion-col> 
                <ion-label>Price</ion-label>
                <ion-text>
                  <h1>   
                    {{ coin.price_usd }}
                  </h1>
                </ion-text>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>

      <!-- infinite scroll -->
      <ion-infinite-scroll :disabled="reachedEnd || !coins.length" threshold="150px" @ion-infinite="onInfinite">
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Memuat lebih banyak..." />
      </ion-infinite-scroll>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonGrid, IonRow, IonText, IonInfiniteScroll, IonInfiniteScrollContent, InfiniteScrollCustomEvent, IonButton, RefresherCustomEvent, IonRefresher, IonRefresherContent, IonSpinner } from '@ionic/vue';
import { onMounted, ref } from 'vue';
import EndPointAccess from '@/services/EndPointAccess';

// definisikan struktur data yang akan ditampilkan
interface Coin {
  id: string,
  symbol: string,
  name: string,
  rank: number,
  price_usd: string,
  percent_change_24h: string,
  market_cap_usd: string
}

// constant untuk jumlah data per request
const PAGE_SIZE = 50

// constant untuk batas akhir data
const MAX_COINS = 100

// consume API dengan class EndPointAccess
const api = new EndPointAccess('https://api.coinlore.net/api/tickers/')

// coins adalah array berisi interface Coin
const coins = ref<Coin[]>([])

// true jika halaman awal dimuat dan pengendali spinner
const initialLoading = ref(false)

// pesan error
const error = ref('')

// true jika data habis, mematikan infinite scroll
const reachedEnd = ref(false)
let busy = false

// load data ketika halaman ditampilkan
onMounted( async () => {
  initialLoading.value = true
  busy = true
  await loadFirstPage()
  busy = false
  initialLoading.value = false
})

// fungsi ini digunakan untuk saat awal hlaaman dimuat dan refresh
const loadFirstPage = async () => {
  error.value = ''
  try {
    const res = await api.getRes({ start: 0, limit: PAGE_SIZE })
    coins.value = res.data.data
    reachedEnd.value = false
  } catch (e: any) {
    error.value = `Gagal memuat data ... ${e.message}` 
  }
}

// fungsi klik tombol refresh
const refreshData = async () => {
  if (busy) return
  busy = true
  initialLoading.value = true
  await loadFirstPage()
  initialLoading.value = false
  busy = false
}

// fungsi refresher ionic
const onRefresh = async (event: RefresherCustomEvent) => {
  if (!busy) {
    busy = true
    await loadFirstPage()
    busy = false
  }
  event.target.complete()
}

const onInfinite = async (event: InfiniteScrollCustomEvent) => {
  if (busy) {
    event.target.complete()
    return
  }
  busy = true
  try {
    const res = await api.getRes({start: coins.value.length, limit: PAGE_SIZE})
    const next: Coin[] = res.data.data

    const ids = new Set(coins.value.map((c) => c.id))
    coins.value.push(...next.filter((c) => !ids.has(c.id)))

    if (next.length < PAGE_SIZE || coins.value.length >= MAX_COINS) {
      reachedEnd.value = true
    }
  } catch(e) {
    reachedEnd.value = true
  } finally {
    busy = false
    event.target.complete()
  }
}

</script>

<style scoped>

.coin-list {
  padding: 0 12px;
  background: transparent;
}

.coin-item {
   --background: #fff3cd;          
  --border-color: #e6c35c;         
  --border-width: 1px;
  --border-style: solid;
  --padding-start: 12px;
  --inner-padding-end: 12px;
  --min-height: 56px;
  margin-bottom: 2px;
}

</style>