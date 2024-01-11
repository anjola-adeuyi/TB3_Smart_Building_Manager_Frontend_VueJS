<template>
  <div class="border border-secondary rounded p-2 mb-2">

    <template v-if="isModalVisible">
      <div class="modal-background">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              Are you sure you want to delete {{building.name}}?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="toggleModal">Close</button>
              <button type="button" class="btn btn-primary" @click="deleteBuilding">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="top-row d-flex">
      <div class="fw-bold pe-3">{{ building.name }}</div>
      <div class="details ms-auto">
        <button type="button" class="btn btn-danger" @click="toggleModal">Delete building</button>
      </div>
    </div>
    <hr>

    <rooms-in-building v-for="room in building.rooms"
                     :room="room"
                     :key="room.id"
    >
    </rooms-in-building>

  </div>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../../config';
import RoomsInBuilding from "./RoomsInBuilding.vue";

export default {
  name: 'BuildingsListItem',
  components: {RoomsInBuilding},
  props: ['building'],
  data: function() {
    return{
      name: "",
      isModalVisible: false
    }
  },
  computed: {
  },
  methods: {
    async deleteBuilding() {
      await axios.delete(`${API_HOST}/api/buildings/${this.building.id}`);
      this.$emit("building-delete", this.building);
    },
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    }
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

.room {
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
