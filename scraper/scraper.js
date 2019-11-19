const cloudscraper = require('cloudscraper');
const cheerio = require('cheerio');

const URL_PREFIX = "https://fmovies.to";

/**
 * Creates URL to scrape through
 * @param {*} name 
 */
function constructURL(name) {
    return URL_PREFIX + '/search?keyword=' + name;
}

/**
 * Scraper for movie data from fmovies.to
 * @param {*} name 
 */
function scrapeMovieData(name) {
    const movie_name = name.toLowerCase().split(" ").join("+");
    const url = constructURL(movie_name);
    
    return cloudscraper(url).then((response) => {
        const x = cheerio(".name", response);
        return x;
    }).catch((err) => {
        return err;
    })
}

/**
 * Takes a movie name and gets the data from fmovies.to
 * @param {*} name 
 */
function getMovieInfo(name) {
    let urls = [];

    return scrapeMovieData(name).then((response) => {
        for (let i = 0; i < response.length; i++) {
            urls.push({
                name: response[i].children[0].data,
                movieURL: URL_PREFIX + response[i].attribs.href
            })
        }

        return urls;
    }).catch((err) => {
        return err;
    })
}

module.exports = getMovieInfo;