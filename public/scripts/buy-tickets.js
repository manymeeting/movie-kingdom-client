$(function(){

	// calculate total price on input ticket number changes
	$(document).on("keyup", "#inputTicketNum", function(){
		var ticketPrice = parseFloat($("#ticketPrice").text());
		var ticketNum = $("#inputTicketNum").val();
		$("#totalPrice").val(Math.round( ticketPrice * ticketNum * 10 ) / 10);
	})
})