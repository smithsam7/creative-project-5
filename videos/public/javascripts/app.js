/*global $*/
/*global jobj*/
$(document).ready(function() {
    $("#postVideos").click(function() {
        var myobj = { Name: $("#name").val(), Video: $("#video").val() };
        jobj = JSON.stringify(myobj);
        //$("#json").text(jobj);
        var url = "video";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                //$("#done").html(textStatus);
            }
        })

    });

    $("#getVideos").click(function() {
        var query = $("#query").val();
        var url = "video?q=" + query;
        console.log(url);
        $.getJSON(url, function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var video in data) {
                vid = data[video];
                everything += "<li>" + vid.Name + "<br> ";
                everything += "<iframe width='320' height='225' src='" + vid.Video + "'";
                everything += "frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>";
                everything += "</li>";
            }
            everything += "</ul>";
            $("#videos").html(everything);
        })
    })
    
    $("#deleteVideos").click(function() {
	var url = "video"; 	
	$.ajax({
		url: url,
		type: "DELETE",
		contentType: "application/json; charset=utf-8",
		success: function(data,textStatus) {
		//$("#done").html(textStatus);
	}

	})
  });

});
