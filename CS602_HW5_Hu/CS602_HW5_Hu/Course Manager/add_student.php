<?php
// Get the student data
$course_id = filter_input(INPUT_POST, 'course_id');
$firstname = filter_input(INPUT_POST, 'firstname');
$lastname = filter_input(INPUT_POST, 'lastname');
$email = filter_input(INPUT_POST, 'email');

// Validate inputs
if ($course_id == null || $firstname == null || $lastname == null || $email == null) {
    $error = "Invalid product data. Check all fields and try again.";
    include('error.php');
} else {
    require_once('database.php');

    // Add the student to the database  
    $query = 'INSERT INTO sk_students
                 (courseID, firstName, lastName, email)
              VALUES
                 (:course_id, :firstname, :lastname, :email)';
    $statement = $db->prepare($query);
    $statement->bindValue(':course_id', $course_id);
    $statement->bindValue(':firstname', $firstname);
    $statement->bindValue(':lastname', $lastname);
    $statement->bindValue(':email', $email);
    $statement->execute();
    $statement->closeCursor();

    // Display the student List page
    include('index.php');
}
?>