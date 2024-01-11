<template>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link to="/windows"
                   class="nav-link"
                   :class="{ 'active': isActive('/windows')}"
                   :aria-current="isActive('/windows') ? 'page' : null"
                   href="#">
        Windows</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/rooms"
                   class="nav-link"
                   :class="{ 'active': isActive('/rooms') }"
                   :aria-current="isActive('/rooms') ? 'page' : null"
                   href="#"
                   tabindex="-1">
        Rooms</router-link>

    </li>
    <li class="nav-item">
      <router-link to="/buildings"
                   class="nav-link"
                   :class="{ 'active': isActive('/buildings') }"
                   :aria-current="isActive('/buildings') ? 'page' : null"
                   href="#"
                   tabindex="-2">
        Buildings</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/heaters"
                   class="nav-link"
                   :class="{ 'active': isActive('/heaters') }"
                   :aria-current="isActive('/heaters') ? 'page' : null"
                   href="#"
                   tabindex="-3">
        Heaters</router-link>
    </li>
  </ul>
</template>


<script>
export default {
  name: 'MainNavigation',
  methods: {
    isActive(route) {
      return this.$route.path === route;
    }
  }
}
</script>

