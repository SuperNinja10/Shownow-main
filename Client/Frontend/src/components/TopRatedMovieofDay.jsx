import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Button } from '@material-ui/core';

const API_KEY = 'c92ecd56753067461e71f400f32022cf'; // Your TMDb API key

export default function TopRatedMovieOfDay() {
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetchTopRatedMovies();
    }, []);

    const fetchTopRatedMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
            const topRatedMovies = response.data.results;

            // Determine the "movie of the day" based on the current date
            const today = new Date();
            const movieIndex = today.getDate() % topRatedMovies.length; // Modulo to cycle through the list

            setMovie(topRatedMovies[movieIndex]);
        } catch (error) {
            console.error('Error fetching top-rated movies:', error);
        }
    };

    if (!movie) return <p>Loading...</p>;

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={movie.title}
                    height="500"
                    image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    title={movie.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {movie.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {movie.overview}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <Button size="small" color="primary" href={`https://www.themoviedb.org/movie/${movie.id}`}>
                Learn More
            </Button>
        </Card>
    );
}
