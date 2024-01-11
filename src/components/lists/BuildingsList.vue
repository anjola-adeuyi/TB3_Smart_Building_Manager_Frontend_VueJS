<template>
  <div class="buildings-list pt-3">
    <template v-if="!isBuildingCreationVisible">
      <div class="d-flex mb-2">
        <button
          type="button"
          class="btn btn-primary"
          @click="toggleBuildingCreation"
        >
          Create new building
        </button>
      </div>

      <buildings-list-item
        v-for="building in buildings"
        :building="building"
        :key="building.id"
        @building-delete="deleteBuilding"
      >
        <div class="details">
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteBuilding"
          >
            Delete Building
          </button>
        </div>
      </buildings-list-item>
    </template>

    <template v-if="isBuildingCreationVisible">
      <div class="d-flex mb-2">
        <button
          type="button"
          class="btn btn-primary me-2"
          @click="createBuilding"
        >
          Create
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="toggleBuildingCreation"
        >
          Cancel
        </button>
      </div>

      <template v-if="isProblem">
        <div
          class="alert alert-danger"
          role="alert"
        >
          An unexpected problem occurred, the building could not be created
        </div>
      </template>

      <form>
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Building name"
          v-model="name"
        />
        <input
          type="text"
          class="form-control mb-3"
          placeholder="Outside temperature"
          v-model="outsideTemp"
        />
      </form>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import { API_HOST } from '../../config';
import BuildingsListItem from '../items/BuildingsListItem.vue';
import { initialBuildings } from '../../initialData';

export default {
  components: {
    BuildingsListItem,
  },
  name: 'BuildingsList',
  data: function () {
    return {
      buildings: initialBuildings,
      isBuildingCreationVisible: false,
      isProblem: false,
      name: '',
      outsideTemp: '',
    };
  },
  created: async function () {
    try {
      let response = await axios.get(`${API_HOST}/api/buildings`);
      this.buildings = response.data;
    } catch (error) {
      console.error('Error fetching data : ' + error);
    }
  },
  methods: {
    toggleBuildingCreation() {
      this.isBuildingCreationVisible = !this.isBuildingCreationVisible;
      this.isProblem = false;
    },
    async createBuilding() {
      if (this.name !== '' && this.outsideTemp !== '') {
        try {
          let response = await axios.post(`${API_HOST}/api/buildings`, {
            name: this.name,
            outsideTemperature: this.outsideTemp,
          });
          this.buildings.push(response.data);
          this.toggleBuildingCreation();
        } catch (error) {
          this.isProblem = true;
        }
      } else {
        this.isProblem = true;
      }
    },
    deleteBuilding(delBuilding) {
      let index = this.buildings.findIndex((building) => building.id === delBuilding.id);
      this.buildings.splice(index, 1);
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
