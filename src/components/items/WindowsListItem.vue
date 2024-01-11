<template>
  <div class="window border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">

    <template v-if="isModalVisible">
      <div class="modal-background">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-body">
              Are you sure you want to delete {{window.name}}?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="toggleModal">Close</button>
              <button type="button" class="btn btn-primary" @click="confirmDelete">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div class="top-row d-flex" @click="toggleExpand">
      <div class="window-name fw-bold pe-3">{{window.name}}</div>
      <div class="room-name text-muted">{{window.roomName}}</div>

      <div class="open-status ms-auto" :class="{open: isWindowOpen, closed: !isWindowOpen}">
        <template v-if="isWindowOpen">
          <span class="icon">&#x2B24;</span> Open
        </template>
        <template v-else>
          <span class="icon">&#x2716;</span> Closed
        </template>
      </div>

      <div class="expand-button ms-2">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>

    <template v-if="isExpanded">
      <hr/>
      <div class="details d-flex">
        <button type="button" class="btn btn-secondary me-2" @click="switchWindow">{{ isWindowOpen ? 'Close' : 'Open' }} window</button>
        <button type="button" class="btn btn-danger {modal: isModalVisible}" @click="toggleModal">Delete window</button>
      </div>
    </template>

  </div>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../../config';

export default {
  name: 'WindowsListItem',
  props: ['window'],
  data: function() {
    return {
      isExpanded: false,
      isModalVisible: false
    }
  }, 
  computed: {
    isWindowOpen: function() {
      return this.window.windowStatus !== "CLOSED";
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
    async switchWindow() {
      try {
        let response = await axios.put(
            `${API_HOST}/api/windows/${this.window.id}/switch`)
        let updatedWindow = response.data;
        this.$emit("window-updated", updatedWindow);
      } catch (error) {
        console.error("Error fetching data : " + error);
      }
    },
    async deleteWindow() {
      await axios.delete(`${API_HOST}/api/windows/${this.window.id}`);
      this.$emit("window-delete", this.window);
    },
    async confirmDelete() {
      await this.deleteWindow();
      this.toggleModal();
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
