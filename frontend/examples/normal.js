var current_tender_address = "";
var current_contract_address = "";

Vue.component('existing-tenders', {
  template: '#existing-tenders',
  data: function(){
    return {
      existingTenders: []      
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
      current_tender_address = tender_address;
    }
  }
})

Vue.component('ongoing-contracts', {
  template: '#ongoing-contracts',
  data: function(){
    return {
      ongoingContracts:[]
    }
  },
  mounted(){
    this.ongoingContracts = getOngoingContracts();
  },
  methods: {
    ongoingContractDetails : function(event){
      this.$parent.currentView = 'cm-ongoing-contract-details';
      event.preventDefault();
      var contract_address = event.srcElement.id;
      current_contract_address = contract_address;
      console.log(contract_address);
    }
  }
})

Vue.component('tender-info', {
  template: '#tender-info',
  data:function(){
    return{
      name:'',
      id:'',
      coverCount:0,
      milestoneCount:0,
      bidSubmissionClosingDate:'',
      bidOpeningDate:'',
      clauses:[],
      milestones:[]
    }
  },
  mounted(){
    var res = getTenderInfo(current_tender_address);
    var basic = res.basic;
    var adv = res.advanced;
    this.name = basic.tenderName;
    this.id = basic.tenderId;
    this.coverCount = basic.covers;
    this.milestoneCount = advanced.taskName.length;
    this.bidSubmissionClosingDate = basic.bidSubmissionClosingDate;
    this.bidOpeningDate = basic.bidOpeningDate;
    
    var clauses = advanced.clauses;
    var len = clauses.length;
    for(var i=0;i<len;i++){
      var str = clauses[i];
      this.clauses.push({name:str});
    }

    var tasks = advanced.taskName;
    var tdays = advanced.taskDays;
    var tlen = tasks.length;
    for(var i =0;i<tlen;i++){
      this.milestones.push({
        name:tasks[i],
        noOfDays:tdays[i]
      });
    }
  }
})

Vue.component('cm-ongoing-contract-details', {
  template: '#cm-ongoing-contract-details',
  data:function(){
    return{
      name:'',
      id:'',
      contractCompletionDate:'',
      milestoneCount:0,
      finalQuotationAmount:0,
      contractStartingDate:'',
      contractorAddress:'',
      clauses:[],
      milestones:[]
    }
  },
  mounted(){
    var res = getOngoingContractDetails(current_contract_address);
    var basic = res.basic;
    var advanced = res.advanced;
    this.name = advanced.contractName;
    this.id = basic.tenderId;
    this.milestoneCount = advanced.tasks.length;
    this.contractStartingDate = basic.creationDate;
    this.contractorAddress = basic.contractorAddress;
    this.finalQuotationAmount = advanced.finalQuotationAmount;
    this.contractCompletionDate = basic.CompletionDate;


    var constraints = advanced.constraints;
    var len = constraints.length;

    for(var i=0;i<len;i++){
      this.clauses.push({
        name:constraints[i]
      });
    }

 // ERROR YENAR
   var tasks = res.tasks;
   var tlen = tasks.length;
   for(var i=0 ;i<tlen;i++){
      var obj = tasks[i];
      this.milestones.push({
          name:obj.description,
          deadline:obj.deadlineTime,
          status:obj.status
      });
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