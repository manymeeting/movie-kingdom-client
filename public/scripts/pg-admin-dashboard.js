$(function(){

    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawChart);


    function renderTopTenReviewedMovie()
    {
        // fetch data
        var URL = '/log/report/top-10-reviewed-movie';

        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
        });
        var getReq = new Request(URL, {
            method: 'GET', 
            headers: headers
        });

        return fetch(getReq)
            .then(response => response.json())
            .then(function(results) {
                console.log(results);
                
                let arrayData = [['Reviews', 'Number']];
                for(let i = 0; i < results.length; i++)
                {
                    let dataEntry = results[i];
                    arrayData.push([dataEntry.movie.movieTitle, dataEntry.reivewNum]);
                }

                drawTopTenReviewedMovie(arrayData);
            })
            .catch(function(error) {
                console.log('Fetch Error: ', error);
            });
    }

    function drawTopTenReviewedMovie(arrayData)
    {
        var dataReviewsOnMovie = google.visualization.arrayToDataTable(arrayData);

        var options = {
            width : 700,
            height: 400,
            title: 'Reviews on movies'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart6_div'));

        chart.draw(dataReviewsOnMovie, options);
    }



    function renderTopTenCityRevenues()
    {
        // fetch data
        var URL = '/log/report/top-10-city-revenues';

        var headers = new Headers({
            "Content-Type": "application/json",
            "Accept": "application/json",
        });
        var getReq = new Request(URL, {
            method: 'GET', 
            headers: headers
        });

        return fetch(getReq)
            .then(response => response.json())
            .then(function(results) {
                console.log(results);
                
                let arrayData = [['Cities', 'Revenue']];
                for(let i = 0; i < results.length; i++)
                {
                    let dataEntry = results[i];
                    arrayData.push([dataEntry.city.cityName, dataEntry.revenue]);
                }

                drawTopTenCityRevenues(arrayData);
            })
            .catch(function(error) {
                console.log('Fetch Error: ', error);
            });
    }

    function drawTopTenCityRevenues(arrayData)
    {
        var dataTopTenCities = google.visualization.arrayToDataTable(arrayData);

        var materialOptions = {
            width : 800,
            height: 400,
            chart: {
                title: 'Top 10 Revenue Cities'
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
    }

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

        return fetch(getReq)
            .then(response => response.json())
            .then(function(results) {
                console.log(results);
                
                let arrayData = [['Theater', 'Revenue']];
                for(let i = 0; i < results.length; i++)
                {
                    let dataEntry = results[i];
                    arrayData.push([dataEntry.theater.theaterName, dataEntry.revenue]);
                }

                drawTopTenHallRevenues(arrayData);
            })
            .catch(function(error) {
                console.log('Fetch Error: ', error);
            });
    }

    function drawTopTenHallRevenues(arrayData)
    {
        var topTenHalls = google.visualization.arrayToDataTable(arrayData);

        var materialOptions = {
            width : 800,
            height: 400,
            chart: {
                title: 'Top 10 Revenue Halls'
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
        materialChart.draw(topTenHalls, materialOptions);

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

        return fetch(getReq)
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

        var materialOptions = {
            width : 800,
            height: 400,
            chart: {
                title: 'Top 10 Revenue Movies'
            },

            hAxis: {
                title: 'Total Revenue',
                minValue: 0,
            },
            vAxis: {
                title: 'Movies'
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

        // TODO: fetch data via kafka sequentially for now
        renderTopTenMovieRevenues()
            .then(()=>{
                renderTopTenHallRevenues();
            })
            .then(()=>{
                renderTopTenCityRevenues();
            })
            .then(()=>{
                renderTopTenReviewedMovie();
            })

        

        

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

    }
})