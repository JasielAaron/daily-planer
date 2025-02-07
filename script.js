
$(function () {

  // Displays the current date in the header 
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // Get Current hour in 24-hour format
  var currentHour = dayjs().hour();

  //first, clear any existing time-blocks
  $('.container-lg').empty();


  //Loops to create time blocks for the business hours (9am to 5pm)

  for(let i = 9; i <= 17; i++) {
    var blockId = 'hour-' + i;
    var ampm =  i < 12 ? 'AM' : 'PM';
    var displayHour = i <= 12 ? i : i -12;

    //Create the time block HTML structure Dynamically
    var timeBlockHtml = `
    <div id="${blockId}" class="row time-block">
      <div class="col-2 col-md-1 hour text-center py-3">${displayHour}${ampm}</div>
      <textarea class="col-8 col-md-10 description" rows="3"></textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>
  `;

  //Append the new time block to the container 
  $('.container-lg').append(timeBlockHtml);
  }

  // Loop through each time block and apply past, present, or future class
  $('.time-block').each(function () {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);

    //Add class based on the comparision between the current hour and the block hour 

    if(blockHour < currentHour) {
      $(this).addClass('past');
    } else if (blockHour === currentHour) {
      $(this).addClass('present'); 
    } else {
      $(this).addClass('future');
    }

    var savedTask = localStorage.getItem(blockHour);
    if (savedTask) {
      $(this).find('.description').val(savedTask);
    }
  });

  //Add click Event lister to save buttons 

  $('.saveBtn').on('click', function (){
    var hour = $(this).closest('.time-block').attr('id').split('-')[1];
    var task = $(this).siblings('.description').val();
    //Saves the task in local storage
localStorage.setItem(hour, task);
  });
});