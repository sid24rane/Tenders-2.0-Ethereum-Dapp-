function register(e){
	e.preventDefault();
	var officername = document.forms["officerform"]["name"].value;
	var oemail = document.forms["officerform"]["email"].value;
	var oaddress = document.forms["officerform"]["address"].value;
	var oempid = document.forms["officerform"]["empid"].value;
	var ocontact = document.forms["officerform"]["contact"].value;


	var biddername = document.forms["bidderform"]["name"].value;
	var bemail = document.forms["bidderform"]["email"].value;
	var baddress = document.forms["bidderform"]["address"].value;
	var bpan = document.forms["bidderform"]["pan"].value;
	var bcontact = document.forms["bidderform"]["contact"].value;
	var bgst = document.forms["bidderform"]["gst"].value;

	var officerRegDetails = {
			name : officername,
			email: oemail,
			address : oaddress,
			empid : oempid,
			contact : ocontact
		};

	var bidderRegDetails = {
			name : biddername,
			email : bemail,
			address : baddress,
			pan : bpan,
			contact: bcontact,
			gst : bgst
		};

	if(officername!=""||officername!=null){
		
		if(registerGovernmentOfficer(officerRegDetails.name, officerRegDetails.email, 
			officerRegDetails.address, officerRegDetails.empid, officerRegDetails.contact)){
				console.log("Govt officer registered");
		}else{
			console.log("error!");
		}		

	}else if(biddername!=""||biddername!=null){

		if(registerContractor(bidderRegDetails.name, bidderRegDetails.email, 
			bidderRegDetails.address, bidderRegDetails.pan, bidderRegDetails.contact,bidderRegDetails.gst)){
				console.log("contractor registered");
		}else{
			console.log("error!");
		}	

	}else{
		alert("form must not be empty");
	}
}