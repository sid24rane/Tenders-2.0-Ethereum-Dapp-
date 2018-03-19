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
  }
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