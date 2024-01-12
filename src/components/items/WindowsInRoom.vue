<template>
  <div class="window border border-secondary rounded p-2 mb-2">
    <div class="top-row d-flex">
      <div class="window-name fw-bold pe-3">{{ window.name }}</div>
      <div class="room-name text-muted">{{ window.roomName }}</div>

      <div
        class="open-status ms-auto"
        :class="{ open: isWindowOpen, closed: !isWindowOpen }"
      >
        <template v-if="isWindowOpen"> <span class="icon">&#x2B24;</span> Open </template>
        <template v-else> <span class="icon">&#x2716;</span> Closed </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WindowsInRoom',
  props: ['window'],
  computed: {
    isWindowOpen: function () {
      return this.window.windowStatus !== 'CLOSED';
    },
  },
};
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
</style>
