import {createStore} from 'vuex';
import axios from 'axios';

function loadState() {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : null;
}

function saveState(state) {
    localStorage.setItem('todos', JSON.stringify(state.todos));
}

const store = createStore({
    state: {
        todos: loadState() || [],
        companyNews: 'Company News: Today is holiday!'
    },
    mutations: {
        setTodos(state, todos) {
            state.todos = todos;
            saveState(state);
        },
        addTodo(state, todo) {
            state.todos.push(todo);
            saveState(state);
        },
        updateTodoStatus(state, {id, status}) {
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.status = status;
                saveState(state);
            }
        },
        deleteTodo(state, id) {
            state.todos = state.todos.filter(todo => todo.id !== id);
            saveState(state);
        }
    },
    actions: {
        async fetchTodos({commit}) {
            const savedTodos = loadState();
            if (savedTodos) {
                commit('setTodos', savedTodos);
            } else {
                const response = await axios.get('/data.json');
                commit('setTodos', response.data);
            }
        }
    },
    getters: {
        todos: state => state.todos,
        todoById: state => id => state.todos.find(todo => todo.id === id)
    }
});

export default store;
