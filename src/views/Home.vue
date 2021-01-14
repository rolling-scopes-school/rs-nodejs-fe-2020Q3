<template>
  <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/todos">Todos</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link>
  </div>
  <router-view></router-view>
</template>

<script lang="ts">

export default {
  components: {
  },
  setup () {
    return {
    };
  },
};
</script>
