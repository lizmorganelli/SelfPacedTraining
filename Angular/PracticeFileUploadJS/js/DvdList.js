$(document).ready(function () {

    loadDvds();

    $('#create-dvd-button').click(function (event) {
        $('#searchMenuDiv').hide();
        $('#dvdTableDiv').hide();
        $('#headerDiv').hide();
        $('#createDvdDiv').show();
    });

    $('#add-button').click(function (event) {
        createDvd();
    });

    $('#edit-button').click(function (event) {
        editDvd();
    });

    $('#search-button').click(function () {
        searchDvd();
    });

});

function loadDvds() {
    clearDvdTable();

    var contentRows = $('#contentRows');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/DvdLibrarySpringMVC/dvds',
        success: function (dvdArray) {
            $.each(dvdArray, function (index, dvd) {
                var row = '<tr>';
                row += '<td><div id="dvd' + dvd.dvdId + '">' + dvd.title + '</td>';
                row += '<td>' + dvd.releaseYear + '</td>';
                row += '<td>' + dvd.director + '</td>';
                row += '<td>' + dvd.rating + '</td>';
                //add onclick handler here
                row += '<td><a onclick="showEditDvdDiv(' + dvd.dvdId + ')">Edit</a>' + ' | ' + '<a onclick="deleteDvdModal(' + dvd.dvdId + ')">Delete</a></td>';
                row += '</tr>';

                contentRows.append(row);

                $('#dvd' + dvd.dvdId).click(function (event) {
                    retrieveDvd(dvd.dvdId);
                });

                $('#back-button').click(function (event) {
                    $('#searchMenuDiv').show();
                    $('#dvdTableDiv').show();
                    $('#headerDiv').show();
                    $('#retrieveDvdDiv').hide();
                });
            });
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' })
                    .text('Error calling web service. Please try again later.'));
        }
    });
}

function clearDvdTable() {
    $('#contentRows').empty();
}

function createDvd() {
    //this will take all input values from form and check for errors
    var haveValidationErrors = checkAndDisplayValidationErrorsForAdd($('#create-form').find('input'));
    //check i we do have validation errors
    //if we do, bail out
    if (haveValidationErrors) {
        return false;
    }

    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/DvdLibrarySpringMVC/dvd',
        data: JSON.stringify({
            title: $('#add-dvd-title').val(),
            releaseYear: $('#add-release-year').val(),
            director: $('#add-director').val(),
            rating: $('#add-category-dropdown').val(),
            notes: $('#add-notes').val(),
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        'dataType': 'json',
        success: function () {
            //first thing we should do is clear the error messages
            hideAddFormLoadDvd();
        },
        error: function () {
            $('#errorMessagesAdd')
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' })
                    .text('Error calling web service. Please try again later.'));
        }
    });
}

function hideAddFormLoadDvd() {
    emptyErrorMessages();
    //then clear the form
    $('#add-dvd-title').val('');
    $('#add-release-year').val('');
    $('#add-director').val('');
    $('#add-category-dropdown').val('Choose Rating');
    $('#add-notes').val('');

    $('#searchMenuDiv').show();
    $('#dvdTableDiv').show();
    $('#headerDiv').show();
    $('#createDvdDiv').hide();

    //reload the contacts (will include the new contact)
    loadDvds();
}

function deleteDvdModal(dvdId) {
    if (confirm('Are you sure you want to delete this DVD from your collection?')) {
        deleteDvd(dvdId);
    }
}

function deleteDvd(dvdId) {
    $.ajax({
        type: 'DELETE',
        url: 'http://localhost:8080/DvdLibrarySpringMVC/dvd/' + dvdId,
        success: function () {
            loadDvds();
        }
    });
}

function showEditDvdDiv(dvdId) {
    emptyErrorMessages();

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/DvdLibrarySpringMVC/dvd/' + dvdId,
        success: function (data) {
            $('#edit-dvd-title').val(data.title);
            $('#edit-release-year').val(data.releaseYear);
            $('#edit-director').val(data.director);
            $('#edit-category-dropdown').val(data.rating);
            $('#edit-notes').val(data.notes);
            $('#edit-dvd-id').val(data.dvdId);
        },
        error: function () {
            $('#errorMessagesEdit')
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' })
                    .text('Error calling web service. Please try again later.'));
        }
    })

    $('#searchMenuDiv').hide();
    $('#dvdTableDiv').hide();
    $('#headerDiv').hide();
    $('#editDvdDiv').show();

}

function editDvd() {

    //this will take all input values from form and check for errors
    var haveValidationErrors = checkAndDisplayValidationErrorsForEdit($('#edit-form').find('input'));
    //check i we do have validation errors
    //if we do, bail out
    if (haveValidationErrors) {
        return false;
    }

    $.ajax({
        type: 'PUT',
        url: 'http://localhost:8080/DvdLibrarySpringMVC/dvd/' + $('#edit-dvd-id').val(),
        data: JSON.stringify({

            dvdId: $('#edit-dvd-id').val(),
            title: $('#edit-dvd-title').val(),
            releaseYear: $('#edit-release-year').val(),
            director: $('#edit-director').val(),
            rating: $('#edit-category-dropdown').val(),
            notes: $('#edit-notes').val(),
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        'dataType': 'json',
        success: function () {
            //clear out errors first thing
            emptyErrorMessages();
            hideEditFormLoadDvd();
        },
        error: function () {
            $('#errorMessagesEdit')
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' })
                    .text('Error calling web service. Please try again later.'));
        }
    })

}

function hideEditFormLoadDvd() {
    emptyErrorMessages();

    dvdId: $('#edit-dvd-id').val('');
    title: $('#edit-dvd-title').val('');
    releaseYear: $('#edit-release-year').val('');
    director: $('#edit-director').val('');
    rating: $('#edit-category-dropdown').val('Choose Rating');
    notes: $('#edit-notes').val('');

    loadDvds();

    $('#searchMenuDiv').show();
    $('#dvdTableDiv').show();
    $('#headerDiv').show();
    $('#editDvdDiv').hide();
}

function retrieveDvd(dvdId) {
    emptyErrorMessages();
    $('#dvdHeader').empty();
    $('#retrieve-release-year').empty();
    $('#retrieve-director').empty();
    $('#retrieve-rating').empty();
    $('#retrieve-Notes').empty();


    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/DvdLibrarySpringMVC/dvd/' + dvdId,
        success: function (data) {
            $('#dvdHeader').append(data.title);
            $('#retrieve-release-year').append(data.releaseYear);
            $('#retrieve-director').append(data.director);
            $('#retrieve-rating').append(data.rating);
            $('#retrieve-Notes').append(data.notes);
        },
        error: function () {
            $('#errorMessages')
                .append($('<li>')
                    .attr({ class: 'list-group-item list-group-item-danger' })
                    .text('Error calling web service. Please try again later.'));
        }
    })

    $('#searchMenuDiv').hide();
    $('#dvdTableDiv').hide();
    $('#headerDiv').hide();
    $('#retrieveDvdDiv').show();
}

function searchDvd() {
    //this will take all input values from form and check for errors
    //var haveValidationErrors = checkAndDisplayValidationErrorsForSearch($('#search-form').find('input'));
    //check i we do have validation errors
    //if we do, bail out
    //if (haveValidationErrors) {
    //   return false;
    //}

    clearDvdTable();
    var searchTerm = $('#enter-search-term').val();

    if ($('#category-dropdown').val() == "Title") {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/DvdLibrarySpringMVC/dvds/title/' + searchTerm,
            success: function (dvdArray) {
                filterTableForSearch(dvdArray);
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({ class: 'list-group-item list-group-item-danger' })
                        .text('Error calling web service. Please try again later.'));
            }
        })
    } else if ($('#category-dropdown').val() == "Release Year") {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/DvdLibrarySpringMVC/dvds/year/' + searchTerm,
            success: function (dvdArray) {
                filterTableForSearch(dvdArray);
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({ class: 'list-group-item list-group-item-danger' })
                        .text('Error calling web service. Please try again later.'));
            }
        })
    } else if ($('#category-dropdown').val() == "Director Name") {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/DvdLibrarySpringMVC/dvds/director/' + searchTerm,
            success: function (dvdArray) {
                filterTableForSearch(dvdArray);
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({ class: 'list-group-item list-group-item-danger' })
                        .text('Error calling web service. Please try again later.'));
            }
        })
    } else if ($('#category-dropdown').val() == "Rating") {

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/DvdLibrarySpringMVC/dvds/rating/' + searchTerm,
            success: function (dvdArray) {
                filterTableForSearch(dvdArray);
            },
            error: function () {
                $('#errorMessages')
                    .append($('<li>')
                        .attr({ class: 'list-group-item list-group-item-danger' })
                        .text('Error calling web service. Please try again later.'));
            }
        })
    } else {
        $('#enter-search-term').val('');
        loadDvds();
    }

}

function filterTableForSearch(dvdArray) {
    var contentRows = $('#contentRows');

    //if (dvdArray != null) {
        $.each(dvdArray, function (index, dvd) {
            var row = '<tr>';
            row += '<td><div id="dvd' + dvd.dvdId + '">' + dvd.title + '</td>';
            row += '<td>' + dvd.releaseYear + '</td>';
            row += '<td>' + dvd.director + '</td>';
            row += '<td>' + dvd.rating + '</td>';
            //add onclick handler here
            row += '<td><a onclick="showEditDvdDiv(' + dvd.dvdId + ')">Edit</a>' + ' | ' + '<a onclick="deleteDvdModal(' + dvd.dvdId + ')">Delete</a></td>';
            row += '</tr>';

            contentRows.append(row);

            $('#dvd' + dvd.dvdId).click(function (event) {
                retrieveDvd(dvd.dvdId);
            });

            $('#back-button').click(function (event) {
                $('#searchMenuDiv').show();
                $('#dvdTableDiv').show();
                $('#headerDiv').show();
                $('#retrieveDvdDiv').hide();
            });
        });
    //} else {
   //    var row = '<tr>Your search term did not return any results! </tr>';

    //   contentRows.append(row);
    //}
}

function checkAndDisplayValidationErrorsForEdit(input) {
    emptyErrorMessages();

    var errorMessagesEdit = [];

    input.each(function () {

        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessagesEdit.push(errorField + ' ' + this.validationMessage);
        }
    });

    if (errorMessagesEdit.length > 0) {
        $.each(errorMessagesEdit, function (index, message) {
            $('#errorMessagesEdit').append($('<li>').attr({ class: 'list-group-item list-group-item-danger' }).text(message));
        });
        return true;
    } else {
        return false;
    }

}

function checkAndDisplayValidationErrorsForAdd(input) {
    emptyErrorMessages();

    var errorMessagesAdd = [];

    input.each(function () {

        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessagesAdd.push(errorField + ' ' + this.validationMessage);
        }
    });

    if (errorMessagesAdd.length > 0) {
        $.each(errorMessagesAdd, function (index, message) {
            $('#errorMessagesAdd').append($('<li>').attr({ class: 'list-group-item list-group-item-danger' }).text(message));
        });
        return true;
    } else {
        return false;
    }
}

function checkAndDisplayValidationErrorsForSearch(input) {
    emptyErrorMessages();

    var errorMessagesSearch = [];

    input.each(function () {

        if (!this.validity.valid) {
            var errorField = $('label[for=' + this.id + ']').text();
            errorMessagesSearch.push(errorField + ' ' + this.validationMessage);
        }
    });

    if (errorMessagesSearch.length > 0) {
        $.each(errorMessagesSearch, function (index, message) {
            $('#errorMessagesSearch').append($('<li>').attr({ class: 'list-group-item list-group-item-danger' }).text(message));
        });
        return true;
    } else {
        return false;
    }
}

function emptyErrorMessages() {
    $('#errorMessagesAdd').empty();
    $('#errorMessagesEdit').empty();
}


