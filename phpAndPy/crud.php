<?php

class User
{
    public $name;
    public $age;
    public function __construct($name, $age)
    {
        $this->name = $name;
        $this->age = $age;
    }

    public function create()
    {

        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "users";

        $conn = new mysqli($servername, $username, $password, $dbname);

        $sql = "INSERT INTO user VALUES ({$this->name}, {$this->age}, {$this->createdAt})";

        if (mysqli_query($conn, $sql)) {
            echo "Sucessfully registered new user";
        } else {
            echo "Error: " . $sql . "<br>" . mysqli_error($conn);
        }

        $conn->close();
    }

    public function update($id)
    {
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "users";

        $conn = new mysqli($servername, $username, $password, $dbname);

        $sql = "UPDATE user SET name={$this->name}, age={$this->age} WHERE id=$id";

        if (mysqli_query($conn, $sql)) {
            echo "Successfully update a user";
        } else {
            echo "Error updating record: " . mysqli_error($conn);
        }

        $conn->close();
    }
}

function getAll()
{

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "users";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT id,name,createdAt FROM user";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "User list";

        while ($row = $result->fetch_assoc()) {
            $row["id"] . " " . $row["name"] . " " . $row["age"] . "<br>";
        }
    }

    $conn->close();
}

function getOne($id)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "users";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "SELECT id,name,age,createdAt FROM user WHERE id=$id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "User date";

        while ($row = $result->fetch_assoc()) {
            $row["id"] . " " . $row["name"] . " " . $row["age"];
        }
    }

    $conn->close();
}

function delete($id)
{
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "users";

    $conn = new mysqli($servername, $username, $password, $dbname);

    $sql = "DELETE FROM user WHERE id=$id";

    if ($conn->query($sql) === TRUE) {
        echo "Successfully deleted the data";
    } else {
        echo "Error deleting record: " . $conn->error;
    }

    $conn->close();
}

function disconn()
{
    echo "Thank you and see you again";
}

if ("input" === "a" || "input" === "A") {
    $user1 = new User("Chelsea Islan", 21);
    $user2 = new User("Tatjana Saphira", 23);
    $user1->create();
    $user2->create();
}

if ("input" === "b" || "input" === "B") {
    getAll();
}

if ("input" === "c" || "input" === "C") {
    getOne($id);
}

if ("input" === "d" || "input" === "D") {
    $user = new User("Chelsea Islan", 21);
    $user->update($id);
}

if ("input" === "e" || "input" === "E") {
    delete($id);
}

if ("input" === "q" || "input" === "Q") {
    disconn();
}

?>
