<template>
  <div>Register Page</div>
  <div>
    <span v-show="errorData.errorText">{{ errorData.errorText }}</span> <br/>
    <input type="text" v-model="authData.email" placeholder="email"/> <br/>
    <input type="text" v-model="authData.username" placeholder="Username"/> <br/>
    <input type="text" v-model="authData.password" placeholder="Password"/> <br/>
    <button @click="click" style="border: 1px solid gray;">Register</button> <br/>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { auth } from '@/persistence/network';

export default {
  props: {},
  setup () {
    const errorData = reactive({ errorText: '' });
    const authData = reactive({ email: '', username: '', password: '' });

    const click = async () => {
      const result = await auth.register(authData);

      if (result.statusCode === 200) {
        auth.token = result.token;
      } else {
        errorData.errorText = result.reason;
      }
    }

    return {
      click,
      errorData,
      authData
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
