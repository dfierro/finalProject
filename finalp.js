$('document').ready(function(){
  console.log("It's alive!");
  var count = 0;

  function getNews(pageIndex){
    $.getJSON('https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=4119045cfcd1481bb935c6f0c021b4ea&q=architecture&sort=newest&page=' + pageIndex)
      .done(function(data){

        console.log(data.response.docs);
        var output = "";
        for (var i = 0; i < data.response.docs.length; i++) {
          var target = data.response.docs[i]
          if(target.document_type === 'article' && target.headline.print_headline && target.multimedia){
            output += "<div class='card'><div class='card-image'><img src='https://www.nytimes.com/" + target.multimedia[0].url + "'><span class='card-title'>" + target.headline.print_headline + "<a href='" + target.web_url + "'target='_blank'>" + target.headline.print_headline + "</a></spaan></div></div>";
          }
        }

        $('#results').append(output);
      })
      .fail(function(err){
        console.log(err);
      })
  }

  getNews(count);

  function getMoreArticles(){
    console.log(count);
    count++;
    console.log(count);
    getNews(count);
  }

  $('#moreButton').click(function(){
    getMoreArticles();
  })


})


//
// "  <div class="row">
//     <div class="col s12 m7">
//       <div class="card">
//         <div class="card-image">
//           <img src="https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/EEU7BM4VYS.jpg" />
//           <span class="card-title">News</span>
//         </div>
//         <div class="card-content">
//           <p></p>
//         </div>
//         <div class="card-action">
//           <a href="#">This is a link</a>
//         </div>
//       </div>
//     </div>
//   </div>"
