Vue.component('verify-government-officer', {
  template: '#verify-government-officer',
  data: function(){
    return {
      govtOfficers:[
          {
            address:'23jkknsdf3',
            name: 'Ramesh',
            empID: '13134'
          }
      ]
    }
  },
  methods:{
    acceptOfficer(event){
      event.preventDefault();
      var officer_address = event.srcElement.id;
      console.log(officer_address);
    },
    rejectOfficer(event){
      event.preventDefault();
      var officer_address = event.srcElement.id;
      console.log(officer_address);
    }
  }
})

Vue.component('verify-bidders', {
  template: '#verify-bidders',
  data: function(){
    return {
      bidders: [
          {
            name: 'rane',
            gstNumber: '312414',
            address:'sijfjkn23434'
          }
      ]
    }
  },
  methods:{
    acceptBidder(event){
        event.preventDefault();
        var bidder_address = event.srcElement.id;
        console.log(bidder_address);
    },
    rejectBidder(event){
        event.preventDefault();
        var bidder_address = event.srcElement.id;
        console.log(bidder_address);
    }
  }
})

Vue.component('verify-tender-documents', {
  template: '#verify-tender-documents',
  data: function(){
    return {
      tenders: [
          {
            name: 'koi toh kaam',
            contractorAddress : 'dqwcw783y1f29',
          }
      ]
    }
  },
  methods:{
    viewAllDocs: function(){
      this.$parent.currentView='view-all-docs';
      
    }

  }
})

Vue.component('view-all-docs', {
  template: '#view-all-docs',
  data: function(){
    return {
      docs: [
          {
            name: 'Falana Dhimka proof'
          }
      ]
    }
  },
  methods:{
    returnToVerifyDocs: function(){
      this.$parent.currentView='verify-tender-documents';
    }
  }
})

new Vue({
  el: '#app',
  data: {
    currentView: 'verify-tender-documents',
    isGovtOfficer : false,
    isTenderDocument: true,
    isBidder : false
  },
  methods: {
    verifyGovernmentOfficer: function(){
      this.currentView = 'verify-government-officer';
      this.isGovtOfficer = true;
      this.isTenderDocument = false;
      this.isBidder  = false;
    },
    verifyBidder: function(){
      this.currentView = 'verify-bidders';
      this.isGovtOfficer = false;
      this.isTenderDocument =false;
      this.isBidder  =  true;
    },
    verifyTenderDocument: function(){
      this.currentView = 'verify-tender-documents';
      this.isGovtOfficer =  false;
      this.isTenderDocument = true;
      this.isBidder  = false;
    },
    logout: function(){}
  }
})