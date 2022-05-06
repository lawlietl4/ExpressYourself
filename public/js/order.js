function formSubmit() {
	var data = new FormData();

	data.append("name", document.getElementById("orderName").value);
	data.append("email", document.getElementById("orderEmail").value);
	data.append("info", document.getElementById("orderInfo").value);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:3000/orderIntake");
	console.log(JSON.stringify(data));
	xhr.onload = function () {
		alert(this.response);
	};
	xhr.send(data);
	return false;
}
