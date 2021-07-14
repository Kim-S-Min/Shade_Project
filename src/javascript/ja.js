	//alert("hi");
	
	var justwatch = new JustWatch();

	var searchContent = await justwatch.getTitle("show","33582");
    print_result("searchContent", searchContent);
	var searchContent = await justwatch.getSeason("50299");
    print_result("searchContent", searchContent);
	var searchResult = await justwatch.search({query: '',page:1,page_size:100,content_types:['show']});
		print_result("searchContent", searchResult);
	 
		for(let i = 1900;i<=2021;i++){
		var searchResult = await justwatch.search({query: '',page:1,page_size:100,content_types:['show'],release_year_from:i,release_year_until:i});
		print_result("searchContent", searchResult);
		let total_pages = searchResult.total_pages
		for(let j = 1; j<=total_pages;j++){
			searchResult = await justwatch.search({query: '',page:j,page_size:100,content_types:['show'],release_year_from:i,release_year_until:i});
			if(searchResult.items.length!=0){
				for(let k=0;k<searchResult.items.length;k++){
					var n = searchResult.items[k];
					finalResult = finalResult.concat(n.id);
				}
			}
		}
	}

	
	/*
	for(let i=0;i<=20;i++){
		var searchResult = await justwatch.search({query: '',page:i,page_size:100,content_types:['movie'],release_year_from:1900,release_year_until:1978});
		print_result("searchContent", searchResult);
		for(let j = 0 ; j<searchResult.items.length;j++){
			var n = searchResult.items[j];
			var searchContent = await justwatch.getTitle(n.object_type,n.id);
			let a = {id : searchContent.id,title : searchContent.title,poster : searchContent.poster,object_type : searchContent.object_type,
				short_description : searchContent.short_description,runtime : searchContent.runtime,localized_release_date : searchContent.localized_release_date,
				clips:searchContent.clips,credits:searchContent.credits,offers:searchContent.offers,genre_ids:searchContent.genre_dis}; 
			
			finalResult = finalResult.concat(a);
		}
		

	}
	*/
	console.log(finalResult);
	//console.log(finalResult);
	//document.getElementById("btn1").disabled = true;
	
	//var episodes = await justwatch.getEpisodes(searchResult.items[0].id);
	//print_result("episodes", episodes);
    
    //var searchContent = await justwatch.getTitle("movie","822043");
    //print_result("searchContent", searchContent);

	//var searchPerson = await justwatch.getPerson("44201");
	//print_result("searchContent", searchPerson);

	//console.log(searchResult.items);

	//alert(searchResult);
	//axios.post(api_url,searchResult);
