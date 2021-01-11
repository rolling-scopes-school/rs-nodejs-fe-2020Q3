<template>
  <div class="todo-list-item">
    <li :class="itemClass">
      <div class="view" data-testid="view">
        <input
          ref="completeInput"
          class="toggle"
          type="checkbox"
          :checked="todo.complete"
          @change="reverseCompleted"
        />
        <label
          @dblclick="doubleClick"
        >
          {{ todo.title }}
        </label>
        <button
          class="destroy"
          @click="removeItem(todo.id)"
        />
      </div>
      <input
        ref="titleInput"
        class="edit base-text-input"
        :value="todo.title"

        @blur="onBlurEdit"
        @keydown="submitEditText"
      />
    </li>
  </div>
</template>

<script lang="ts">
import { ref, watch, nextTick, reactive } from 'vue';

export default {
  props: {
    todo: Object
  },
  setup (props, { emit }) {
    const completeInput = ref(null)
    const titleInput = ref(null)

    const editing = ref(false);

    watch(props, () => {
      itemClass.completed = props.todo.complete;
    })

    const itemClass = reactive({
      completed: props.todo.complete,
      editing
    });

    const reverseCompleted = () => {
      nextTick(() => emitNewValue());
    };

    const doubleClick = () => {
      editing.value = true;

      nextTick(() => { titleInput.value.focus(); });
    };

    const submitEditText = (e: KeyboardEvent) => {
      if ([13].includes(e.keyCode)) {
        emitNewValue()
      }

      if ([13, 27].includes(e.keyCode)) {
        editing.value = false;
      }
    };

    const emitNewValue = () => {
      const complete = completeInput.value.checked;
      const title = titleInput.value.value;

      emit('edit', {
        id: props.todo.id,
        complete,
        title
      });
    }

    const onBlurEdit = () => {
      if (editing.value === false) {
        return;
      }

      emitNewValue();

      editing.value = false;
    };

    const removeItem = () => {
      emit('remove', props.todo)

      editing.value = false;
    };

    return {
      completeInput,
      titleInput,
      itemClass,
      editing,
      reverseCompleted,
      doubleClick,
      submitEditText,
      onBlurEdit,
      removeItem,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.todo-list-item {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.edit {
  display: none;
}

.todo-list-item:last-child {
 border-bottom: none;
}

.editing {
  border-bottom: none;
  padding: 0;
}

.editing .edit {
  display: block !important;
  width: calc(100% - 43px);
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.editing .view {
  display: none;
}

.toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
  opacity: 0;
}

.toggle + label {
  /*
  Firefox requires \`#\` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
  IE and Edge requires *everything* to be escaped to render, so we do that instead of just the \`#\` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
  */
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center left;
}

.toggle:checked + label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.destroy:hover {
  color: #af5b5e;
}

.destroy:after {
  content: '×';
}

.todo-list-item:hover .destroy {
   display: block;
 }

.editing:last-child {
  margin-bottom: -1px;
}

</style>
