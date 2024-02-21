<template>
  <NavBar></Navbar>
  <router-view />
</template>

<script>
  import NavBar from './components/NavBar.vue'
  import "bootstrap/dist/css/bootstrap.min.css"
  import "bootstrap/dist/js/bootstrap"
  //import $ from 'jquery'

  export default {
    components: {
      NavBar
    },
    // setup() {
    //   $.ajax({
    //     url: "http://localhost:3000/user/account/token",
    //     type: "post",
    //     data: {
    //       username: "zbw",
    //       password: "pzbw",
    //     },
    //     success(resp) {
    //       console.log(resp);
    //     },
    //     error(resp) {
    //       console.log(resp);
    //     }
    //   })

    //   $.ajax({
    //     url: "http://localhost:3000/user/account/info",
    //     type: "get",
    //     headers: {
    //       Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJkNTE3MWI5Mzk1MWQ0OGUzOGIyMzlmZmE0ZGViYjI0YiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTcwODQxODQ0OSwiZXhwIjoxNzA5NjI4MDQ5fQ.lcICJc8e_eV8s7x9u6stIYnY0bGn91IA8xjGmmRGjyQ"

    //     },
    //     success(resp) {
    //       console.log(resp);
    //     },
    //     error(resp) {
    //       console.log(resp);
    //     }
    //   })

    //   $.ajax({
    //     url: "http://localhost:3000/user/account/register",
    //     type: "post",
    //     data: {
    //       username: "Newzbw",
    //       password: "pzbw",
    //       confirmedPassword: "pzbw"
    //     },
    //     success(resp) {
    //       console.log(resp);
    //     },
    //     error(resp) {
    //       console.log(resp);
    //     }
    //   })
    // }

  }
</script>

<style>
  body {
    background-image: url("@/assets/images/background.png");
    background-size: cover;
  }
</style>