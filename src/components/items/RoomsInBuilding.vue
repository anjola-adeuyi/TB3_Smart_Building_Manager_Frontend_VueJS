<template>
  <div class="room border border-secondary rounded p-2 mb-2">

    <div class="top-row d-flex">
      <div class="room-name fw-bold pe-3">{{room.name}}</div>
      <div class="building-name text-muted">{{room.buildingName}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'RoomsInBuilding',
  props: ['room']
}
</script>

<style lang="scss" scoped>
</style>
