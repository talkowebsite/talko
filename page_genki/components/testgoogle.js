  google.load('search', '1');
  google.setOnLoadCallback(OnLoad);
  var search;
keyword = "desert";
  function OnLoad()
    {
        search = new google.search.ImageSearch();
        search.setSearchCompleteCallback(this, searchComplete, null);
        search.execute(keyword);
    }
    function searchComplete()
    {
        if (search.results && search.results.length > 0)
        {
            var rnd = Math.floor(Math.random() * search.results.length);
            console.log(search.results[rnd]['url']);
        }
    }