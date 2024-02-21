<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="card" style="margin-top: 20px;">
          <div class="card-body">
            <img :src="$store.state.user.photo" alt="" style="width: 100%;">
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="card" style="margin-top: 20px;">
          <div class="card-header">
            <span style="font-size: 130%;">我的bot</span>
            <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#add-bot-btn">创建bot</button>

            <div class="modal fade" id="add-bot-btn" tabindex="-1">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5">创建bot</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="add-bot-title" class="form-label">名称</label>
                      <input v-model ="botadd.title" type="email" class="form-control" id="add-bot-title" placeholder="请输入bot名称">
                    </div>
                    <div class="mb-3">
                      <label for="add-bot-description" class="form-label">bot简介</label>
                      <textarea  v-model ="botadd.description" class="form-control" id="add-bot-description" rows="3" placeholder="写点什么吧"></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="add-bot-code" class="form-label">bot代码</label>
                      <textarea v-model ="botadd.content" class="form-control" id="add-bot-code" rows="7" placeholder="在这里编写代码"></textarea>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="error-message">{{botadd.error_message}}</div>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="add_bot">创建</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>创建时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="bot in bots" :key="bot.id">
                  <td>{{bot.title}}</td>
                  <td>{{bot.createtime}}</td>
                  <td>
                    <button type="button" class="btn btn-secondary" style="margin-right: 10px;" data-bs-toggle="modal" :data-bs-target="'#update-bot-modal-'+ bot.id">修改</button>
                    <button type="button" class="btn btn-danger" @click="remove_bot(bot)">删除</button>
                    <div class="modal fade" :id="'update-bot-modal-'+ bot.id"  tabindex="-1">
                      <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5">创建bot</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div class="mb-3">
                              <label for="add-bot-title" class="form-label">名称</label>
                              <input v-model ="bot.title" type="email" class="form-control" id="add-bot-title" placeholder="请输入bot名称">
                            </div>
                            <div class="mb-3">
                              <label for="add-bot-description" class="form-label">bot简介</label>
                              <textarea  v-model ="bot.description" class="form-control" id="add-bot-description" rows="3" placeholder="写点什么吧"></textarea>
                            </div>
                            <div class="mb-3">
                              <label for="add-bot-code" class="form-label">bot代码</label>
                              <textarea v-model ="bot.content" class="form-control" id="add-bot-code" rows="7" placeholder="在这里编写代码"></textarea>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <div class="error-message">{{bot.error_message}}</div>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="update_bot(bot)">确认修改</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import ContentField from "../../../components/ContentField"
import $ from 'jquery'
import { useStore } from 'vuex'
import { ref, reactive } from 'vue'
import { Modal } from 'bootstrap/dist/js/bootstrap'

export default{
  components: {
    //ContentField
  },
  setup() {
    const store = useStore();
    let bots = ref("");

    const botadd = reactive({
      title: "",
      description: "",
      content: "",
      error_message: ""
    });
      
    
    const add_bot = () =>{
      $.ajax({
        url: "http://localhost:3000/user/bot/add/",
        type: "post",
        data: {
          title: botadd.title,
          description: botadd.description,
          content:  botadd.content,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          if(resp.error_message === "success") {
            botadd.title = "";
            botadd.description = "";
            botadd.content = "";
            Modal.getInstance("#add-bot-btn").hide();
            refresh_bots();
          } else {
            botadd.error_message = resp.error_message;
          }
          
        },
        error(resp){
          console.log(resp);
        }
      })
    }

    const update_bot = (bot) =>{
      $.ajax({
        url: "http://localhost:3000/user/bot/update/",
        type: "post",
        data: {
          bot_id: bot.id,
          title: bot.title,
          description: bot.description,
          content:  bot.content,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          if(resp.error_message === "success") {
            Modal.getInstance("#update-bot-modal-"+ bot.id).hide();
            refresh_bots();
          } else {
            bot.error_message = resp.error_message;
          }
          
        },
        error(resp){
          console.log(resp);
        }
      })
    }
    
      const remove_bot = (bot) =>{
        $.ajax({
        url: "http://localhost:3000/user/bot/remove/",
        type: "post",
        data: {
          bot_id: bot.id,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          if(resp.error_message === "success") {
            refresh_bots();
          } 
        },
        error(resp){
          console.log(resp);
        }
      })
      }
    
      const refresh_bots = () =>{
        $.ajax({
        url: "http://localhost:3000/user/bot/getlist/",
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          bots.value = resp;
        },
      })
      }
      refresh_bots();

      return{
        bots,
        botadd,
        add_bot,
        remove_bot,
        update_bot
      }
  }
}


</script>

<style>
    div.error-message{
      color: red;
    }
</style>