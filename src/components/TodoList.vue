<template>
  <div>
    <h3>{{ title }}</h3>
    <div v-for="todo in filteredTodos" :key="todo.id">
      <TodoItem :todo="todo" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TodoItem from './TodoItem.vue';

export default {
  components: { TodoItem },
  props: ['title', 'filter'],
  computed: {
    ...mapState(['todos']),
    filteredTodos() {
      return this.todos.filter(todo => todo.status === this.filter);
    }
  }
};
</script>
