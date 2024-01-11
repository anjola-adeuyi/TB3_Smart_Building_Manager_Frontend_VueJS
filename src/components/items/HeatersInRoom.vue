<template>
  <div class="heater border border-secondary rounded p-2 mb-2">

    <div class="top-row d-flex">
      <div class="heater-name fw-bold pe-3">{{heater.name}}</div>
      <div class="room-name text-muted">{{heater.roomName}}</div>

      <div class="open-status ms-auto" :class="{open: isHeaterOn, closed: !isHeaterOn}">
        <template v-if="isHeaterOn">
          <span class="icon">&#x2B24;</span> On
        </template>
        <template v-else>
          <span class="icon">&#x2716;</span> Off
        </template>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'HeatersInRoom',
  props: ['heater'],
  computed: {
    isHeaterOn: function() {
      return this.heater.heaterStatus !== "OFF";
    }
  }
}
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
</style>
