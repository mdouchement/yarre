$(document).foundation();

$(document).ready(function(){
  $("button").click(function(){
    var params = { "pattern":$("#pattern").val(), "input":$("#input").val() }
    $("#match_groups").load("/process", params, function(responseTxt,statusTxt,xhr){
      if(statusTxt=="error")
        alert("Error: "+xhr.status+": "+xhr.statusText);
    });
  });
});
