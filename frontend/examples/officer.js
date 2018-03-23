var governmentOfficerNodeAddress = "";
var current_tender_address = "";
var current_bid_index = 0;
var current_contractor_address="";

Vue.component('create-tender', {
  template: '#create-tender',
  data(){
      return {
      coverinputs: [],
      clauseinputs:[],
      coverinputsArr: [], // arrays are for sending to chain
      clauseinputsArr:[],
      milestonesinputs:[],
      taskName: [],
      noOfDays: [],
      name:'',
      id:'',
      organisationChain:'',
      referenceNumber:0,
      type:'',
      category:'',
      closingDate:'',
      openingDate:''
    }
  },
  methods: {
    addCover(event) {
      event.preventDefault();
      this.coverinputs.push({name:''});
    },
    addClause(event){
      event.preventDefault();
      this.clauseinputs.push({name:''});
    },
    addMilestones(event){
      event.preventDefault();
      this.milestonesinputs.push({
        taskName:'',
        noOfDays:''
      });


    },
    createObject(event){
      event.preventDefault();
      this.fillArrays();
      var newTender = {
        
        taskName: this.taskName,
        noOfDays: this.noOfDays,
        coverinputsArr:this.coverinputsArr,
        clauseinputsArr:this.clauseinputsArr,
        name: this.name,
        id: this.id,
        cdate:this.closingDate,
        odate:this.openingDate
      };
      this.clearFields();
      console.log(JSON.stringify(newTender));
      if(createTender(governmentOfficerNodeAddress,newTender.name,newTender.id,newTender.cdate,newTender.odate,coverinputs.length,clauseinputsArr,newTender.taskName,newTender.noOfDays)){
        console.log("done!");
      }else{
        console.log("error!");
      }      
    },
    clearFields(){
      this.coverinputs = [];
      this.clauseinputs=[];
      this.clauseinputsArr=[];
      this.coverinputsArr= [];
      this.milestonesinputs=[];
      this.taskName= [];
      this.noOfDays= [];
      this.name='';
      this.id='';
      this.organisationChain='';
      this.referenceNumber=0;
      this.type='';
      this.category='';
      this.closingDate='';
      this.openingDate='';
    },
    fillArrays(){
      for(i=0;i<this.milestonesinputs.length;i++){
        
        this.taskName.push(this.milestonesinputs[i].taskName);
        this.noOfDays.push(this.milestonesinputs[i].noOfDays);
      }

      for(i=0;i<this.coverinputs.length;i++){
        this.coverinputsArr.push(this.coverinputs[i].name);
      }

      for(i=0;i<this.clauseinputs.length;i++){
        this.clauseinputsArr.push(this.clauseinputs[i].name);
      }
    }
  }
})



Vue.component('expired-tenders', {
  template: '#expired-tenders',
  data:function(){
    tenders:[]
  },
  mounted(){
    this.tenders = getExpiredTenders();
  },
  methods: {
    biddingList: function(event){
      event.preventDefault();
      var tender_address = event.srcElement.id;
      console.log(tender_address);
      this.$parent.currentView = 'bidding-list';
      current_tender_address = tender_address;
    }
  }
})




Vue.component('ongoing-contracts', {
  template: '#ongoing-contracts'
})


Vue.component('active-contracts', {
  template: '#active-contracts',
  data: function(){
    return {
      activeContracts: [
          {
            name:"highway construction",
            closingDate: "12/98/25",
            bidCount: "97"
          }
      ]
    }
  },
  methods: {
    ongoingContractDetails : function(name){
      console.log("name"+ "  "+name);
      globalTenderName = name;
      this.$parent.currentView = 'ongoing-contracts-details';
    }
  }
})


Vue.component('ongoing-contracts-details', {
  template: '#ongoing-contracts-details',
  data :function(){
    return {
       tenderName : globalTenderName
    }
  },
  methods: {
    viewDocs: function(){
      this.$parent.currentView= 'view-submitted-docs';
    }
  }
})



Vue.component('bidding-list', {
  template: '#bidding-list',
  data:function(){
    return{
      biddings:[]
    }
  },
  mounted(){
      var res = getAllBids(current_tender_address);
      var len = res.length;
      for(var i=0;i<len;i++){
        var obj = res[i];
        this.biddings.push({
            index:i,
            contractorAddress:obj.contractorAddress,
            proposalAmount:obj.proposalAmount,
            status:obj.status
        });
      }
  },
  methods: {
    proposalDetails : function(event){
      event.preventDefault();
      var bidIndex = event.srcElement.id;
      console.log(bidIndex);
      this.$parent.currentView = 'proposal-details';
      current_contractor_address = biddings[bidIndex].contractorAddress;
      current_bid_index = bidIndex;
    }
  }
})



Vue.component('proposal-details', {
  template: '#proposal-details',
  data:function(){
    return{
      clauses:[]
    }
  },
  mounted(){
    var res = getProposalInfo(current_tender_address,current_bid_index);
    var quotationName = res.quotationClause;
    var quotationAmount = res.quotationAmount;
    var len = quotationAmount.length;
    for(var i=0;i<len;i++){
      this.clauses.push({
        name:quotationName[i],
        amount:quotationAmount[i]
      });
    }
  },
  methods : {
    contractDetails: function(event){
      event.preventDefault();
      var tender_address = event.srcElement.id;
      console.log(tender_address);
      this.$parent.currentView = 'contract-details';
      current_tender_address = tender_address;
    },
    viewDocs: function(){
      this.$parent.currentView= 'view-submitted-docs';
    }
  }
})

Vue.component('contract-details', {
  template: '#contract-details',
  data:function(){
      name:'',
      id:'',
      coverCount:0,
      milestoneCount:0,
      bidSubmissionClosingDate:'',
      bidOpeningDate:'',
      contractStartingDate:new Date(Date.now()),
      clauses:[],
      contractorAddress:current_contractor_address
      milestones:[]
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
    

    var res = getProposalInfo(current_tender_address,current_bid_index);
    var quotationName = res.quotationClause;
    var quotationAmount = res.quotationAmount;
    var len = quotationAmount.length;
    for(var i=0;i<len;i++){
      this.clauses.push({
        name:quotationName[i],
        amount:quotationAmount[i]
      });
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
  },
  methods: {
    viewDocs: function(){
      this.$parent.currentView= 'view-submitted-docs';
    },
    createContract: function(event){
      event.preventDefault();
      this.$parent.currentView = 'expired-tenders';
      var milestoneAmounts = [];
      // get dynamic values
      if(updateTenderToContract(current_tender_address,current_contractor_address,milestoneAmounts)){
        console.log('done');
      }else{
        console.log('error!');
      }
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
    isActiveContract: true,
    
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

var globalTenderName='';