$(function() {
	$(document.getElementById("revenueSlider")).slider({
		value:0,
	    min: -.16,
	    max: .25,
	    step: .01,
	    slide: function( event, ui ) {
	    	$( "#revenue" ).val(ui.value );
	    }
	});
	$(document.getElementById("assetSlider")).slider({
		value:0,
	    min: -10,
	    max: 10,
	    step: 1,
	    slide: function( event, ui ) {
	    	$( "#asset" ).val(ui.value );
	    }
	});
	$(document.getElementById("capExSlider")).slider({
		value:0,
	    min: -10,
	    max: 10,
	    step: 1,
	    slide: function( event, ui ) {
	    	$( "#capex" ).val(ui.value );
	    }
	});
	$(document.getElementById("rndSlider")).slider({
		value:0,
	    min: -25,
	    max: 25,
	    step: 1,
	    slide: function( event, ui ) {
	    	$( "#rnd" ).val(ui.value );
	    }
	});
	$( "#revenue" ).val($( "#revenueSlider" ).slider( "value" ) );
	$( "#asset" ).val($( "#assetSlider" ).slider( "value" ) );
	$( "#capex" ).val($( "#capExSlider" ).slider( "value" ) );
	$( "#rnd" ).val($( "#rndSlider" ).slider( "value" ) );
});