<template>
  <div class="todo-list">
    <section class="main">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        @change="toggleAllCheckbox"
      />
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list" data-testid="todo-list">
        <TodoListItem
          v-for="(todo, key) in items"
          :key="todo.id"
          :todo="todo"
          @edit="edit($event, key)"
          @remove="remove($event, key)"
        ></TodoListItem>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import TodoListItem from "@/components/TodoListItem.vue";

export default {
  components: { TodoListItem },
  props: {
    items: Array
  },
  setup (props, { emit }) {
    const toggleAllCheckbox = () => {;};

    const edit = (value, key) => emit('edit', { value, key });
    const remove = (value, key) => emit('remove', { value, key });

    return {
      edit,
      remove,
      toggleAllCheckbox,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .todo-list {

 }

 .main {
   position: relative;
   z-index: 2;
   border-top: 1px solid #e6e6e6;
 }

 .toggle-all {
   width: 1px;
   height: 1px;
   border: none; /* Mobile Safari */
   opacity: 0;
   position: absolute;
   right: 100%;
   bottom: 100%;
 }

 .toggle-all + label {
   width: 60px;
   height: 34px;
   font-size: 0;
   position: absolute;
   top: -52px;
   left: -13px;
   -webkit-transform: rotate(90deg);
   transform: rotate(90deg);
 }

 .toggle-all + label:before {
   content: '❯';
   font-size: 22px;
   color: #e6e6e6;
   padding: 10px 27px 10px 27px;
 }

 .toggle-all:checked + label:before {
   color: #737373;
 }

 .todo-list {
   margin: 0;
   padding: 0;
   list-style: none;
 }

 /*
 Hack to remove background from Mobile Safari.
 Can't use it globally since it destroys checkboxes in Firefox
 */
 @media screen and (-webkit-min-device-pixel-ratio: 0) {
   .toggle-all,
   .todo-list li .toggle {
     background: none;
   }

   .todo-list li .toggle {
     height: 40px;
   }
 }
</style>
