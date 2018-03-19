Vue.component('create-tender', {
  template: '#create-tender',
  data(){
      return {
      coverinputs: [],
      clauseinputs:[],
      milestonesinputs:[]
    }
  },
  methods: {
    addCover(event) {
      event.preventDefault();
      this.coverinputs.push({
        one: '',
        two: ''
      })
    },
    addClause(event){
      event.preventDefault();
      this.clauseinputs.push({
        one:'',
        two:''
      })
    },
    addMilestones(event){
      event.preventDefault();
      this.milestonesinputs.push({
        one:'',
        two:''
      })
    }
  }
})


Vue.component('expired-tenders', {
  template: '#expired-tenders',
  methods: {
    biddingList: function(){
      this.$parent.currentView = 'bidding-list';
    }
  }
})

Vue.component('ongoing-contracts', {
  template: '#ongoing-contracts'
})

Vue.component('active-contracts', {
  template: '#active-contracts',
  methods: {
    ongoingContractDetails : function(){
      this.$parent.currentView = 'ongoing-contracts-details';
    }
  }
})

Vue.component('ongoing-contracts-details', {
  template: '#ongoing-contracts-details',
  methods: {
    viewDocs: function(){
      this.$parent.currentView= 'view-submitted-docs';
    }
  }
})


Vue.component('bidding-list', {
  template: '#bidding-list',
  methods: {
    proposalDetails : function(){
      this.$parent.currentView = 'proposal-details';
    }
  }
})

Vue.component('proposal-details', {
  template: '#proposal-details',
  methods : {
    contractDetails: function(){
      this.$parent.currentView = 'contract-details';
    },
    viewDocs: function(){
      this.$parent.currentView= 'view-submitted-docs';
    }
  }
})

Vue.component('contract-details', {
  template: '#contract-details',
  methods: {
    viewDocs: function(){
      this.$parent.currentView= 'view-submitted-docs';
    },
    expiredTenders: function(){
      this.$parent.currentView = 'expired-tenders';
    }
  }
})

Vue.component('view-submitted-docs', {
  template: '#view-submitted-docs',
  methods: {
    proposalDetails : function(){
      this.$parent.currentView = 'proposal-details';
    }
  }
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