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

	var toSend;

	if(officername!=""||officername!=null){
		
		toSend = JSON.stringify(officerRegDetails);
		

	}else if(biddername!=""||biddername!=null){


		toSend = JSON.stringify(bidderRegDetails);


	}else{
		alert("form must not be empty");
	}




	

	console.log(toSend);

	
}