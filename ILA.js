/* Justin Carbonara (jmc543) CS530 Project Implementation */

/* enable ECMAscript 5 strict mode to attempt to catch errors */
"use strict";

/* function to toggle show/hide of div */
function toggleDiv(divId){
    $("#" + divId).toggle();
}

/* wrapper to allow two callbacks on network scan button click */
function toggleNetworkConfDivs(){
    toggleDiv('successMsg');
    toggleDiv('networkConfCancel');
}

/* function to play test notification */
$('#testNotificationButton').click( function (e) {
    console.log('clicked');
    alert('test');
});

/* jQuery items (not called until DOM is ready) */
var notificationId = 1; //global variable to keep track of notifications in list
var virtualPillCaddyNotificationType;
var virtualPillCaddySnoozeDuration;
var mealSchedulerNotificationType;
var mealSchedulerSnoozeDuration;
var transitNotifierNotificationType;
var transitNotifierSnoozeDuration;
$( document ).ready(function() {
    
    /* verify notification form not empty, save data, then close modal */
    $('#notificationSaveButton').click( function(e) {
        console.log("notificationSaveButton clicked");
        /* verify empty field error message is hidden: */
        $('#notificationEmptyFieldErrorMsg').hide();
        
        /* capture values from user input fields: */
        var pluginSelectVal = $('#pluginSelect').val();
        var notificationSelectVal = $('#notificationSelect').val();
        var snoozeInputVal = $('#snoozeInput').val();
        console.log(
            "Plugin: " + pluginSelectVal
            + ", Notification: " + notificationSelectVal
            + ", Snooze Duration: " + snoozeInputVal
        );

        /* update global variables and close modal if all fields have data, else warn user: */
        if(pluginSelectVal && notificationSelectVal && snoozeInputVal){
            switch(pluginSelectVal){
                case "virtualPillCaddy":
                    console.log("VPC");
                    virtualPillCaddyNotificationType = notificationSelectVal;
                    virtualPillCaddySnoozeDuration = snoozeInputVal;
                    $('#vpcNotificationType').text(virtualPillCaddyNotificationType);
                    $('#vpcSnoozeDuration').text(virtualPillCaddySnoozeDuration);
                    break;
                case "mealScheduler":
                    console.log("MS");
                    mealSchedulerNotificationType = notificationSelectVal;
                    mealSchedulerSnoozeDuration = snoozeInputVal;
                    $('#mealSchedulerNotificationType').text(mealSchedulerNotificationType);
                    $('#mealSchedulerSnoozeDuration').text(mealSchedulerSnoozeDuration);
                    break;
                case "transitNotifier":
                    console.log('TN');
                    transitNotifierNotificationType = notificationSelectVal;
                    transitNotifierSnoozeDuration = snoozeInputVal;
                    $('#transitNotifierNotificationType').text(transitNotifierNotificationType);
                    $('#transitNotifierSnoozeDuration').text(transitNotifierSnoozeDuration);
                    break;
            }
            /* close modal */
            $('#notificationModal').modal('hide');
        }
        else{
            //alert("You must fill in all forms!")
            $('#notificationEmptyFieldErrorMsg').show();
        }
    });
    
    /* code to test notification types */
    $('#testNotificationButton').click( function(e) {
        console.log("testNotificationButton clicked");
        /* show audio player controls for notification types */
        $('.testNotificationDivs').show();
    });
    
    /* verify dosage configuration form not empty, save data, then close modal: */
    $('#dosageConfigurationSaveButton').click( function(e) {
        console.log("dosageConfigurationSaveButton clicked");
        /* verify empty field error message is hidden: */
        $('#dosageConfigurationEmptyFieldErrorMsg').hide();

        /* capture values from user input fields: */
        var medicationNameSelectVal = $('#medicationNameSelect').val();
        var numberOfTabletsInputVal = $('#numberOfTabletsInput').val();
        var tabletSizeInputVal = $('#tableSizeInput').val();
        var dosageDaysInputVal = $('#dosageDaysInput').val();
        var dosageTimesInputVal = $('#dosageTimesInput').val();
        console.log(
            "Medication Name: " + medicationNameSelectVal
            + ", Number of Tablets: " + numberOfTabletsInputVal
            + ", Tablet Size: " + tabletSizeInputVal
            + ", Dosage Days: " + dosageDaysInputVal
            + ", Dosage Times: " + dosageTimesInputVal
        );

        /* close modal if all fields have data, else warn user: */
        if(medicationNameSelectVal && numberOfTabletsInputVal && tabletSizeInputVal && dosageDaysInputVal && dosageTimesInputVal){
            /* add entry to html */
            $('#dosagesList').append("<li id='" + window.notificationId + "'>"
                + "Medication Name: " + medicationNameSelectVal
                + ", Number of Tablets: " + numberOfTabletsInputVal
                + ", Tablet Size: " + tabletSizeInputVal + " mg"
                + ", Dosage Days: " + dosageDaysInputVal
                + ", Dosage Times: " + dosageTimesInputVal
                + "  <button data-id='" + window.notificationId + "' class='listRemoveButton'>Remove</button>"
                + " " + "<button id='testNotificationButton" + window.notificationId + "'data-toggle='modal' data-target='#testNotificationModal'>Test Notification</button>"
                + "</li>");

            /* hook up click event for new remove button */
            $(".listRemoveButton").click(function() {
                console.log("listRemoveButton clicked");
                var id = $(this).data('id');
                $("#" + id).remove();
            });

            /* create copy of notificationId prior to binding click event */
            var idCopy = parseInt(window.notificationId);
            /* hook up click event for new test notification button */
            $("#testNotificationButton" + window.notificationId).click(function() {
                console.log("testNotificationButton" + idCopy + " clicked");
                /* for project high-fidelity prototype, display test notification */
                $('#testNotificationMedicationName').text(medicationNameSelectVal);
                $('#testNotificationTabletSize').text(tabletSizeInputVal);
                /* stage test notifications for high-fidelity prototype */
                $('#loudHornTestNotificationDiv').hide();
                $('#loudHornTestNotificationDiv').show();
                document.getElementById('testNotificationLoudHornPlayer').play();
            });

            /* increment id for next notification: */
            window.notificationId++;
            /* close modal */
            $('#specifyMedicationModal').modal('hide');
        }
        else{
            //alert("You must fill in all forms!")
            $('#dosageConfigurationEmptyFieldErrorMsg').show();
        }
    });
    
    /* code to stage login form for high-fidelity prototype */
    $('#loginButton').click(function(){
        console.log("loginButton clicked");
        $('#loginDiv').show();
    })
    
});
