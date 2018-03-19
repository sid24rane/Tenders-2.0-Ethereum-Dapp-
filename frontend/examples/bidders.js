Vue.component('existing-tenders', {
  template: '#existing-tenders',
  data:function(){
    return {
      existingTenders:[
        {
           name:'sid',
           closingDate:'34/10/2'
        },
        {
           name:'sid',
           closingDate:'34/10/2'
        }
      ]
    }
  }
})

Vue.component('placed-bids', {
  template: '#placed-bids',
  data:function(){
    return{
      biddedTenders:[
      {
         name:'sd',
         bidCloseDate:'2/2/22',
         status:'pending' 
      },
      {
         name:'sd',
         bidCloseDate:'2/2/22',
         status:'pending' 
      }
      ]
    }
  }
})

Vue.component('active-contracts', {
  template: '#active-contracts'
})

new Vue({
  el: '#app',
  data: {
    currentView: 'existing-tenders',
    isExTender : true,
    isPlacedBids:false,
    isActiveContracts:false,
  },
  methods: {
    existingTender: function(){
      this.currentView = 'existing-tenders';
      this.isExTender = true;
      this.isPlacedBids = false;
      this.isActiveContracts = false;
    },
    placedBids: function(){
      this.currentView = 'placed-bids';
      this.isExTender = false;
      this.isPlacedBids = true;
      this.isActiveContracts = false;
    },
    activeContracts:function(){
      this.currentView = 'active-contracts';
      this.isExTender = false;
      this.isPlacedBids = false;
      this.isActiveContracts = true;
    },
    logout : function(){}
  }
})