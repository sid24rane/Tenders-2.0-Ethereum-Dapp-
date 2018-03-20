Vue.component('existing-tenders', {
  template: '#existing-tenders',
  data: function(){
    return {
      existingTenders: [
          {
            name:'road ka kaam',
            closingDate:'24/12/67',
            bidCount: 20
          }
      ]
      
    }
  },
  methods: {
    tenderInfo : function(){
      this.$parent.currentView = 'tender-info';
    }
  }
})

Vue.component('ongoing-contracts', {
  template: '#ongoing-contracts',
  data: function(){
    return {
      ongoingContracts:[
          {
            name: 'ghar ka kaam',
            completionDate: '12/2/45',
            status: 'ho gaya'
          }
      ]
    }
  },
  methods: {
    ongoingContractDetails : function(){
      this.$parent.currentView = 'cm-ongoing-contract-details';
    }
  }
})

Vue.component('tender-info', {
  template: '#tender-info',
})

Vue.component('cm-ongoing-contract-details', {
  template: '#cm-ongoing-contract-details',
  methods: {
    viewDocs: function(){
      this.$parent.currentView = 'view-submitted-docs';
    }
  }
  
})

Vue.component('view-submitted-docs', {
  template: '#view-submitted-docs',
})

new Vue({
  el: '#app',
  data: {
    currentView: 'existing-tenders',
    isExTender : true,
    isOnContract : false,
  },
  methods: {
    existingTender: function(){
      this.currentView = 'existing-tenders';
      this.isExTender = true;
      this.isOnContract = false;
    },
    ongoingContract: function(){
      this.currentView = 'ongoing-contracts';
      this.isExTender = false;
      this.isOnContract = true;
    }
  }
})