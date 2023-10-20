
//code only runs after the doc finishes loading
$(document).ready(function(){

    //at first, hide quiz section and results modal:
    $("#quizSection").hide();
    
//--------------------------------------------------------------------------------
    //global variables for timer:
    let seconds;
    let quizTimer;
    let minutes;
    let showSeconds;
    //global variable for userName
    let userName;
//--------------------------------------------------------------------------------
//function definitions

    //set up timer function:
    function startTimer(){
        seconds=0;
        quizTimer = setInterval(upTimer, 1000);
        function upTimer(){
            seconds++;
            minutes = Math.floor(seconds/ 60);
            showSeconds = seconds - (minutes * 60);
            if (showSeconds<10){
                $("#timer").html(`${minutes}:0${showSeconds}`);
            }
            else{
                $("#timer").html(`${minutes}:${showSeconds}`);
            }
        }
    }
    //validate if all questions were answered function:
    function allQuestionsAttempted(){
        //check to see if all questions have been answered:
        if (($("input[name='q1']").is(':checked'))
                &&($("input[name='q2']").is(':checked'))   
                &&($("input[name='q3']").is(':checked'))   
                &&($("input[name='q4']").is(':checked'))   
                &&($("input[name='q5']").is(':checked'))){
            
            return(true);
        }
        else{
            return(false);
        }
    }

    //flash the results 10 times function
    function flash(){
        for (let i=0; i<10;i++){
            $('#flashResults').fadeOut(500);
            $('#flashResults').fadeIn(500);
        }
    }
    //--------------------------------------------------------------------------------
    //click start button. 
    //If no name entered, display an alert, else start quiz and timer.
    $("#startQuizButton").click(function(){
        userName = $("#userName").val();
        if (userName ==""){
            $('#nameError').html("You must enter a name").css("color","red");
        }
        else{
            $("#quizSection").fadeIn(1000);
            $("#logOn").hide();
            console.log(userName);
            $("#userMessage").html(`Welcome ${userName}! Let's test your knowledge about the Czech Republic.`)
            //start the timer
            startTimer();
        }
    }); 
    //--------------------------------------------------------------------------------
    //click submit button. 
    $("#submitQuizButton").click(function(){ 
        //check if all questions were attempted:
        if(!allQuestionsAttempted()){
            $("#errorMessagesSpan").html("All questions must be answered").css("color","red");
        }
        else{
            //stop timer
            clearInterval(quizTimer);

            //clear error message
            $("#errorMessagesSpan").html("");

            //calculate total correct answers
            let totalCorrect = 0;
            if ($("#hockey").is(':checked')){
                totalCorrect++;
            }
            if ($("#beer").is(':checked')){
                totalCorrect++;
            }
            if ($("#prague").is(':checked')){
                totalCorrect++;
            }
            if ($("#four").is(':checked')){
                totalCorrect++;
            }
            if (($("#fk").is(':checked')) && ($("#am").is(':checked'))  && ($("#ad").is(':checked')) &!($("#ma").is(':checked')) &!($("#mc").is(':checked'))  ){
                totalCorrect++;
            }

            //display total quiz time in modal. if seconds less than 10, append a 0 before the number:
            let totalQuizTime;
            if (showSeconds<10){
                totalQuizTime = (`${minutes}:0${showSeconds}`);
            }
            else{
                totalQuizTime = (`${minutes}:${showSeconds}`);
            }
            //display all other results/ user name in modal
            $("#displayTotalTime").html(totalQuizTime);
            $("#results").html(`Results for ${userName}: ${totalCorrect}/5 correct`);
            $("#userResults").html(`Your score is ${totalCorrect}/5`).fadeIn(3000);
                //if all correct display extra message in modal:
            if (totalCorrect ==5){
                $("#perfect").html(`You scored ${totalCorrect}/5, great job!`);
            }
            else{
                $("#perfect").html("");
            }
            //show the modal by fading in over 3 seconds:
            $(".modal").fadeIn(3000).modal('show');
        }

        //delay calling flash function until after modal has fully fadded in:
        setTimeout(flash,3000);
    });

    //--------------------------------------------------------------------------------
    //display hints only while hovering over hint divs and display the answers in red:
    //Q1
     $("#q1HintDiv").hover(function(){
        $("#q1Answer").toggle().css({"color":"red"});
    });

    //Q2
    $("#q2HintDiv").hover(function(){
        $("#q2Answer").toggle().css({"color":"red"});
    });

    //Q3
    $("#q3HintDiv").hover(function(){
        $("#q3Answer").toggle().css({"color":"red"});
    });

    //Q4
    $("#q4HintDiv").hover(function(){
        $("#q4Answer").toggle().css({"color":"red"});
    });

    //Q5 
    $("#q5Hint").hover(function(){
        $("#q5Answer").toggle().css({"color":"red"});
    });
//------------------------------------------------------------------------------------
});

