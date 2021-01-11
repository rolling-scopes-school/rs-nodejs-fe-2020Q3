<template>
  <ul class="filters">
    <li>
      <router-link class="" to="/">
      All
      </router-link>
    </li>
    <li>
      <router-link class="" to="/active">
      Active
      </router-link>
    </li>
    <li>
      <router-link class="" to="/completed">
      Completed
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">

export default {
  setup () {
    return {};
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
