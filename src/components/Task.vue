<template>
    <li class="item-detail">
        <div class="top">
            <div class="task">
                <input type="checkbox" class="toggle" v-model="item.checked" @click="checkedList()">
                <p class="task-title">{{item.todo}}</p>
            </div>
            <div class="btn-group">
                <button class="btn btn-detail" @click="showDetailTask()">Detail</button>
                <button class="btn btn-remove" @click="deleteTodo(item)">Remove</button>
            </div>
        </div>
        <div class="body-content" v-if="showDetail">
            <input type="text" class="form-input" v-model="item.todo">
            <label for="description">Description</label>
            <textarea rows="10" v-model="item.description"></textarea>
            <div class="bottom">
                <div>
                    <p>Due Date</p>
                    <date-picker
                        v-model="item.date"
                        :default-value="datepicked"
                        :disabled-date="notBeforeToday"
                        value-type="format"
                        format="YYYY-MM-DD"
                        type="date"
                    ></date-picker>
                </div>
                <div class="select-priority">
                    <p>priority</p>
                    <select v-model="item.priority">
                        <option
                            v-for="option in priorities"
                            :value="option.name"
                            :key="option.id"
                            
                        >{{option.name}}
                        </option>
                    </select>
                </div>               
            </div>
            <div class="update-task">
                <button class="btn btn-update" @click="onEditTodo">
                    Update
                </button>
            </div>
        </div>
    </li>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import moment from 'moment'
export default {
    components: {
        DatePicker
    },
    props: [
        'item',
        'priorities',
        'notBeforeToday',
        'showAction'
    ],
    data() {
        return {
            showDetail: false,
            datepicked: this.item.date,
            moment: function (datepicked) {
                return moment(datepicked).format('DD MMM YYYY');
            }
        }
    },
      mounted() {
        this.item.todo = this.item.todo;
        this.item.priority = this.item.priority;
        this.item.date = this.item.date;
        this.item.description = this.item.description;
        this.item.checked = this.item.checked
    },
    methods: {
        showDetailTask() {
            if(this.showDetail == true) {
                return this.showDetail = false;
            }
            this.showDetail = true;
        },
        onEditTodo() {
            this.showDetail = false;
            const payload = {
                id: this.item.id,
                todo: this.item.todo,
                priority: this.item.priority,
                date: this.item.date,
                description: this.item.description,
                checked: this.item.checked
            };
            this.$emit("edit-todo", payload);
        },
        deleteTodo(item) {
            this.$emit('delete-todo', item)
        },
        checkedList() {
            if(this.showAction = false) {
                return this.showAction = true;
            }
            return this.showAction = false;
        }
    },
    watch: {
    }
}
</script>
<style scoped>
.task .task-title {
    font-size: 16px;
    font-weight: 600;
}
.top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid #ff00005c;
    padding: 20px 30px;
    align-self: baseline;
    border-radius: 5px;
    background-color: #deb88738;
}
.top div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-self: baseline;
}
.top div p {
    margin: 0 auto;
}

.body-content {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin: 0 auto;
    border: 1px solid #ff00005c;
    border-top: 0;
    padding: 20px 30px;
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
    word-break: break-all;
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
.body-content .select-priority select {
    height: 34px;
    padding: 6px;
    font-size: 14px;
    color: #555;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
}
.body-content .select-priority select:focus {
    outline: 0;
    border-color: #409aff;
}
.body-content .bottom p {
    text-align: left;
}
.update-task {
    margin: 30px 0;
}
.list-task-detail li {
    list-style: none;
    margin-bottom: 10px;
    border-radius: 5px;
}
.btn-group .btn {
    margin: 0 10px;
}
</style>