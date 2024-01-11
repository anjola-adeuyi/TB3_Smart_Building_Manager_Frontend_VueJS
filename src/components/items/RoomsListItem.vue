<template>
  <div class="border border-secondary rounded p-2 mb-2">

    <template v-if="isModalVisible">
      <div class="modal-background">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              Are you sure you want to delete {{room.name}}?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="toggleModal">Close</button>
              <button type="button" class="btn btn-primary" @click="deleteRoom">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="top-row d-flex">
      <div class="fw-bold pe-3">{{ room.name }}</div>
      <div class="text-muted">{{ "floor " + room.floor }}</div>
      <div class="details ms-auto">
        <button type="button" class="btn btn-danger" @click="toggleModal">Delete room</button>
      </div>
    </div>
    <hr>

    <windows-in-room v-for="window in room.windows"
                       :window="window"
                       :key="window.id"
    >
    </windows-in-room>

    <heaters-in-room v-for="heater in room.heaters"
                     :heater="heater"
                     :key="heater.id"
    >
    </heaters-in-room>

  </div>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../../config';
import WindowsInRoom from "./WindowsInRoom.vue";
import HeatersInRoom from "./HeatersInRoom.vue";

export default {
  name: 'RoomsListItem',
  components: {HeatersInRoom, WindowsInRoom},
  props: ['room'],
  data: function() {
    return{
      name: "",
      isModalVisible: false
    }
  },
  computed: {
  },
  methods: {
    async deleteRoom() {
      await axios.delete(`${API_HOST}/api/rooms/${this.room.id}`);
      this.$emit("room-delete", this.room);
    },
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
  }
}
</script>

<style lang="scss" scoped>

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

.window {
  .top-row {
    cursor: pointer;
  }
}

.modal-background {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
