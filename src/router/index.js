import Vue from 'vue'
import Router from 'vue-router'
import ToDoList from '@/components/ToDoList'
// import CreateTask from '@/components/CreateTask'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ToDoList',
      component: ToDoList
    },

    // {
    //   path: '/',
    //   name: 'CreateTask',
    //   component: CreateTask
    // },

  ]
})
