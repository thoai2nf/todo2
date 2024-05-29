<template>
  <div class="todo-item">
    <div>{{ todo.title }}</div>
    <div>{{ new Date(todo.timestamp).toLocaleString() }}</div>
    <div>
      <button @click="changeStatus('todo')" :disabled="todo.status === 'todo'" class="btn btn-primary m-1 btn-sm">Todo</button>
      <button @click="changeStatus('in-progress')" :disabled="todo.status === 'in-progress'" class="btn btn-warning m-1 btn-sm">In
        Progress
      </button>
      <button @click="changeStatus('completed')" :disabled="todo.status === 'completed'" class="btn btn-success m-1 btn-sm">
        Completed
      </button>
      <button @click="deleteTodo" class="btn btn-danger m-1 btn-sm">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todo'],
  methods: {
    changeStatus(status) {
      this.$store.commit('updateTodoStatus', {id: this.todo.id, status});
    },
    deleteTodo() {
      this.$store.commit('deleteTodo', this.todo.id);
    }
  }
};
</script>

<style>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
