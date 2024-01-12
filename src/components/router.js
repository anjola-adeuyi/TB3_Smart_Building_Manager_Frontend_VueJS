import { createRouter, createWebHistory } from 'vue-router';
import WindowsComponent from './lists/WindowsList.vue';
import RoomsComponent from './lists/RoomsList.vue';
import BuildingsComponent from './lists/BuildingsList.vue';
import HeatersComponent from './lists/HeatersList.vue';

const routes = [
  { path: '/', redirect: '/windows' },
  { path: '/windows', component: WindowsComponent, name: 'windows', alais: '/' },
  { path: '/rooms', component: RoomsComponent, name: 'rooms' },
  { path: '/buildings', component: BuildingsComponent, name: 'buildings' },
  { path: '/heaters', component: HeatersComponent, name: 'heaters' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
