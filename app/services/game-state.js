import Ember from 'ember';
import PhoenixSocket from 'phoenix/services/phoenix-socket';

export default PhoenixSocket.extend({

  sprites: [],

  timestamp: '',

  keyBindings: ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],

  init() {
    
    // You may listen to open, "close" and "error"
    this.on('open', () => {
      console.log('Socket was opened!');
    })
 
    this.connect();

  },

 

  connect(/*url, options*/) {
    // connect the socket
    this._super("ws://localhost:4000/socket", {});

    // join a channel
    var channel = this.joinChannel("viewport", {user_id: "user001"})
    
    var self = this

    // add message handlers
    channel.on("new_state", function(msg) {
      self.set('sprites', msg.sprites);
      self.set('timestamp', msg.timestamp);
    });

    this.set('channel', channel);
  },

  send(msg) {
    this.get('channel').push("event", msg);
  },


});