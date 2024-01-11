<template>
  <div class="heaters-list pt-3">
    <template v-if="!isHeaterCreationVisible">
      <div class="d-flex mb-2">
        <button
          type="button"
          class="btn btn-primary"
          @click="toggleHeaterCreation"
        >
          Create new heater
        </button>
      </div>

      <heaters-list-item
        v-for="heater in heaters"
        :heater="heater"
        :key="heater.id"
        @heater-updated="updateHeater"
        @heater-delete="deleteHeater"
      >
      </heaters-list-item>
    </template>

    <template v-if="isHeaterCreationVisible">
      <div class="d-flex mb-2">
        <button
          type="button"
          class="btn btn-primary me-2"
          @click="createHeater"
        >
          Create
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="toggleHeaterCreation"
        >
          Cancel
        </button>
      </div>

      <template v-if="isProblem">
        <div
          class="alert alert-danger"
          role="alert"
        >
          An unexpected problem occurred, the heater could not be created
        </div>
      </template>

      <form>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Heater name"
          v-model="name"
        />
        <select
          class="form-select"
          v-model="room"
        >
          <option
            value=""
            disabled
            selected
          >
            -- Select room --
          </option>
          <option
            class="bg-zinc-900"
            v-for="r in rooms"
            v-bind:key="r.id"
            :value="r.id"
          >
            {{ r.name }}
          </option>
        </select>
      </form>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import { API_HOST } from '../../config';
import HeatersListItem from '../items/HeatersListItem.vue';
import { initialHeaters, initialRooms } from '../../initialData';

export default {
  components: {
    HeatersListItem,
  },
  name: 'HeatersList',
  data: function () {
    return {
      /* Initialize heaters with an empty array, while waiting for actual data to be retrieved from the API */
      heaters: initialHeaters,
      isHeaterCreationVisible: false,
      rooms: initialRooms,
      room: '',
      name: '',
      isProblem: false,
    };
  },
  created: async function () {
    try {
      let response = await axios.get(`${API_HOST}/api/heaters`);
      this.heaters = response.data;
      console.log('Heaters:', this.heaters);

      let response2 = await axios.get(`${API_HOST}/api/rooms`);
      this.rooms = response2.data;
    } catch (error) {
      console.error('Error fetching data : ' + error);
    }
  },
  methods: {
    toggleHeaterCreation() {
      this.isHeaterCreationVisible = !this.isHeaterCreationVisible;
      this.isProblem = false;
    },
    updateHeater(newHeater) {
      /* Find the place of heater object with the same Id in the array, and replace it */
      let index = this.heaters.findIndex((heater) => heater.id === newHeater.id);
      console.log('update heater', newHeater);
      this.heaters.splice(index, 1, newHeater);
    },
    deleteHeater(delHeater) {
      /* Find the place of heater object with the same Id in the array, and delete it */
      let index = this.heaters.findIndex((heater) => heater.id === delHeater.id);
      this.heaters.splice(index, 1);
    },
    async createHeater() {
      if (this.name !== '') {
        try {
          let response = await axios.post(`${API_HOST}/api/heaters`, {
            name: this.name,
            heaterStatus: 'OFF',
            roomId: this.room,
          });
          this.heaters.push(response.data);
          this.toggleHeaterCreation();
        } catch (error) {
          this.isProblem = true;
        }
      } else {
        this.isProblem = true;
      }
    },
  },
};
</script>

<style lang="scss"></style>
