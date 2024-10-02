let favoriteNumber = 4;
let baseURL = "http://numbersapi.com";

// makes request to API url with favorite number, gets back JSON by including json query key.
$.getJSON(`${baseURL}/${favoriteNumber}?json`).then(data => {
    console.log(data);
});

// Multiple numbers in a single request.
let favNums = [2,4,9];
$.getJSON(`${baseURL}/${favNums}?json`).then(data => {
    console.log(data);
});

// 4 facts on favorite number
Promise.all(
    Array.from({ length: 4 }, () => {
        return $.getJSON(`${baseURL}/${favoriteNumber}?json`);
    })
    ).then(facts => {
        facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
    });