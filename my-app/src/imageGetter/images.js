export function tryFetchingImages(data){
	const cliendId = "m-vL0Ob6-ZtpE-bYVBSj251ZvviX0SjDoWQLYg-QPwU";
	const endpoint = "https://api.unsplash.com/photos";
	console.log("fetching images");

	let queryString     = "?";
	queryString = queryString + "client_id=" + cliendId;

	return fetch(endpoint + queryString,{
		method: 'get'
	})
    .then( response => response.json() )
    .then( jsonResponse => jsonResponse)
    .catch( ex => {
      console.log( ex );
    });
}

export function tryFetchingSearchImages(searchText){
	const cliendId = "m-vL0Ob6-ZtpE-bYVBSj251ZvviX0SjDoWQLYg-QPwU";
	const endpoint = "https://api.unsplash.com/search/photos";
	console.log("fetching search images");

	let queryString     = "?";
	queryString = queryString + "client_id=" + cliendId;
	queryString = queryString + "&query=" + searchText;


	return fetch(endpoint + queryString,{
		method: 'get'
	})
    .then( response => response.json() )
    .then( jsonResponse => jsonResponse)
    .catch( ex => {
      console.log( ex );
    });
}