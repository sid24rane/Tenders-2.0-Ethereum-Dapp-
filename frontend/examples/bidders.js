Vue.component('existing-tenders', {
  template: '#existing-tenders',
  data:function(){
    return {
      existingTenders:[
        {
           name:'sid',
           bidSubmissionClosingDate:'34/23/45',
           closingDate:'34/10/2',
           address:'sdsd2323'
        },
        {
           name:'sid',
           bidSubmissionClosingDate:'34/23/45',
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

        // pass it
      }
    }
  
})

Vue.component('place-bid', {
  template: '#place-bid',
  data:function(){
    return{
       name:'highway',
      id:'223',
      coverCount:21,
      milestonesCount:5,
      bidSubmissionClosingDate:'22/13/11',
      bidOpeningDate:'23/1/34',
      clauses:[{
        name:'LOL'
      },{
        name:'sdj',
      }],
      constraints:[{
        name:'sdsd'
      },{
        name:'sdsd22222'
      }],
      milestones:[{
        name:'lol',
        days:23
      }]     
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
    activeContractsDetails: function(event){
      event.preventDefault();
      var contract_address = event.srcElement.id;
      console.log(contract_address);
      // pass this to active contract details
      this.$parent.currentView = 'active-contracts-details';
    }
  },
  data:function(){
    return{
      contracts:[{
        name:'sdsd',
        expectedCompletionDate:'23/134/56',
        status:'pending',
        address:'23skjbf34'
      }
     ]
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
    },
    markMilestoneAsCompleted:function(event){
        event.preventDefault(); //TBD
        var milestoneIndex = event.srcElement.id;
        console.log(milestoneIndex);
    },
    withdrawMoney:function(event){
      event.preventDefault(); //TBD
        var milestoneIndex = event.srcElement.id;
        console.log(milestoneIndex);
    }
  },
  data:function(){
      return{
      name:'highway',
      id:'223',
      coverCount:21,
      milestonesCount:5,
      bidSubmissionClosingDate:'22/13/11',
      bidOpeningDate:'23/1/34',
      contractStartingDate:'24/45/45',
      verifierAddress:'23efks45',
      clauses:[{
        name:'LOL',
        amount:5000
      },{
        name:'sdj',
        amount:51120
      }],
      milestones:[{
        name:'lol',
        index:0,
        deadline:'23/10/15',
        status:'pending'
      }]
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