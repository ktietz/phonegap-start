/**
 * Created with JetBrains PhpStorm.
 * User: Karl
 * Date: 2013-07-25
 * Time: 1:35 PM
 * To change this template use File | Settings | File Templates.
 */

var rootURL = 'http://localhost/karl/api/blog';
var currentEntry;

function getEntries($page){
    $.ajax({
        type: 'GET',
        url: rootURL,
        dataType: 'json',
        success: ($page == 'blogger') ? populateList : renderBlog
    });
}

function getEntryByID(id){
    $.ajax({
        type: 'GET',
        url: rootURL + "/" + id,
        dataType: 'json',
        success: function(data){
            currentEntry = data;
            renderDetails(currentEntry);
        }
    });
}

function addEntry(){
    console.log('add entry');
    $.ajax({
       type: 'POST',
       contentType: 'application/json',
       url: rootURL,
       dataType: "json",
       data: formToJSON(),
       success: getEntries('blogger'),
       error: showFailure
    });
}

function deleteEntry(){
    $.ajax({
        type: 'DELETE',
        url: rootURL + '/' + $('#iID').val(),
        success: getEntries('blogger'),
        error: showFailure
    });
}

function showFailure(jqXHR, textStatus, errorThrown) {
    $('div.response').text('Error: ' + textStatus + " " + errorThrown)
}

function renderBlog(data){
    console.log('renderBlog');
    templateText = $('#entryTemplate').html();
    demoTemplate = _.template(templateText);

    $.each(data.Entries, function(index, entry){
        parsedTemplate = demoTemplate(entry);
        $('div#container').append(parsedTemplate);
    });
}

function populateList(data){
    templateText = $('#listTemplate').html();
    demoTemplate = _.template(templateText);

    $('ul.viewEntries li').remove();
    $.each(data.Entries, function(index, entry){
        parsedTemplate = demoTemplate(entry);
        $('ul.viewEntries').append(parsedTemplate);
    });
}

function renderDetails(entry){
    $('#iID').val(entry.ID);
    $('#iTitle').val(entry.Title);
    $('#iDate').val(entry.Date);
    $('#iContent').val(entry.Content);
}

// Helper function to serialize all the form fields into a JSON string
function formToJSON() {
    return JSON.stringify({
        "ID": $('#iID').val(),
        "Title": $('#iTitle').val(),
        "Date": $('#iDate').val(),
        "Content": $('#iContent').val()
    });
}