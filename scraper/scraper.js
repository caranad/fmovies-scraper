const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');

class MovieScraper {
    constructor() {
        this.url = "https://fmovies.to";
    }

    constructURL(movie) {
        return this.url + "/search?keyword=" + movie;
    }

    scrapeMovieData(name) {
        const movie_name = name.toLowerCase().split(" ").join("+");
        const url = this.constructURL(movie_name);
        
        return cloudscraper(url).then((response) => {
            var x = cheerio(".name", response);
            return x;
        }).catch((err) => {
            return err;
        })
    }

    getMovieInfo(name) {
        let urls = [];

        return this.scrapeMovieData(name).then((response) => {
            for (let i = 0; i < response.length; i++) {
                urls.push({
                    name: response[i].children[0].data,
                    movieURL: this.url + response[i].attribs.href
                })
            }

            return urls;
        }).catch((err) => {
            return err;
        })
    }
}

module.exports = MovieScraper;