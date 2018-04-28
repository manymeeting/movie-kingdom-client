$(function(){
	$(document).on("click", ".mk-header-search-options", function(){
		// update label text
		var labelText = $(this).text();
		$("#headerSearchLabel").text(labelText);

		// set search type 
		var searchType = $(this).attr("searchType");
		$("#inputHeaderSearchType").val(searchType);
	})
})