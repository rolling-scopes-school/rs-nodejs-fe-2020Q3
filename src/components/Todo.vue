<template>
  <section class="todoapp">
    <TodoInput @addTodo="add"/>
    <TodoList :items="root.items" @edit="edit" @remove="remove"/>
    <UnderBar :items="root.items"/>
  </section>

  <div v-show="isLoading" class="loading-fade">
    <img src="../assets/loading.svg" class="loading-spinner"/>
  </div>
</template>

<script lang="ts">
import { v4 } from 'uuid';
import TodoInput from "@/components/TodoInput.vue";
import TodoList from "@/components/TodoList.vue";
import UnderBar from "@/components/UnderBar.vue";
import { reactive, ref, unref } from "vue";
import { todos as persistence } from '../persistence/network'

export default {
  components: { TodoInput, TodoList, UnderBar },

  props: {
    store: Array
  },

  setup () {
    const isLoading = ref(true);

    const lockAndWait = async (promise) => {
      isLoading.value = true;

      const data = await promise;

      isLoading.value = false;

      return data;
    }

    const root = reactive({
      items: [
        { id: v4(), title: 'do something cool', complete: false }
      ]
    });

    (async () => {
      root.items = await lockAndWait(persistence.get())
    })();

    const add = async (title) => {
      const item = { id: v4(), title: unref(title), complete: false }

      const data = await lockAndWait(persistence.create(item));

      root.items.push(data)
    };

    const edit = async ({ value, key }) => {
      console.log(value)

      await lockAndWait(persistence.save(value));

      root.items[key] = value;
    };

    const remove = async ({ value, key }) => {
      await lockAndWait(persistence.remove(value));

      root.items.splice(key, 1);
    };


    return {
      root,
      isLoading,
      add,
      edit,
      remove
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  z-index: 0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

/*noinspection CssInvalidPseudoSelector*/
.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.info {
  margin: 65px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
}

.info p {
  line-height: 1;
}

.info a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.info a:hover {
  text-decoration: underline;
}

.loading-fade {
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
}

.loading-spinner {
  position: absolute;
  margin: auto;
  display: block;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>

<style>
  .base-text-input {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
