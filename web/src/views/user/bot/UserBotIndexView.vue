<template>
  <ContentField>我的bot</ContentField>
</template>

<script>
import ContentField from "../../../components/ContentField"
import $ from 'jquery'
import { useStore } from 'vuex'

export default{
  components: {
    ContentField
  },
  setup() {
    const store = useStore();
    // $.ajax({
    //     url: "http://localhost:3000/user/bot/add/",
    //     type: "post",
    //     data: {
    //       title: "我的bot",
    //       description: "bot描述",
    //       content:  "bot代码",
    //     },
    //     headers: {
    //       Authorization: "Bearer " + store.state.user.token,
    //     },
    //     success(resp) {
    //       console.log(resp);
    //     },
    //     error(resp){
    //       console.log(resp);
    //     }
    //   })
      // $.ajax({
      //   url: "http://localhost:3000/user/bot/remove/",
      //   type: "post",
      //   data: {
      //     bot_id: 5,
      //   },
      //   headers: {
      //     Authorization: "Bearer " + store.state.user.token,
      //   },
      //   success(resp) {
      //     console.log(resp);
      //   },
      //   error(resp){
      //     console.log(resp);
      //   }
      // })
      // $.ajax({
      //   url: "http://localhost:3000/user/bot/update/",
      //   type: "post",
      //   data: {
      //     bot_id: 6,
      //     title: "我的新bot",
      //     description: "bot新描述",
      //     content:  "bot新代码",
      //   },
      //   headers: {
      //     Authorization: "Bearer " + store.state.user.token,
      //   },
      //   success(resp) {
      //     console.log(resp);
      //   },
      //   error(resp){
      //     console.log(resp);
      //   }
      // })
      $.ajax({
        url: "http://localhost:3000/user/bot/getlist/",
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          console.log(resp);
        },
        error(resp){
          console.log(resp);
        }
      })
  }
}


</script>

<style>
    
</style>