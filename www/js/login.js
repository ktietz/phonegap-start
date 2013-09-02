/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-07-26
 * Time: 1:13 PM
 * To change this template use File | Settings | File Templates.
 */


function login() {
    var $username = $('#iUsername').val();
    var $password = $('#iPassword').val();
    var pwdHash = hashIt($password);
    // TODO: Salt your password, but not client side

    // jQuery
    $.ajax({
        url : "login.php",
        method : 'POST',
        data : {username: $username, password: pwdHash},
        success : (function (data){
            var $token = data;

            if(localStorage){
                localStorage.setItem('token', JSON.stringify($token));
            }

            window.location.href = "/karl/blogger.html";
        })
    });
}

function logout() {
    if(localStorage){
        localStorage.removeItem('token');
    }

    // TODO: Delete token and timestamp from database on logout.

    // redirect the user to the login page.
    window.location.href = "/karl/login.html";
}

function hashIt(term) {
    var hash = Base64.encode(term);
    return hash;
}

function validateToken() {
    var $token;

    if(localStorage){
        $token = $.parseJSON(localStorage.getItem('token'));
    }

    $.ajax({
        url : "login.php",
        method : 'GET',
        beforeSend: function(xhr){xhr.setRequestHeader('x-auth-token', $token);},
        success : function (data) {
            if (data == 'true'){
                renderBlogger();
            }
            else {
                window.location.href = "/karl/login.html";
            }
        }
    });
}

function renderBlogger() {
    $('div.mainwrap').load('includes/blogger-include.html');

    $('footer').load('includes/footer.html');
    $('header').load('includes/header.html');

    getEntries('blogger');

    $(document).ready(function() {

        $('.mainwrap').on('click', 'button', function(event){
            if (event.target.id == 'btnLogout') {
                logout();
            }
            else if (event.target.id == 'btnSubmit') {
                addEntry();
            }
            else if (event.target.id == 'btnDelete') {
                deleteEntry();
            }
        });



        $('.viewEntries a').live('click', function() {
            getEntryByID($(this).data('identity'));
        });
    });
}
