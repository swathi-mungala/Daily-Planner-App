// Wait for the document to be ready
$(document).ready(function() {

    // Display the current day in the element with the id "currentDay"
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  
    // Create timeblocks for standard business hours (9 AM to 5 PM)
    for (let hour = 9; hour <= 17; hour++) {
  
      // Create a div element with the class "time-block"
      let timeBlock = $("<div>").addClass("time-block");
  
      // Create a div element with the class "time-label" to display the hour
      let timeLabel = $("<div>").text(dayjs().hour(hour).format("hA"));
  
      // Create an input element for the user to enter an event
      let eventInput = $("<input>").attr("type", "text").addClass("event-input");
  
      // Create a button element with the class "save-button" for saving the event
      let saveButton = $("<button>").text("Save").addClass("save-button");
  
      // Append the time label, event input, and save button to the time block
      timeBlock.append(timeLabel, eventInput, saveButton);
  
      // Append the time block to the element with the id "timeblocks"
      $("#timeblocks").append(timeBlock);
  
      // Color-code timeblocks based on past, present, or future
      let currentTime = dayjs().hour();
  
      if (hour < currentTime) {
        timeBlock.addClass("past");
      } else if (hour === currentTime) {
        timeBlock.addClass("present");
      } else {
        timeBlock.addClass("future");
      }
    }
  
    // Load events from local storage
    $(".time-block").each(function(index) {
      let storedEvent = localStorage.getItem("event_" + index);
      if (storedEvent) {
        $(this).find(".event-input").val(storedEvent);
      }
    });
  
    // Save event to local storage when the save button is clicked
    $(".save-button").on("click", function() {
      // Find the index of the time block associated with the clicked save button
      let index = $(this).closest(".time-block").index();
      
      // Get the text from the event input within that time block
      let eventText = $(this).siblings(".event-input").val();
      
      // Save the event text to local storage with a key based on the index
      localStorage.setItem("event_" + index, eventText);
    });
  });
  