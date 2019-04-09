
/***************************************************
 * Toggle between the "pages" in the app
 *************************************************/
$(document).ready(function () {
	$(".listItems").click(function (event) {
		var view = event.target.id;
		switch (view) {
			case "loginUser":
				$('#mainImgDiv').hide();
				$("#faqs").hide();
				$('#aboutMe').hide();
				$('#createAccount').show();
				break;
			case "about":
				$('#mainImgDiv').hide();
				$('#createAccount').hide();
				$('#setAppointment').hide();
				$("#faqs").hide();
				$('#aboutMe').show();
				break;

			case "faq":
				$('#mainImgDiv').hide();
				$('#createAccount').hide();
				$('#setAppointment').hide();
				$('#aboutMe').hide();
				$("#faqs").show();

				break;
			case "setUp":
				$('#mainImgDiv').hide();
				$("#faqs").hide();
				$('#aboutMe').hide();
				$('#setAppointment').show();
				$('#appointmentForm').hide();
				$('#calendar').show();
				getCalendar('month');
				break;
			case "newAccount":
				$('#mainImgDiv').hide();
				$("#faqs").hide();
				$('#aboutMe').hide();
				$('#createAccount').show();
				break;
			
			case "signout":
				window.location.href = '/signOut';
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
			window.location.href = '/';
			
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
function getCalendar(calendarView) {

	var calendar = $("#calendar").calendar(
		{
			tmpl_path: "../bower_components/bootstrap-calendar/tmpls/",
			view: calendarView,
			width: '95%',
			format12: true,
			time_start: "16:00",
			time_end: '18:00',
			events_source: '/event'
		})	
	

}

/***************************************************
 * set appointment buttons
 *************************************************/
$(document).ready(function () {
	$(".setButtons").click(function (event) {
		var view = event.target.id;
		switch (view) {
			
			case "schedule":
				$('#appointmentForm').show();
				$('#cancelAppointment').hide();
				$('#validateEvent').html("");
				$('#calendar').hide();
				break;
			case "cancel":
				$('#appointmentForm').hide();
				$('#calendar').hide();
				$('#validateEvent').html("");
				$('#cancelAppointment').show();
				break;
			case "month":
				$('#appointmentForm').hide();
				$('#cancelAppointment').hide();
				$('#validateEvent').html("");
				$('#calendar').show();
				getCalendar("month");
				break;
			case "week":
				$('#appointmentForm').hide();
				$('#cancelAppointment').hide();
				$('#validateEvent').html("");
				$('#calendar').show();
				getCalendar("week");				
				break;
			case "day":
				$('#appointmentForm').hide();
				$('#cancelAppointment').hide();
				$('#validateEvent').html("");
				$('#calendar').show();
				getCalendar("day");
				break;
			
		}
	});
});
/********************************************************
 * submit appointment form
 *******************************************************/
$(function () {
	$('#appForm').submit(function (event) {
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
				$('#validateEvent').html("Congratulations! Your appointment has been set");				

			} else {
				$('#validateEvent').html("This appointment time has already been filled. Please try another date or time. Thank you.");
			}
			
		}).fail(function (data) {
			alert("form failed");
		});
	});
});
/********************************************************
 * Cancel appointment
 *******************************************************/
$(function () {
	$('#cancelForm').submit(function (event) {
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
				$('#validateEvent').html("Your appointment has been canceled");

			} else {
				$('#validateEvent').html("No appointment to cancel on this day");
			}

		}).fail(function (data) {
			alert("form failed");
		});
	});
});
