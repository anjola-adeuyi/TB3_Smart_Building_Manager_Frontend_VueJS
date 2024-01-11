import { createRouter, createWebHistory } from 'vue-router';
import WindowsComponent from './lists/WindowsList.vue';
import RoomsComponent from './lists/RoomsList.vue';
import BuildingsComponent from './lists/BuildingsList.vue';
import HeatersComponent from './lists/HeatersList.vue';

const routes = [
    { path: '/windows', component: WindowsComponent },
    { path: '/rooms', component: RoomsComponent },
    { path: '/buildings', component: BuildingsComponent },
    { path: '/heaters', component: HeatersComponent }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
