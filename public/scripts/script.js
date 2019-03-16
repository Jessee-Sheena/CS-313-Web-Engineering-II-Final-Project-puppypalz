/***************************************************
 * Toggle between the "pages" in the app
 *************************************************/
$(document).ready(function () {
	$(".listItems").click(function (event) {
		var view = event.target.id;
		switch (view) {
			case "login":
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
 * submit form
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