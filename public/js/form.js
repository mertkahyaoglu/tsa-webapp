$(function () {

    $(document).ready(function () {
        $('.username input').keypress(function(e) {
            if(e.which == 13) {
                var username = $('.username input').val();
                window.location.href = "/username/"+username
            }
        });
        $('.username button').click(function(e) {
            var username = $('.username input').val();
            window.location.href = "/username/"+username;
        });
    });

});
