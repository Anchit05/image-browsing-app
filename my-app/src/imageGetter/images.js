export function tryFetchingImages(count, start){
	const cliendId = "m-vL0Ob6-ZtpE-bYVBSj251ZvviX0SjDoWQLYg-QPwU";
	const endpoint = "https://api.unsplash.com/photos";

	let queryString     = "?";
	queryString = queryString + "client_id=" + cliendId;
	queryString = queryString + "&count=" + count + "&start=" + start;

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

export function tryFetchingMoreImages(searchText, count, start){
	const cliendId 	= "m-vL0Ob6-ZtpE-bYVBSj251ZvviX0SjDoWQLYg-QPwU";
	let endpoint 		= "";
	if ( searchText ){
		endpoint = "https://api.unsplash.com/search/photos";
	}else{
		endpoint = "https://api.unsplash.com/photos";
	}

	let queryString     = "?";
	queryString = queryString + "client_id=" + cliendId;
	queryString = queryString + "&count=" + count + "&start=" + start;
	if ( searchText ){
		queryString = queryString + "&query=" + searchText;
	}


	return fetch(endpoint + queryString,{
		method: 'get'
	})
    .then( response => response.json() )
    .then( jsonResponse => jsonResponse)
    .catch( ex => {
      console.log( ex );
    });
}