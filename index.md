<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://kit.fontawesome.com/773a46527c.js" crossorigin="anonymous"></script>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Shoppies</title>
</head>

<body>
    <div class="container">
        <h4>The Shoppies</h4>
        <div class="card">
            <div class="card-body">
                <p>Movie title</p>
                <div class="input-wrapper">
                    <i class="fas fa-search icon"></i>
                    <input type="text" class="form-control input-form" id="searchQuery">
                </div>
            </div>
        </div>
    </div>
    <section class="container search-nomination">
        <div class="row">
            <div class="col-md-6 hidden" id="searchHidden">
                <div class="card">
                    <div class="card-body">
                        <p class="card-title resultFor"></p>
                        <ul class="searchResult">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-6 hidden" id="nomineeHidden">
                <div class="card">
                    <div class="card-body">
                        <p class="card-title">Nominations</p>
                        <ul class="nomineeList">
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div id="snackbar">You've reached the maximum allowed nominations (5)</div>
    </div>
    <!-- Optional JavaScript; choose one of the two! -->
    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js" integrity="sha384-q2kxQ16AaE6UbzuKqyBE9/u/KzioAlnx2maXQHiDX9d4/zp8Ok3f+M7DPm+Ib6IU" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-pQQkAEnwaBkjpqZ8RU1fF1AKtTcHJwFl3pblpTlHXybJjHpMYo79HY3hIi4NKxyj" crossorigin="anonymous"></script>
    -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script type="text/javascript" src="script.js"></script>
</body>

</html>