<template>
  <div class="todo-input">
    <header class="header">
      <h1>todos</h1>
      <input
        type="text"
        class="base-text-input new-todo"
        placeholder="What needs to be done?"
        v-model="title"
        @keypress="addTodo"
        data-testid="new-todo-input-text"
        data-cy="new-todo-input-text"
      />
    </header>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup (_, context) {
    const title = ref("");

    const addTodo = (event) => {
      if (event.keyCode === 13) {
        context.emit("addTodo", title);
      }
    };

    return {
      title,
      addTodo
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .base-text-input.new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(0, 0, 0, 0.003);
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  }
</style>
