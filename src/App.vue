<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import ToDoList from '@/components/ToDoList.vue'
export default {
  name: 'App',
  components: {
    ToDoList,

  }
}
</script>

<style>
html {
  overflow-x: hidden;font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: transparent;
  background: #0000ff29;
}
body {
    font-family: Arial, Helvetica, sans-serif;
    color: #a0a6ad;
    font-size: 14px;
    font-weight: 400;
    padding-bottom: 60px;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
textarea {
  font-family: Arial, Helvetica, sans-serif;
}
#app {
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(139deg,#03ddffcb 0%,#ff0381b6 90%);
  background-size: cover;
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: auto;
  overflow-x: hidden;
}
.container {
    width: 90%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
@media (max-width: 576px) {
    .top .btn-group {
        flex-direction: column !important;
    }
    .top .btn-group .btn:first-child {
      margin-bottom: 10px;
    }
    .form-search {
      margin-right: 10px !important;
    }
}
@media (min-width: 576px) {
    .container {
        max-width: 540px;
    }
}
@media (min-width: 768px) {
    .container {
        max-width: 720px;
    }
}

@media (min-width: 992px) {
    .container {
        max-width: 960px;
    }
}
@media print, screen and (min-width: 769px) {
  .app-content {
      width: 80%;
  }
}

.mx-input, .mx-datepicker {
    width: 100%;
}
.btn {
    padding: 7px 12px;
    border: 0;
    border-radius: 5px;
    width: 100%;
    max-width: 200px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    font-weight: bold;
}
.btn-add, .btn-update {
    background-color: #4caf50;
    min-width: 120px;
}
.btn-detail {
    background-color: #01bcd4;
}
.btn-remove {
    background-color: #d9534f;
}
.btn-done {
    background-color: #2096f3;
}
.modal-mask {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 800px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.list-task-detail li {
  border-radius: 5px;
}
.list-task {
  height: 100vh;
}
</style>