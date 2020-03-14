$(".delburger").on("click", function (event) {
    // Get the ID from the button.
    // This is shorthand for $(this).attr("data-planid")
    var id = $(this).data("burgerid");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
        method: "PUT"
    }).then(
        function () {
            console.log("deleted id ", id);
            // Reload the page to get the updated list
            location.reload();
        }
    );
});

$("#createburger").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // [name=plan] will find an element with a "name" attribute equal to the string "plan"
    var newBurger = {
        name: $("#createburger [name=burger]").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
    }).then(
        function () {
            console.log("created new burger");
            // Reload the page to get the updated list
            location.reload();
        }
    );
});

$("#updateburger").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    // Get the ID by finding an element with a "name" attribute equal to the string "id"
    var id = $("[name=id]").val().trim();

    var updatedBurger = {
        name: $("#updateburger [name=burger]").val().trim()
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: updatedBurger
    }).then(
        function () {
            console.log("updated id ", id);
            // Reload the page to get the updated list
            location.reload();
        }
    );
});