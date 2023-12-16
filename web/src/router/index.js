import { createRouter, createWebHistory } from 'vue-router'
import PKIndexView from "../views/pk/PKIndexView"
import RanklistIndexView from "../views/ranklist/RanklistIndexView"
import RecordIndexView from "../views//record/RecordIndexView"
import UserBotIndexView from "../views/user/bot/UserBotIndexView"
import NotFound from "../views/error/NotFound"

const routes = [
  {
    path: "/",
    name: "home",
    component:PKIndexView
  },


  {
    path: "/pk/",
    name: "pk_index",
    component: PKIndexView,
  },


  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RanklistIndexView,
  },

  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
  },

  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
  },

  {
    path: "/404/",
    name: "404",
    component: NotFound,
  },

  {
    path: "/:catchAll(.*)", //输入任意错误地址跳转404
    redirect: "404"
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
