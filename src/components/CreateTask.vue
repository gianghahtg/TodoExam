<template>
    <transition name="modal create-task">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <slot name="header">
                  <h1>New Task</h1>
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  <div class="body-content">
                    <input type="text" placeholder="Add new task..." class="form-input" v-model="title" @keyup.enter="addTodo" required>
                    <p v-show="arlertShow" class="danger">Title is required</p>
                    <label for="description">Description</label>
                    <textarea v-model="description" placeholder="What you gonna to do ?" rows="10"></textarea>
                    <div class="bottom">
                        <div>
                            <p>Due Date</p>
                            <date-picker
                                v-model="datepicked"
                                :default-value="new Date()"
                                :disabled-date="notBeforeToday"
                                format='DD MMM YYYY'
                            ></date-picker>
                        </div>
                        <div class="select-piority">
                            <p>Piority</p>
                            <select v-model="priority">
                                <option
                                    v-for="option in priorities"
                                    :value="option.name"
                                    :key="option.id"
                                >
                                    {{ option.name }}
                                </option>
                            </select>
                        </div>               
                    </div>
                  </div>
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <div class="add-task">
                      <button class="btn btn-add" @click="addTodo">
                          Add
                      </button>
                      <button class="btn btn-remove" @click="$emit('close')">
                        Cancel
                      </button>
                  </div>
                </slot>
              </div>
            </div>
          </div>
        </div>
    </transition>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
var STORAGE_KEY = "todo-app";
var todoStorage = {
    fetch: function() {
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        todos.forEach(function(todo, index) {
            todo.id = index;
        });
        todoStorage.uid = todos.length;
        return todos;
    },
    save: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};
export default {
    name: 'CreateTask',
    props: {
        priorities: {
            type: Array,
            required: true
        },
    },
    components: {
        DatePicker
    },
    data() {
        return {
            datepicked: new Date(),
            todos: todoStorage.fetch(),
            title: "",
            description: "",
            priority: "normal",
            arlertShow: false,
        }
    },
    methods: {
        notBeforeToday(date) {
            return date < new Date(new Date().setHours(0, 0, 0, 0));
        },
        addTodo() {
            var title = this.title && this.title.trim();
            if (!title) {
                this.arlertShow = true;
                return;
            }     
            const payload = {
                priority : this.priority,
                title : this.title,
                description : this.description,
                date : this.datepicked
            }
            this.$emit("add-todo", payload)
            
        }
    },
}
</script> 
<style scoped>
.create-task {
    padding: 20px 30px;
    border: 1px solid gray;

}
.body-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    max-width: 800px;
    margin: 0 auto;
}
.body-content .bottom {
    display: grid;
    grid-template-columns: 45% 45%;
    grid-gap: 10%;

}
.body-content .form-input {
    height: 40px;
    margin-top: 0.25em;
    vertical-align: top;
    background-color: #fff;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    appearance: none;
    -webkit-print-color-adjust: exact;
    padding: 0 10px;
    margin-bottom: 20px;
}
.body-content label {
    text-align: left;
    font-size: 18px;
    color: #000;
    margin-bottom: 10px;
}
.body-content textarea {
    margin-bottom: 30px;
    border-radius: 5px;
    padding: 10px;
}
.body-content textarea:focus {
    border-color: #409aff;
    outline: 0;
}
.body-content .form-input:focus-visible {
    border-color: antiquewhite;
}
.body-content .form-input:focus {
    border-color: #409aff;
    outline: 0;
}
.body-content .select-piority select {
    height: 34px;
    padding: 6px;
    font-size: 14px;
    color: #555;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
}
.body-content .select-piority select:focus {
    outline: 0;
    border-color: #409aff;
}
.body-content .bottom p {
    text-align: left;
}
.add-task {
    margin: 30px 0;
}
.danger {
    text-align: left;
    color: red;
    margin-top: -15px;
}
</style>
