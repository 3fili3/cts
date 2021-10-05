const app = new Vue({
  el: "#app-chat",
  data() {
    return {
      message: "",
      chat: [],
      init: false,
      ws: null,
      user:'',
      connectUser: ''
    };
  },
  methods: {
    sendMessage() {
     // console.log(this.message);
     // this.message = "";
     const newMessage = {
        status:'chat',
        data:{
            name:this.user,
            message:this.message
        }
     }
     this.ws.send(JSON.stringify(newMessage));
     this.message = '';
    },
    async initConnection() {
      if (this.ws === null) {
        this.ws = new WebSocket("https://appscodeathome.ovh/socket");
      }
      this.ws.onopen = () => {
        const newMessage = {
            status:'chat',
            data:{
                name:this.user,
                message:this.message
            }
         }
        this.ws.send(JSON.stringify(newMessage));
        this.ws.onmessage = e => {
            const data = JSON.parse(e.data);
            switch (data.status) {
                case 'chat':
                    if(data.data.message != ''){
                        this.chat.push(data.data);
                    }
                break;
                case 'alert':
                    this.alertConnect(data.message)
                break;
                default:
                break;
            }
          }
      }
      this.ws.onclose = () => {
     
      } 
    },
    alertConnect(message){
        this.connectUser = 'Se conecto: '+message;
        setTimeout(()=> {
            this.connectUser = '';
        },2000)
    },
    async peopleConnect(){
        this.user = localStorage.getItem('alias');
        const res = null;
        try {
            res = (await axios({
                url:'/chat-code/chat/'+this.user,
                methods:"POST"
            })).data
        } catch (error) {
            console.log(error);
        }
    },
    exitChat(){
        localStorage.clear();
        window.location.href= "/chat-code/";
    }
  },
  async mounted() {
    this.initConnection();
    await this.peopleConnect();
  },
});

app.axios;
