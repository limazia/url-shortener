$(document).ready(function () {
  // Enable tooltip and popover
  $("body").tooltip({ selector: "[data-toggle=tooltip]" });
  $("body").popover({ selector: "[data-toggle=popover]" });
});

if (window.history.replaceState) {
  window.history.replaceState(null, null, window.location.href);
}