<template>
  <div
    class="heater border border-secondary rounded p-2 mb-2"
    :class="{ expanded: isExpanded }"
  >
    <template v-if="isModalVisible">
      <div class="modal-background">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">Are you sure you want to delete {{ heater.name }}?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="toggleModal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="confirmDelete"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div
      class="top-row d-flex"
      @click="toggleExpand"
    >
      <div class="heater-name fw-bold pe-3">{{ heater.name }}</div>
      <div class="room-name text-muted">{{ heater.roomName }}</div>

      <div
        class="open-status ms-auto"
        :class="{ on: isHeaterOn, off: !isHeaterOn }"
      >
        <template v-if="isHeaterOn"> <span class="icon">&#x2B24;</span> On </template>
        <template v-else> <span class="icon">&#x2716;</span> Off </template>
      </div>

      <div class="expand-button ms-2">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>

    <template v-if="isExpanded">
      <hr />
      <div class="details d-flex">
        <button
          type="button"
          class="btn btn-secondary me-2"
          @click="switchHeater"
        >
          {{ isHeaterOn ? 'Off' : 'On' }} heater
        </button>
        <button
          type="button"
          class="btn btn-danger {modal: isModalVisible}"
          @click="toggleModal"
        >
          Delete heater
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import { API_HOST } from '../../config';

export default {
  name: 'HeatersListItem',
  props: ['heater'],
  data: function () {
    return {
      isExpanded: false,
      isModalVisible: false,
    };
  },
  computed: {
    isHeaterOn: function () {
      return this.heater.heaterStatus !== 'OFF';
    },
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    async switchHeater() {
      try {
        let response = await axios.put(`${API_HOST}/api/heaters/${this.heater.id}/switch`);
        let updatedHeater = response.data;
        this.$emit('heater-updated', updatedHeater);
      } catch (error) {
        console.error('Error fetching data : ' + error);
      }
    },
    async deleteHeater() {
      await axios.delete(`${API_HOST}/api/heaters/${this.heater.id}`);
      this.$emit('heater-delete', this.heater);
    },
    async confirmDelete() {
      await this.deleteHeater();
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.open-status {
  .icon {
    position: relative;
  }

  &.on {
    color: #198754;
    .icon {
      font-size: 12px;
      top: -3px;
    }
  }

  &.off {
    color: #dc3545;
  }
}

.heater {
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
