<template>
  <div id="app">
    <header>
      <div class="title">{{ title }}</div>
    </header>

    <section class="main-content w-50 mx-auto">
      <main-navigation></main-navigation>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import MainNavigation from './components/MainNavigation.vue';
import WindowsList from './components/lists/WindowsList.vue';
import RoomsList from './components/lists/RoomsList.vue';

export default {
  name: 'App',
  components: {
    MainNavigation,
  },
  data: function () {
    return {
      title: 'TB3 Smart Building Manager Frontend VueJS',
    };
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;

  .title {
    text-align: center;
  }
}
</style>
