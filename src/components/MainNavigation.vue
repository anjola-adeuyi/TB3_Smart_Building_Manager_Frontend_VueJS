<template>
  <div class="button-container">
    <button
      type="button"
      class="btn btn-primary swagger-button"
      @click="openSwaggerDocs"
    >
      API Swagger docs link
    </button>
  </div>
  <p class="paragraph">
    Frontend - VueJS, Backend - Spring Boot, Java 17, and Gradle, Database - H2 Database, API Documnetation - Swagger
    docs, Mobile - Android and Kotlin
  </p>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <router-link
        to="/windows"
        class="nav-link"
        :class="{ active: isActive('/windows') }"
        :aria-current="isActive('/windows') ? 'page' : null"
        href="#"
      >
        Windows</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/rooms"
        class="nav-link"
        :class="{ active: isActive('/rooms') }"
        :aria-current="isActive('/rooms') ? 'page' : null"
        href="#"
        tabindex="-1"
      >
        Rooms</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/buildings"
        class="nav-link"
        :class="{ active: isActive('/buildings') }"
        :aria-current="isActive('/buildings') ? 'page' : null"
        href="#"
        tabindex="-2"
      >
        Buildings</router-link
      >
    </li>
    <li class="nav-item">
      <router-link
        to="/heaters"
        class="nav-link"
        :class="{ active: isActive('/heaters') }"
        :aria-current="isActive('/heaters') ? 'page' : null"
        href="#"
        tabindex="-3"
      >
        Heaters</router-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MainNavigation',
  methods: {
    openSwaggerDocs() {
      const url = 'https://automacorp-anjola-adeuyi.cleverapps.io/swagger-ui/index.html';
      window.open(url, '_blank'); // Opens the URL in a new tab
    },
    isActive(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style>
.button-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.swagger-button {
  background-color: #045b0f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}

.swagger-button:hover {
  background-color: #000000;
}

.paragraph {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
