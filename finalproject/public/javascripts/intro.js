//	$(document).ready(function() {
//   		alert('hi');
//	});
    $(document).ready(function() {
        $("body").css("display", "none");
        $("body").fadeIn(2000);
    });
    setTimeout(function(){
		$('body').fadeOut(1500, function(){
			window.location = ("http://localhost:3000/login");
		});
	}, 3000);