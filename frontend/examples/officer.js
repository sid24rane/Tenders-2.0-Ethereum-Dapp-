Vue.component('create-tender', {
  template: '#create-tender'
})

Vue.component('expired-tenders', {
  template: '#expired-tenders'
})
Vue.component('ongoing-contracts', {
  template: '#ongoing-contracts'
})

Vue.component('active-contracts', {
  template: '#active-contracts'
})


new Vue({
  el: '#app',
  data: {
    currentView: 'active-contracts',
    isCreate : false,
    isExpiredTender: false,
    isOnContract : false,
    isActiveContract: true
  },
  methods: {
    createTender: function(){
      this.currentView = 'create-tender';
      this.isCreate = true;
      this.isExpiredTender = false;
      this.isOnContract= false;
      this.isActiveContract=false;
    },
    expiredTender: function(){
      this.currentView = 'expired-tenders';
      this.isCreate = false;
      this.isExpiredTender = true;
      this.isOnContract=false;
      this.isActiveContract=false;
    },
    ongoingContract: function(){
      this.currentView = 'ongoing-contracts';
      this.isCreate = false;
      this.isExpiredTender = false;
      this.isOnContract=true;
      this.isActiveContract= false;
    },
    activeContract: function() {
      this.currentView = 'active-contracts';
      this.isCreate = false;
      this.isExpiredTender = false;
      this.isOnContract=false;
      this.isActiveContract= true;
    },
    logout: function(){}
  }
})