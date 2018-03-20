Vue.component('existing-tenders', {
  template: '#existing-tenders',
  data:function(){
    return {
      existingTenders:[
        {
           name:'sid',
           closingDate:'34/10/2',
           address:'sdsd2323'
        },
        {
           name:'sid',
           closingDate:'34/10/2',
           address:'dsd238934'
        }
      ]
    }
  },
    methods: {
      placeBids : function(event){
        event.preventDefault();
        var tender_address = event.srcElement.id;
        console.log(tender_address);
        this.$parent.currentView = 'place-bid';
      }
    }
  
})

Vue.component('place-bid', {
  template: '#place-bid',
  data:function(){
    return{
      name:'lol',
        
    }
  },
  mounted(){

  },
  methods:{
    existingTenders : function(){
      this.$parent.currentView = 'existing-tenders';
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
  template: '#active-contracts',
  methods: {
    activeContractsDetails: function(){
      this.$parent.currentView = 'active-contracts-details';
    }
  }
})

Vue.component('active-contracts-details', {
  template: '#active-contracts-details',
  methods: {
    activeContractsDetails: function(){
      this.$parent.currentView = 'active-contracts-details';
    },
    viewDocs: function(){
      this.$parent.currentView = 'view-submitted-docs';
    }

  }
})

Vue.component('view-submitted-docs', {
  template: '#view-submitted-docs'
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