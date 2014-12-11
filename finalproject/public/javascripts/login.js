{{#if noFade}}
	{{#if noUser}}
		alert("User does not exist!");
	{{/if}}
	{{#if wrongPass}}
		alert("Wrong Password!");
	{{/if}}
{{else}}
    $(document).ready(function() {
    	$("body").css("display", "none");
    	$("body").fadeIn(1500);
    });
{{/if}}
