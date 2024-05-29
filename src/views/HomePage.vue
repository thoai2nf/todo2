<template>
  <header class="m-3">
    <div>{{ companyNews }}</div>
  </header>
  <div class="m-3">
    <h1>Todo List</h1>
    <div class="input-group mb-3">
      <input v-model="newTodo" placeholder="New task" class="form-control" />
      <button @click="addTodo" class="btn btn-primary">Add</button>
    </div>
    <div class="d-flex">
      <div class="col-md-4 card m-1">
        <TodoList title="Todo" filter="todo" class="p-1" />
      </div>
      <div class="col-md-4 card m-1">
        <TodoList title="In Progress" filter="in-progress" class="p-1"  />
      </div>
      <div class="col-md-4 card m-1">
        <TodoList title="Completed" filter="completed" class="p-1"  />
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import TodoList from '@/components/TodoList.vue';

export default {
  components: { TodoList },
  data() {
    return {
      newTodo: ''
    };
  },
  computed: {
    ...mapState(['companyNews'])
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        const newTask = {
          id: Date.now(),
          title: this.newTodo,
          status: 'todo',
          timestamp: new Date().toISOString()
        };
        this.$store.commit('addTodo', newTask);
        this.newTodo = '';
      }
    }
  },
  created() {
    this.$store.dispatch('fetchTodos');
  }
};
</script>

<style>
</style>
