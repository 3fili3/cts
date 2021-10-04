const app = new Vue({
  el: "#app",
  data() {
    return {
      alias: "",
    };
  },
  methods: {
    async accessChat() {
      let response = null;
      try {
        response = (await axios({
          url: "/chat-code/user/"+this.alias,
          method: "GET",
        })).data;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      if (response != null) {
        const message = response.api.message;
        if (message === "") {
          localStorage.setItem("alias", this.alias);
          window.location.href= "/chat-code/chat";
          return;
        }
        this.alias = "";
        alert(message);
      }
    },
  },
});

app.axios;
