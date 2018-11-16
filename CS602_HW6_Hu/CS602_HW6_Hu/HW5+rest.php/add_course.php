<?php
// Get the course data
$id = filter_input(INPUT_POST, 'id');
$name = filter_input(INPUT_POST, 'name');

// Validate inputs
if ($id == null || $name == null) {
    $error = "Invalid category data. Check all fields and try again.";
    include('error.php');
} else {
    require_once('database.php');

    // Add the course to the database  
    $query = 'INSERT INTO sk_courses
                 (courseID, courseName)
              VALUES
                 (:id, :name)';
    $statement = $db->prepare($query);
    $statement->bindValue(':id', $id);
    $statement->bindValue(':name', $name);
    $statement->execute();
    $statement->closeCursor();

    // Display the course List page
    include('course_list.php');
}
?>