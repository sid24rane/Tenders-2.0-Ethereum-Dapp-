var current_tender_address = "";
var current_contract_address = "";
var clauseCount = 0;

Vue.component('existing-tenders', {
  template: '#existing-tenders',
  data:function(){
    return {
      existingTenders:[]
    }
  },
  mounted(){
    this.existingTenders = getExistingTenders();
  },
  methods: {
      placeBids : function(event){
        event.preventDefault();
        var tender_address = event.srcElement.id;
        console.log(tender_address);
        this.$parent.currentView = 'place-bid';
        current_tender_address = tender_address;  
      }
    }
  
})



Vue.component('placed-bids', {
  template: '#placed-bids',
  data:function(){
    return{
      biddedTenders:[]
    }
  },
  mounted(){
    var bidderAddress = "";
    var res = placedBids(bidderAddress);
    var tres = res.length;
    for(var i=0;i<tres;i++){
          var obj = res[i];
          var tenderinfo = obj.tenderInfo;
          var status = obj.status;
          this.biddedTenders.push({
            name:tenderinfo.tenderName,
            bidCloseDate:tenderinfo.bidSubmissionClosingDate,
            status:status
          });
    }
  }
})





Vue.component('place-bid', {
  template: '#place-bid',
  data:function(){
    return{
      name:'',
      id:'',
      coverCount:0,
      milestonesCount:0,
      bidSubmissionClosingDate:'',
      bidOpeningDate:'',
      clauses:[],
      constraints:[],
      milestones:[],
      quotedamount:[]     
    }
  },
  mounted(){
    var res = getTenderInfo(current_tender_address);
    var basic = res.basic;
    var advanced = res.advanced;
    this.name = basic.tenderName;
    this.id = basic.tenderId;
    this.coverCount = basic.covers;
    this.bidSubmissionClosingDate = basic.bidSubmissionClosingDate;
    this.bidOpeningDate = basic.bidOpeningDate;

    var clauses = advanced.clauses;
    var len = clauses.length;
    clauseCount = len;

    for(var i=0;i<len;i++){
      this.clauses.push({
        name:clauses[i]
      });
    }


    var constraints = advanced.constraints;
    var clen = constraints.length;
    for(var i =0;i<clen;i++){
      this.constraints.push({
        name:constraints[i]
      });
    }

    var tasks = advanced.taskName;
    var taskdays = advanced.taskDays;
    var tlen = taskdays.length;

    for(var i=0;i<tlen;i++){
      this.milestones.push({
        name:tasks[i],
        days:taskdays[i]
      });
    }

  },
  methods:{

    // TBD SOLVED
    newBid : function(event){
      event.preventDefault();
      var obj = {};
      obj.quotationClause = [];
      obj.quotationAmount = [];
      if(placeBid(current_tender_address,obj)){
          console.log("done!");
      } else{
        console.log("error!");
      }       
    }
  }
})







Vue.component('active-contracts', {
  template: '#active-contracts',
  data:function(){
    return{
      contracts:[]
    }
  },
  mounted(){
    var bidderAddress = "";
    var res = getActiveContractsBasicInfo(bidderAddress);
    var resActiveContracts = res.activeContracts;
    var len = res.allInfo.length;
    for(var i =0;i<len;i++){
      var obj = res.allInfo[i];
      this.contracts.push({
        name: obj.contractName,
        expectedCompletionDate: obj.completionDate,
        creationDate: obj.creationDate,
        address: resActiveContracts[i]
      });
    }
  },
  methods: {
    activeContractsDetails: function(event){
      event.preventDefault();
      var contract_address = event.srcElement.id;
      console.log(contract_address);
      current_contract_address = contract_address;
      this.$parent.currentView = 'active-contracts-details';
    }
  } 
})



Vue.component('active-contracts-details', {
  template: '#active-contracts-details',
  data:function(){
      return{
      name:'',
      id:'',
      coverCount:0,
      milestonesCount:0,
      bidSubmissionClosingDate:'',
      bidOpeningDate:'',
      contractStartingDate:'',
      milestones:[]
    }
  },
  mounted(){
    var res = getContractInfo(current_contract_address,2);
    
    var basic = res.basic;
    var advanced = res.advanced;

    this.name = basic.tenderName;
    this.id = basic.tenderId;
    this.coverCount = basic.covers;
    this.milestonesCount = advanced.taskName.length;
    this.bidSubmissionClosingDate = basic.bidSubmissionClosingDate;
    this.bidOpeningDate = basic.bidOpeningDate;
    this.contractStartingDate = basic.creationDate;
    
     // ERROR YENAR
   var tasks = res.tasks;
   var tlen = tasks.length;
   for(var i=0 ;i<tlen;i++){
      var obj = tasks[i];
      this.milestones.push({
          name:obj.description,
          index:i
          deadline:obj.deadlineTime,
          status:obj.status
      });
   }
  },
  methods: {
    // activeContractsDetails: function(){
    //   this.$parent.currentView = 'active-contracts-details';
    // },
    viewDocs: function(){
      this.$parent.currentView = 'view-submitted-docs';
    },
    markMilestoneAsCompleted:function(event){
        event.preventDefault(); //TBD
        var milestoneIndex = event.srcElement.id;
        console.log(milestoneIndex);
        if(markTaskAsCompleted(current_contract_address,milestoneIndex)){
          console.log("done");
        }else{
          console.log("error!");
        }
    },
    withdrawMoney:function(event){
        event.preventDefault(); //TBD
        var milestoneIndex = event.srcElement.id;
        console.log(milestoneIndex);
        if (withdrawForTask(current_contract_address,milestoneIndex)) {
          console.log("done");
        }else{
          console.log("error!");
        }
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