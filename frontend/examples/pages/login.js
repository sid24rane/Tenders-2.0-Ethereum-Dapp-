

function signin(e){
	e.preventDefault();
	var loginType = document.forms["login"]["loginType"].value;
	var address = document.forms["login"]["address"].value;

	var loginDetails = {
		type:loginType,
		walletAddress:address
	};

	console.log(JSON.stringify(loginDetails));

	document.forms["login"]["address"].value = '';
	document.forms["login"]["loginType"].value = '';
}