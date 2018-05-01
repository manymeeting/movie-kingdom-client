$(function(){

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawChart);


    function renderTopTenHallRevenues()
    {
        // fetch data
        var URL = '/log/report/top-10-hall-revenues';

        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
        });
        var getReq = new Request(URL, {
            method: 'GET', 
            headers: headers
        });

        fetch(getReq)
            .then(response => response.json())
            .then(function(results) {
                console.log(results);
                
                let arrayData = [['Theater', 'Revenue']];
                for(let i = 0; i < results.length; i++)
                {
                    let dataEntry = results[i];
                    arrayData.push([dataEntry.movie.movieTitle, dataEntry.revenue]);
                }

                drawTopTenMovieRevnues(arrayData);
            })
            .catch(function(error) {
                console.log('Fetch Error: ', error);
            });
    }

    function drawTopTenHallRevenues(arrayData)
    {
        var dataTopTenHalls = google.visualization.arrayToDataTable(arrayData);
        // var dataTopTenHalls = google.visualization.arrayToDataTable([
        //     ['Theater', 'Revenue2017', 'Revenue2016'],
        //     ['AMC Loews', 13.2, 8.4],
        //     ['AMC Sunset 5', 11.7, 8.1],
        //     ['AMC Kabuki', 10.6, 6.7],
        //     ['Regal Union Square Stadium', 10.2, 6.5],
        //     ['AMC Mazza Gallerie', 9.5, 5.9],
        //     ['Regal E-Walk Stadium', 9.3, 5.2],
        //     ['AMC Empire', 8.4, 4.8],
        //     ['Cinemark North Hollywood ', 7.8, 4.2],
        //     ['Regal Fenway Stadium', 7.2, 4.1]
        // ]);

        var materialOptions = {
            width : 800,
            height: 400,
            chart: {
                title: 'Top 10 Halls'
            },
            hAxis: {
                title: 'Total Revenue',
                minValue: 0,
            },
            vAxis: {
                title: 'Halls'
            },
            bars: 'horizontal'
        };
        var materialChart = new google.charts.Bar(document.getElementById('chart2_div'));
        materialChart.draw(dataTopTenHalls, materialOptions);

    }

    function renderTopTenMovieRevenues()
    {
        // fetch data
        var URL = '/log/report/top-10-movie-revenues';

        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
        });
        var getReq = new Request(URL, {
            method: 'GET', 
            headers: headers
        });

        fetch(getReq)
            .then(response => response.json())
            .then(function(results) {
                console.log(results);
                
                let arrayData = [['Move', 'Revenue']];
                for(let i = 0; i < results.length; i++)
                {
                    let dataEntry = results[i];
                    arrayData.push([dataEntry.movie.movieTitle, dataEntry.revenue]);
                }

                drawTopTenMovieRevnues(arrayData);
            })
            .catch(function(error) {
                console.log('Fetch Error: ', error);
            });
    }

    function drawTopTenMovieRevnues(arrayData)
    {
        var topTenMovies = google.visualization.arrayToDataTable(arrayData);

        // var topTenMovies = google.visualization.arrayToDataTable([
        //     ['Move', 'Revenue'],
        //     ["Avatar", 2787],
        //     ["Titanic", 2187],
        //     ["Star Wars",2068],
        //     ["Jurassic World", 1671],
        //     ["The Avengers", 1518],
        //     ["Furious 7", 1516],
        //     ["Avengers", 1405],
        //     ["Harry Potter Deathly Hallows", 1341],
        //     ["Star Wars", 1332]
        // ]);

        var materialOptions = {
            width : 800,
            height: 400,
            chart: {
                title: 'Top 10 Revenue Movies'
            },

            hAxis: {
                title: 'Total Population',
                minValue: 0,
            },
            vAxis: {
                title: 'City'
            },
            bars: 'horizontal'
        };
        var materialChart = new google.charts.Bar(document.getElementById('chart1_div'));
        materialChart.draw(topTenMovies, materialOptions);
    }

    function renderSumClickByPath()
    {
        // fetch data
        var URL = '/log/report/sum-click-by-path';

        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
        });
        var getReq = new Request(URL, {
            method: 'GET', 
            headers: headers
        });

        fetch(getReq)
            .then(response => response.json())
            .then(function(results) {
                console.log(results);
                
                let arrayData = [['Page', 'Clicks']];
                for(let i = 0; i < results.length; i++)
                {
                    let dataEntry = results[i];
                    arrayData.push([dataEntry._id, dataEntry.count]);
                }

                drawSumClickByPath(arrayData);
            })
            .catch(function(error) {
                console.log('Fetch Error: ', error);
            });
    }

    

    function drawSumClickByPath(arrayData)
    {
        
        // var dataClicksPerPage = google.visualization.arrayToDataTable([
        //     ['Page', 'Clicks'],
        //     ['User Profile', 3200],
        //     ['Movie List', 12000],
        //     ['Movie Hall List', 2532],
        //     ['Movie Details', 2625],
        //     ['Buy tickets', 1525],
        //     ['Purchase List', 2153]
        // ]);

        var dataClicksPerPage = google.visualization.arrayToDataTable(arrayData);

        var options = {
            width : 700,
            height: 400,
            title: 'Clicks Per Page'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart4_div'));
        chart.draw(dataClicksPerPage, options);
    }
    

    


    function drawChart() {

        renderSumClickByPath();

        renderTopTenMovieRevenues();

        renderTopTenHallRevenues();

        var dataTopTenCities = google.visualization.arrayToDataTable([
            ['Theater', 'Revenue2017'],
            ['New York', 354],
            ['Los Angeles', 331],
            ['San Francisco', 306],
            ['Chicago', 311],
            ['Philadelphia', 278],
            ['San Diego', 277],
            ['Washington, DC', 268],
            ['Boston', 258],
            ['Houston', 244]


        ]);

        var materialOptions = {
            width : 800,
            height: 400,
            chart: {
                title: 'Top 10 Cities'
            },
            hAxis: {
                title: 'Total Revenue',
                minValue: 0,
            },
            vAxis: {
                title: 'Cities'
            },
            bars: 'horizontal'
        };
        var materialChart = new google.charts.Bar(document.getElementById('chart3_div'));
        materialChart.draw(dataTopTenCities, materialOptions);




        





        var dataClicksByGenres = google.visualization.arrayToDataTable([
            ['Genres', 'Clicks'],
            ['Action', 32000],
            ['Drama', 12001],
            ['Comedy', 15436],
            ['Kids', 5623],
            ['Honor', 7800],
            ['Romance', 35000]
        ]);

        var options = {
            width : 700,
            height: 400,
            title: 'Clicks by Genres'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart5_div'));

        chart.draw(dataClicksByGenres, options);




        var dataReviewsOnMovie = google.visualization.arrayToDataTable([
            ['Genres', 'Clicks'],
            ['Star Wars: Episode VII - The Force Awakens (2015)', 32000],
            ['Avatar (2009)', 7654],
            ['Titanic (1997)', 6325],
            ['Black Panther (2018)', 5623],
            ['Jurassic World (2015)', 3500],
            ['Others', 35000]
        ]);

        var options = {
            width : 700,
            height: 400,
            title: 'Reviews on movies'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart6_div'));

        chart.draw(dataReviewsOnMovie, options);
    }
})