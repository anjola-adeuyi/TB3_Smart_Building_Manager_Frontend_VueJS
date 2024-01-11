<template>
  <div class="rooms-list pt-3">
    <template v-if="!isRoomCreationVisible">
      <div class="d-flex mb-2">
        <button
          type="button"
          class="btn btn-primary"
          @click="toggleRoomCreation"
        >
          Create new room
        </button>
      </div>

      <rooms-list-item
        v-for="room in rooms"
        :room="room"
        :key="room.id"
        @room-delete="deleteRoom"
      >
        <div class="details">
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteRoom"
          >
            Delete room
          </button>
        </div>
      </rooms-list-item>
    </template>

    <template v-if="isRoomCreationVisible">
      <div class="d-flex mb-2">
        <button
          type="button"
          class="btn btn-primary me-2"
          @click="createRoom"
        >
          Create
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="toggleRoomCreation"
        >
          Cancel
        </button>
      </div>

      <template v-if="isProblem">
        <div
          class="alert alert-danger"
          role="alert"
        >
          An unexpected problem occurred, the room could not be created
        </div>
      </template>

      <form>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Room name"
          v-model="name"
        />
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Current temperature"
          v-model="currentTemp"
        />
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Target temperature"
          v-model="targetTemp"
        />
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Floor"
          v-model="floor"
        />
        <select
          class="form-select"
          v-model="building"
        >
          <option
            value=""
            disabled
            selected
          >
            -- Select building --
          </option>
          <option
            class="bg-zinc-900"
            v-for="b in buildings"
            v-bind:key="b.id"
            :value="b.id"
          >
            {{ b.name }}
          </option>
        </select>
      </form>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import { API_HOST } from '../../config';
import RoomsListItem from '../items/RoomsListItem.vue';
import { initialBuildings, initialRooms } from '../../initialData';

export default {
  components: {
    RoomsListItem,
  },
  name: 'RoomsList',
  data: function () {
    return {
      rooms: initialRooms,
      buildings: initialBuildings,
      isRoomCreationVisible: false,
      isProblem: false,
      name: '',
      currentTemp: '',
      targetTemp: '',
      floor: '',
      building: '',
    };
  },
  created: async function () {
    try {
      let response = await axios.get(`${API_HOST}/api/rooms`);
      this.rooms = response.data;
      console.log('Rooms:', this.rooms);

      let response2 = await axios.get(`${API_HOST}/api/buildings`);
      this.buildings = response2.data;
      console.log('Buildings:', this.buildings);
    } catch (error) {
      console.error('Error fetching data : ' + error);
    }
  },
  methods: {
    toggleRoomCreation() {
      this.isRoomCreationVisible = !this.isRoomCreationVisible;
      this.isProblem = false;
    },
    async createRoom() {
      if (this.name !== '' && this.currentTemp !== '' && this.floor) {
        try {
          let response = await axios.post(`${API_HOST}/api/rooms`, {
            name: this.name,
            currentTemp: this.currentTemp,
            targetTemp: this.targetTemp,
            floor: this.floor,
            buildingId: this.building,
          });
          this.rooms.push(response.data);
          this.toggleRoomCreation();
        } catch (error) {
          this.isProblem = true;
        }
      } else {
        this.isProblem = true;
      }
    },
    deleteRoom(delRoom) {
      let index = this.rooms.findIndex((room) => room.id === delRoom.id);
      this.rooms.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.open-status {
  .icon {
    position: relative;
  }

  &.open {
    color: #198754;
    .icon {
      font-size: 12px;
      top: -3px;
    }
  }

  &.closed {
    color: #dc3545;
  }
}
</style>
