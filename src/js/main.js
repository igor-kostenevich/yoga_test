//Dropdown menu
$(document).ready(function(){
  $(".menu-mobile").click(function(){
      $("nav ul").slideToggle("500");
    });
    $(window).resize(function(){
      if($(window).width() > 768){
       $("nav ul").removeAttr("style");
      }
  });
});

//Validate form
$(document).ready(function(){
  var validName = false;
  var validTel = false;

    $("#order").submit(function(event){
      event.preventDefault();
      
      var name = $('#name').val();
      var tel = $('#tel').val();

      if(name == ""){
        $('#name').parent().removeClass('has-success').addClass('has-error');
        validName = false;
      } else {
        $('#name').parent().removeClass('has-error').addClass('has-success');
        validName = true;
      }

      if(tel == ""){
        $('#tel').parent().removeClass('has-success').addClass('has-error');
        validTel = false;
      } else {
        $('#tel').parent().removeClass('has-error').addClass('has-success');
        validTel = true;
      }

      if(validName == true && validTel == true){
        $('#order').unbind('submit').submit();
      }
    });

});