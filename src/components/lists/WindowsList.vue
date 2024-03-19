<template>
  <div class="windows-list pt-3">
    <template v-if="!isWindowCreationVisible">
      <div class="d-flex mb-2">
        <button
          type="button"
          class="btn btn-primary"
          @click="toggleWindowCreation"
        >
          Create new window
        </button>
      </div>

      <windows-list-item
        v-for="window in windows"
        :window="window"
        :key="window.id"
        @window-updated="updateWindow"
        @window-delete="deleteWindow"
      >
      </windows-list-item>
    </template>

    <template v-if="isWindowCreationVisible">
      <div class="d-flex mb-2">
        <button
          type="button"
          class="btn btn-primary me-2"
          @click="createWindow"
        >
          Create
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="toggleWindowCreation"
        >
          Cancel
        </button>
      </div>

      <template v-if="isProblem">
        <div
          class="alert alert-danger"
          role="alert"
        >
          An unexpected problem occurred, the window could not be created
        </div>
      </template>

      <form>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Window name"
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
import WindowsListItem from '../items/WindowsListItem.vue';

export default {
  components: {
    WindowsListItem,
  },
  name: 'WindowsList',
  data: function () {
    return {
      /* Initialize windows while waiting to be retrieved from the API */
      windows: [],
      isWindowCreationVisible: false,
      rooms: [],
      room: '',
      name: '',
      isProblem: false,
    };
  },
  created: async function () {
    try {
      let response = await axios.get(`${API_HOST}/api/windows`);
      this.windows = response.data;
      console.log('Windows:', this.windows);

      let response2 = await axios.get(`${API_HOST}/api/rooms`);
      this.rooms = response2.data;
      console.log('Rooms:', this.rooms);

      let response3 = await axios.get(`${API_HOST}/api/sensor`);
      console.log('Sensors:', response3.data);

      // eslint-disable-next-line no-console
      console.log({ this: this });
    } catch (error) {
      console.error('Error fetching data : ' + error);
    }
  },
  methods: {
    toggleWindowCreation() {
      this.isWindowCreationVisible = !this.isWindowCreationVisible;
      this.isProblem = false;
    },
    updateWindow(newWindow) {
      /* Find the place of window object with the same Id in the array, and replace it */
      let index = this.windows.findIndex((window) => window.id === newWindow.id);
      console.log('update window', newWindow);
      this.windows.splice(index, 1, newWindow);
    },
    deleteWindow(delWindow) {
      /* Find the place of window object with the same Id in the array, and delete it */
      let index = this.windows.findIndex((window) => window.id === delWindow.id);
      this.windows.splice(index, 1);
    },
    async createWindow() {
      if (this.name !== '') {
        try {
          let response = await axios.post(`${API_HOST}/api/windows`, {
            name: this.name,
            windowStatus: 'CLOSED',
            roomId: this.room,
          });
          this.windows.push(response.data);
          this.toggleWindowCreation();
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
