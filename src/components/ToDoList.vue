<template>
    <div class="list-task container">
        <div class="app-content">
            <h1>To Do List</h1>
            <div class="list-content">
                <input type="text" placeholder="Search" class="form-search" v-model="search">
                <button  @click="showModal = true" class="btn btn-add">Add New Task</button>
            </div>
            <ul class="list-task-detail">
                <task v-for="item in filteredList" :key="item.id" 
                    @delete-todo="deleteTodo" 
                    @edit-todo="onEditTodo" 
                    @checked-list="checkedStatus"
                    :showAction="showAction"
                    :item="item" 
                    :priorities="priorities" 
                    :notBeforeToday="notBeforeToday"/>
            </ul>
            <div class="bulk-action" v-if="selectedTodo > 0">
                <button class="btn btn-remove" @click="deleteAllTodos">Remove</button>
                <button class="btn btn-done">Done</button>
            </div>
            <create-task  
                v-if="showModal" @close="showModal = false"
                @add-todo="addTodo"
                :priorities="priorities"
            />
        </div>
    </div>
</template>
<script>
import CreateTask from './CreateTask.vue'
import DatePicker from 'vue2-datepicker';
import Task from './Task.vue'
import 'vue2-datepicker/index.css';
import moment from 'moment'
var filters = {
         active: function(todos) {
          return todos.filter(function(todo) {
            return todo.checked;
          });
        },
    }
export default {
    name: 'ToDoList',
    components: {
        CreateTask,
        DatePicker,
        Task
    },
    data() {
        return {
            showModal: false,
            showAction: false,
            date: new Date(),
            initialTodos: [
                {
                    id: 1,
                    todo: "Consider Adam as a candidate",
                    priority: "low",
                    description: 'example',
                    date: new Date(),
                    showDetail: false,
                    checked: false
                },
                {
                    id: 2,
                    todo: "Take out the garbage",
                    priority: "normal",
                    description: 'example',
                    date: new Date(),
                    showDetail: false,
                    checked: false
                },
                {
                    id: 3,
                    todo: "Paint the house",
                    priority: "high",
                    description: 'example',
                    date: new Date(),
                    showDetail: false,
                    checked: false
                },
            ],
            todos: [],
            priorities: [
                { id: 1, name: "low"},
                { id: 2, name: "normal"},
                { id: 3, name: "high"}
            ],
            priority: "",
            search: ""
        }
    },
    mounted() {
        if (localStorage.getItem("todos")) {
            this.todos = JSON.parse(localStorage.getItem("todos"));
        } else {
            this.todos = this.initialTodos;
        }
    },
    
    methods: {
        notBeforeToday(date) {
            return date < new Date(new Date().setHours(0, 0, 0, 0));
        },
        addTodo(item) {
            const highestId = Math.max.apply(Math, this.todos.map(item => item.id));
            this.todos.push({
                id: highestId + 1,
                todo: item.title,
                priority: item.priority,
                description: item.description,
                date: item.date,
                checked: false
            });
            this.saveLocalStorageTodos();
            this.showModal = false;
        },
        onEditTodo(item) {
            const index = this.findTodo(item);
            index.todo = item.todo;
            index.description = item.description;
            index.date = item.date;
            index.priority = item.priority;
            this.saveLocalStorageTodos();
        },
        deleteTodo(item) {
            const index = this.todos.indexOf(item);
            this.todos.splice(index, 1);
            this.saveLocalStorageTodos();
        },
        deleteAllTodos() {
            var selectedTodos = this.todos.filter(item => item.checked == true);
            this.todos = this.todos.filter(item => !selectedTodos.includes(item));
            this.saveLocalStorageTodos();
        },
        findTodo(item) {
            return this.todos.find(todo => todo.id === item.id);
        },
        saveLocalStorageTodos() {
            localStorage.setItem("todos", JSON.stringify(this.todos));
            this.todos = JSON.parse(localStorage.getItem("todos"));
        },
        checkedStatus() {
            if(this.showAction == true) {
                return this.showAction = false;
            }
            return this.showAction = false;
        }
    },
    computed: {
        filteredList() {
            return this.todos.filter(item => {
                return item.todo.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        selectedTodo() {
            return filters.active(this.todos).length;
        }
    }
}
</script>
<style scoped>
.app-content {
    background: #ededed;
    padding: 1rem;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 30px -5px #2c3e50;
    box-shadow: 0 0 30px -5px #2c3e50;
    margin: 1rem auto;
    min-height: 300px;
}
.list-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.list-task-detail {
    padding-inline-start: 0;
    border-radius: 10px;
}
.form-search {
    width: inherit;
    float: left;
    height: 40px;
    margin-right: 60px;
    padding: 0 10px;
    border-radius: 5px;
    border: 1px solid gray;
}
.form-search:focus {
    border-color: #409aff;
    outline: 0;
}
.bulk-action .btn {
    margin: 10px;
}
</style>
