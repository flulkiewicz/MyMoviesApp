﻿namespace MyMoviesAPI.Dtos.MovieDtos
{
    public class UpdateMovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Director { get; set; } = string.Empty;
        public int Year { get; set; }
        public int Rate { get; set; }

    }
}
