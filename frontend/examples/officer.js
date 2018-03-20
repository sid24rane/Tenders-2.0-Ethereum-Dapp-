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
        orgchain: this.organisationChain,
        refno: this.referenceNumber,
        type:this.type,
        category:this.category,
        cdate:this.closingDate,
        odate:this.openingDate
      };
      this.clearFields();
      console.log(JSON.stringify(newTender));
      
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