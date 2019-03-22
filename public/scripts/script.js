/***************************************************
 * Toggle between the "pages" in the app
 *************************************************/
$(document).ready(function () {
	$(".listItems").click(function (event) {
		var view = event.target.id;
		switch (view) {
			case "loginUser":
				$('#mainImgDiv').hide();
				$('#createAccount').show();

				break;
			case "about":
				break;
			case "faq":
				break;
			case "setUp":
				break;
			case "cat":
				break;
			case "dogSit":
				break;			
		}
	});
});

/********************************************************
 * submit registration form
 *******************************************************/
$(function () {
	$('#userForm').submit(function (event) {
		event.preventDefault(); 
		var form = $(this);
		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: form.serialize()
		}).done(function (data) {
			console.log(data);

			
		}).fail(function (data) {
			alert("form failed");
		});
	});
});
/********************************************************
 * submit login form
 *******************************************************/
$(function () {
	$('#loginForm').submit(function (event) {
		event.preventDefault();
		var form = $(this);
		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: form.serialize()
		}).done(function (data) {
			console.log(data);


		}).fail(function (data) {
			alert("form failed");
		});
	});
});

/********************************************************
 * get to registration page
 *******************************************************/
$(function () {
	$('#registration').click(function () {
		$('#loginDisplay').hide();
		$('#register').show();
	});
});