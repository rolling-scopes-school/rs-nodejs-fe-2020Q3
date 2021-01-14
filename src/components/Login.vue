<template>
  <div>Login Page</div>
  <div>
    <span v-show="errorData.errorText">{{ errorData.errorText }}</span> <br/>
    <input type="text" v-model="loginData.username" placeholder="Username"/> <br/>
    <input type="text" v-model="loginData.password" placeholder="Password"/> <br/>
    <button @click="click" style="border: 1px solid gray;">Log in</button> <br/>
    <button @click="test" style="border: 1px solid gray;">Test session</button> <span>{{ testData.result }}</span>
    <RouterLink to="/login"/>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import { auth } from '@/persistence/network';

export default {
  props: {},
  setup () {
    const errorData = reactive({ errorText: '' });
    const loginData = reactive({ username: '', password: '' });
    const testData = reactive({ result: '' });

    const click = async () => {
      const authData = await auth.login(loginData);

      if (authData.statusCode === 200) {
        auth.token = authData.token;
      } else {
        errorData.errorText = authData.reason;
      }
    }

    const test = async () => {
      const result = await auth.test();

      testData.result = result.statusCode === 200 ? 'ok' : 'fail';
    }

    return {
      click,
      test,
      errorData,
      loginData,
      testData
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
