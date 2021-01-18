<template>
  <div></div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

import { auth } from '@/persistence/network';

export default {
  components: {},
  setup () {
    auth.setToken(undefined);
    const router = useRouter();
    router.push('/login');
  },
};
</script>
