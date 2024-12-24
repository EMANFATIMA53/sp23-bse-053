// Handle form submission for Cash on Delivery (COD)
const $form = $("#checkout-form");

$form.submit(function (event) {
  event.preventDefault();

  // Disable the button to prevent multiple submissions
  $form.find("button").prop("disabled", true);

  // Perform basic validation
  const cityName = $("#city-name").val().trim(); // renamed input field to #card-name
  const address = $("#address").val().trim();
  const phone = $("#phone").val().trim();

  if (!cityName || !address || !phone) {
    alert("Please fill in all required fields.");
    $form.find("button").prop("disabled", false); // Re-enable submission
    return;
  }

  // Submit the form
  alert("Order placed successfully using Cash on Delivery.");
  $form.get(0).submit();
});
