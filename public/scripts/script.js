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
				$('#mainImgDiv').hide();
				getCalendar();
				break;
			case "cat":
				break;
			case "dogSit":
				break;	
			case "signout":
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
			if ($.trim(data) == 'true') {
				console.log("it was true");
				window.location.href = '/';
				
			} else if ($.trim(data) == "Username") {
				$('#validateLogin').html("Username is not valid!");
			} else {
				$('#validateLogin').html("Password is not valid!");
			}


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
/********************************************************
 * calendar
 *******************************************************/
function getCalendar() {

	var calendar = $("#calendar").calendar(
		{
			tmpl_path: "../bower_components/bootstrap-calendar/tmpls/",
			view: "month",
			format12: true,
			time_start: "16:00",
			time_end: '18:00',
			events_source: [
				{
					"id": 2,
					"title": "walking tess",
					"url": "/event",
					"class": "event_important",
					"start": 1553369673299,
					"end": 1553369700840
				},
				{
					"id": 3,
					"title": "walking bob",
					"url": "/event",
					"class": "event_important",
					"start": 1553370020146,
					"end": 1553370073234
				},
				{
					"id": 4,
					"title": "walking bob",
					"url": "/event",
					"class": "event_important",
					"start": 1553370020146,
					"end": 1553370073234
				}]
		})	

}
function readData(data) {
	

	var array = [];

	for (var i = 0; i < data.length; i++) {
		
		var temp = {
			"id": data[i].id,
			"title": data[i].title,
			"url": data[i].url,
			"class": data[i].class,
			"start": data[i].start,
			"end" : data[i].end
		}
		array.push(temp);
	}
	
	return array;
}
/*function () {
	$.ajax({
		type: 'get',
		url: '/event',

	}).done(function (data) {
		console.log(readData(data));
		return readData(data);

	}).fail(function (data) {
		alert("form failed");
	});
}*/