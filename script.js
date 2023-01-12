// Creating tasks to be performed
tasks = [];

var loadTasks = function () {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = {};
  }
  printTasks(tasks);
};
// added parse/int to allow to grab text from textareas
var printTasks = function () {
  $.each(tasks, function (list, arr) {
    var newList = parseInt(list) + 9
    $("#task-" + newList).text(arr);
  });
};
// Added date to Header section
var Today = dayjs().format("MMMM D YYYY");
$("#currentDay").text(Today);

// Creating for loop to change to change hours from past to present to future during day
var hourAudit = function () {
  var currentHour = dayjs().hour();

  for (var i = 8; i < 18; i++) {
    var taskArea = $("#task-" + i);
    if (currentHour > i) {
      $(taskArea).addClass("past");
    } else if (currentHour === i) {
      $(taskArea).addClass("present");
    } else {
      $(taskArea).addClass("future");
    }
  }
};

// Creating listener event (click) to allow text to be written in hour blocks text area
$(".taskBin").on("click", "p", function () {
  var text = $(this).text().trim();
  var textInput = $("<textarea>").addClass("form-control").val(text);
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});
// Updating tasks
$(".taskBin").on("blur", "textarea", function () {
  //  Get textarea current value of text
  var text = $(this).val().trim();

  // redefine p tag element
  var taskP = $("<p>").addClass("taskItem").text(text);
  // replace the textarea with the p tag element
  $(this).replaceWith(taskP);
});

// Creating button to save text area text to local storage
$(".saveBtn").on("click", function () {
  var index = $(".saveBtn").index(this);
  console.log(index);
  // tasks[index] = $(this).parent().find(".taskItem").text();
  tasks[index] = $(this).siblings(".description").val();
  console.log($(this).siblings(".description").val());
  console.log(tasks[index]);
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

setInterval(function () {
  hourChange();
}, 1000 * 60 * 60);

loadTasks();
// hourChange();
hourAudit();

