<?php

function var_error_log( $object=null ){
    ob_start();                    // start buffer capture
    var_dump( $object );           // dump the values
    $contents = ob_get_contents(); // put the buffer into a variable
    ob_end_clean();                // end capture
    error_log( $contents );        // log contents of the result of var_dump( $object )
}
error_log("starting");
if(isset($_REQUEST['email']) && $_REQUEST['message']){
    error_log("is submit");
    $to = "mperazac@yahoo.com"; // this is your Email address
    $from = "lamucacr"; // this is the sender's Email address
    $subject = "Email from La Muca CR";
    $message = "Email: " . $_REQUEST['email'] . "\n\n" . "Wrote the following: " . $_REQUEST['message'];
    $headers = "From:info@lamucacr.com";
    mail($to,$subject,$message,$headers);
}
