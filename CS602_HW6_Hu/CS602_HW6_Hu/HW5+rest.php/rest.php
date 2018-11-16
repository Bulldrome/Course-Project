<?php
require_once('database.php');
include('common.inc.php');

// Get course ID
if (!isset($course_id)) {
    $course_id = filter_input(INPUT_GET, 'course_id');
    if ($course_id == NULL) {
        $course_id = "cs601";
    }
}
if (!isset($action)) {
    $action = filter_input(INPUT_GET, 'action');
    if ($action == NULL) {
        $action = "students";
    }
}


// Get name for selected course
$queryCourse = 'SELECT * FROM sk_courses
                  WHERE courseID = :course_id';
$statement1 = $db->prepare($queryCourse);
$statement1->bindValue(':course_id', $course_id);
$statement1->execute();
$course = $statement1->fetch();
$course_name = $course['courseName'];
$statement1->closeCursor();


// Get all courses
$query = 'SELECT * FROM sk_courses
                       ORDER BY courseID';
$statement = $db->prepare($query);
$statement->execute();
$sk_courses = $statement->fetchAll();
$statement->closeCursor();

// Get products for selected course
$queryStudents = 'SELECT * FROM sk_students
                  WHERE courseID = :course_id
                  ORDER BY studentID';
$statement3 = $db->prepare($queryStudents);
$statement3->bindValue(':course_id', $course_id);
$statement3->execute();
$sk_students = $statement3->fetchAll();
$statement3->closeCursor();
?>
<!DOCTYPE html>
<html>

<!-- the head section -->
<head>
    <title>Course Manager</title>
    <link rel="stylesheet" type="text/css" href="main.css" />
</head> 

<!-- the body section -->
<body>
<header><h1>Course Manager</h1></header>
<main>
        <p><a href="index.php">Index</a></p>
    <h1><center>Student List</center></h1>

    <aside>
        <!-- display a list of courses -->
        <h2>Studetns</h2>
        <nav>
        <ul>
            <?php foreach ($sk_courses as $course) : ?>
            <li><a href="?format=json&action=<?php echo "students" ?>&course_id=<?php echo $course['courseID']; ?>">
                    <?php echo $course['courseID']; ?>
                </a>
            </li>
            <?php endforeach; ?>
        </ul>
        <h2>Courses</h2>
        <ul>
            <li><a href="?format=json&action=<?php echo"courses"?>">
                Courses List
                </a>
            </li>
        </ul>
        </nav>          
    </aside>

    <section>
        <?php
            if($action == 'students'){
                echo "<h2>$course_name</h2>";
                foreach ($sk_students as $student) :
                    $j_student = array('Student ID'=> $student['studentID'],
                    'First Name'=> $student['firstName'],
                    'Last Name' => $student['lastName'],
                    'Email' => $student['email']);
                    pr_dump($j_student);
                endforeach;
            }elseif($action == 'courses'){
                foreach($sk_courses as $course):
                    $j_course = array('Course ID' => $course['courseID'],
                                      'Course Name' => $course['courseName']);
                    pr_dump($j_course);
                endforeach;
            }
            ?>       
    </section>
</main>
<footer>
    <p>&copy; <?php echo date("Y"); ?> Qi Hu.</p>
</footer>
</body>
</html>