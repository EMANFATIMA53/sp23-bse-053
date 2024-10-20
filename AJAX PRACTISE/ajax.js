
$(document).ready(function() {
    // GET request
    $("#loadData").click(function() {
        $.get("ajax/test.html", function(data) {
            $("#result").html(data);
            alert("Data loaded successfully with GET request.");
        }).fail(function() {
            alert("Error loading data: 404 Not Found.");
        });
    });

    // POST request
    $("#submitData").click(function() {
        var postData = {
            name: $("#name").val(),
            message: $("#message").val()
        };

        $.post("ajax/test.html", postData, function(response) {
            $("#result").html(response);
            alert("Data submitted successfully with POST request.");
        }).fail(function() {
            alert("Error submitting data: 404 Not Found.");
        });
    });
});

