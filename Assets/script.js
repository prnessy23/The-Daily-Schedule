// Creating tasks to be performed
tasks =[];

var loadTasks = function(){
  tasks = JSON.parse(localStorage.getItem("tasks"))
  if(!tasks) {
    tasks={};
  } ;
  printTasks(tasks)
}


var printTasks = function(){
  $.each(tasks, function(list, arr) {

 var taskP = $("<p>").addClass("description task-item-" + list).text(arr) 

 $("#task-item-" + list).replaceWith(taskP);


  })
}
// Added date to Header section
var Today = (moment().format("MMMM D YYYY"))
$("#currentDay").text(Today);

// Creating for loop to change to change hours from past to present to future during day

var hourAudit =function(){
  var currentHour =moment().hour()

  for(var i=8; i<17; i++){
    var taskArea = $("#task-"+i)
    if(currentHour>i){
      $(taskArea).addClass("past");
    } else if (currentHour === i){
      $(taskArea).addClass("present");
    }
    else{
      $(taskArea).addClass("future");
    }
  }
  }

  // Creating listener event (click) to allow text to be written in hour blocks text area
$(".taskBin").on("click", "p", function(){
  var text =$(this)
  .text()
  .trim()
  var textInput =$("<textarea>")
  .addClass("form-control")
  .val(text);

  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});
// Updating tasks
$(".taskBin").on("blur","textarea", function(){
//  Get textarea current value of text
  var text = $(this)
  .val()
  .trim();

// redefine p tag element
  var taskP =$("<p>")
  .addClass("taskItem")
  .text(text);
// replace the textarea with the p tag element
  $(this).replaceWith(taskP);
});

// Creating button to save text area text to local storage
$(".saveBtn").on("click", function(){
var index =$(".saveBtn").index(this);
tasks[index] =$(this).parent().find(".taskItem").text();
localStorage.setItem("tasks",JSON.stringify(tasks));


});

setInterval(function(){
  hourChange();},1000*60*60);

  loadTasks();
  hourChange();



// $(function () {
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

  