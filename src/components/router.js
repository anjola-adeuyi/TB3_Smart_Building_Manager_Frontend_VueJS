import { createRouter, createWebHistory } from 'vue-router';
import WindowsComponent from './lists/WindowsList.vue';
import RoomsComponent from './lists/RoomsList.vue';
import BuildingsComponent from './lists/BuildingsList.vue';
import HeatersComponent from './lists/HeatersList.vue';
import MeasurementComponent from './lists/MeasurementList.vue';

const routes = [
  { path: '/', redirect: '/windows' },
  { path: '/windows', component: WindowsComponent, name: 'windows', alais: '/' },
  { path: '/rooms', component: RoomsComponent, name: 'rooms' },
  { path: '/buildings', component: BuildingsComponent, name: 'buildings' },
  { path: '/heaters', component: HeatersComponent, name: 'heaters' },
  { path: '/measurement', component: MeasurementComponent, name: 'measurement' },
];

// eslint-disable-next-line no-console
console.log({ routes });

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
