Vue.component('existing-tenders', {
  template: '#existing-tenders',
  data: function(){
    return {
      existingTenders: [{
        address:'sdsd244',
        name:'sdsd',
        closingDate:'23/12/34',
        bidCount:23
      }]      
    }
  },
  mounted(){
    this.existingTenders = getExistingTenders();
  },
  methods: {
    tenderInfo : function(event){
      this.$parent.currentView = 'tender-info';
      event.preventDefault();
      var tender_address = event.srcElement.id;
      console.log(tender_address);
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
            status: 'ho gaya',
            address:'2jksnf2434'
          }
      ],
      name:'highway',
      id:'223',
      coverCount:21,
      milestoneCount:5,
      bidSubmissionClosingDate:'22/13/11',
      bidOpeningDate:'23/1/34',
      contractStartingDate:'24/45/45',
      verifierAddress:'23efks45',
      contractorAddress:'244jksbfu45',
      clauses:[{
        name:'LOL'
      },{
        name:'sdj'
      }],
      milestones:[{
        name:'lol',
        noOfDays:23
      }]

    }
  },
  methods: {
    ongoingContractDetails : function(event){
      this.$parent.currentView = 'cm-ongoing-contract-details';
       event.preventDefault();
      var contract_address = event.srcElement.id;
      console.log(contract_address);
    }
  }
})

Vue.component('tender-info', {
  template: '#tender-info',
  data:function(){
    return{
      name:'highway',
      id:'223',
      coverCount:21,
      milestoneCount:5,
      bidSubmissionClosingDate:'22/13/11',
      bidOpeningDate:'23/1/34',
      contractStartingDate:'24/45/45',
      verifierAddress:'23efks45',
      contractorAddress:'244jksbfu45',
      clauses:[{
        name:'LOL'
      },{
        name:'sdj'
      }],
      milestones:[{
        name:'lol',
        noOfDays:23
      }]
    }
  },
  mounted(){
    // get tender address
    //call
  }
})

Vue.component('cm-ongoing-contract-details', {
  template: '#cm-ongoing-contract-details',
  data:function(){
    return{
      name:'highway',
      id:'223',
      coverCount:21,
      milestoneCount:5,
      bidSubmissionClosingDate:'22/13/11',
      bidOpeningDate:'23/1/34',
      contractStartingDate:'24/45/45',
      verifierAddress:'23efks45',
      contractorAddress:'244jksbfu45',
      clauses:[{
        name:'LOL',
        amount:5000
      },{
        name:'sdj',
        amount:65451
      }],
      milestones:[{
        name:'lol',
        deadline:'22/10/10',
        status:'completed'
      }]
    }
  },
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