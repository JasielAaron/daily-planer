// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var localeSettings = {};
dayjs.locale(localeSettings);


$(function () {
  // Get hour using dayjs libary.
  var currentHour = dayjs().format("H");
  //function will change the color of time according to hour, present past future ect.
  function hourlyColor() {
    $('.time-block').each(function() {
      var blockHour = parseInt(this.id);
      $(this).toggleClass("past", blockHour < currentHour);
      $(this).toggleClass("present", blockHour === currentHour);
      $(this).toggleClass("future", blockHour > currentHour);
      
    });
  }

  //This function will save whatever the user inputs to localStorage when the save button is clicked
  function textEntry() {
    $(".saveBtn").on("click", function(){
      var key = $(this).parent().attr("id");
      var value = $(this).siblings(".description").val();
      localStorage.setItem(key,value);
    });
  }

  // will refresh the color of each time block
  function refreshColor() {
    $(".time-block").each(function(){
      var blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass("past future").addClass("present");
      }else if (blockHour < currentHour) {
        $(this).removeClass("future present").addClass("past");
      }else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }
// Gets user input from the localStorage also set textarea for each time block 
$(".time-block").each(function(){
  var key = $(this).attr("id");
  var value = localStorage.getItem(key);
  $(this).children(".description").val(value);
});
//to update date and time 
function currentTime() {
  var dateEl = $("#date");
  var timeEl = $("#time");
  var currentDay = dayjs().format(" dddd MMMM DD, YYYY");
  var currentTime = dayjs().format("hh:mm:ss A ");
  dateEl.text(currentDay);
  timeEl.text(currentTime);
} 
// call functions to set up the page 
hourlyColor();
textEntry();
refreshColor();
//will update time 
setInterval(currentTime, 1000);

});


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

