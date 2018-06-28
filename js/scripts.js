// // typewriter effect
// var i = 0;
// var txt = 'Enter a keyword for sentiment analysis';
// // var txt = '↳100 top and breaking news headlines in US';
// var speed = 70;
// function typeWriter() {
//   if (i < txt.length) {
//     document.getElementById("main-start").innerHTML += txt.charAt(i);
//     i++;
//     setTimeout(typeWriter, speed);
//   }
// }
// typeWriter();

function analysisOn(){
  var x = document.getElementById("text-length");
  var m = document.getElementById("main-box");
  var y = document.getElementsByTagName("img");
  var t= document.getElementById("headline-box-inner");

  if (x.style.display === "none") {
      x.style.display = "block";
      m.style.display = "block";
      for(var i=0;i<y.length;i++){
          var element=y[i];
          element.style.width='0%';
          // element.style.position='fixed';
          // element.style.zIndex='9999';
      }


  } else {
      x.style.display = "none";
      // for(var i=0;i<y.length;i++){
      //     var element=y[i];
      //     element.style.width='100%';
      // }

  }

}

var typeValue="";
var typeValueog="";
var hdurl;
//type ouy value
// function annotate(){
//
// }


//enter submit
function search(ele) {
  var typed= document.getElementById("search").value;
      document.getElementById("main-start").style.display = "none";
  document.getElementById("input-value").innerHTML= "<span>"+typed+"</span>";
    document.getElementById("input-value").style.display = "block";
    document.getElementById("loading-page").style.display = "block";
    document.getElementById("main-box").style.display = "none";
    document.getElementById("sa-menu").style.display  = "none";
    document.getElementById("about-menu").style.display  ="none";



  // if(typed==""){
  //   document.getElementById("main-box").style.display = "none";
  // }
  // else{
  //   document.getElementById("input-value").style.display = "block";
  //   document.getElementById("input-value").innerHTML= typed;
  // }
  if(event.key === 'Enter') {

      document.getElementById("main-box").style.display = "block";
      document.getElementById("sa-menu").style.display  = "block";
      document.getElementById("sa-menu").style.display  = "block";
      document.getElementById("about-menu").style.display  ="block";
      typeValue=ele.value;
      typeValueog=ele.value;
      typeValue=typeValue.toLowerCase();
      hdurl = 'https://newsapi.org/v2/everything'
              +'?q='
              +typeValue
              +'&from=2018-01-01'
              +'&sortBy=publishedAt'
              +'&language=en'
              +'&domains=wsj.com,nytimes.com,cnn.com,foxnews.com,politico.com,bloomberg.com,huffingtonpost.com'
              + '&pageSize=100'
              +'&apiKey=2604b12061df4e07864b2eab5ea9464d'

                var afinn=[];
                var afinnCap=[];

                //AFINN jsonfile
                $.getJSON( "afinn.json", function( data ) {
                  $.each( data, function( key, val ) {
                    afinn[key]=val;
                  });
                });


                var hdreq = new Request(hdurl);
                var hdTxt="";
                var overlayTxt="";
                var overlayPositiveWord="";
                var overlayNegativeWord="";
                var hdLength=0;
                var hdpositiveLength=0;
                var hdnegativeLength=0;
                var hdImg="";


                fetch(hdreq)
                .then((hdresponse)=> hdresponse.json())
                .then(function(hddata) {

                    var hdarticle=hddata.articles;
                      for(x in hdarticle){
                        hdLength++;
                        if(hdarticle[x].urlToImage ===null){
                          overlayTxt += "<div class='overlay-inner-box' id='overlay-box-inner'><div class='overlay-content'><a href="+hdarticle[x].url+" target='_blank'>"+hdarticle[x].title+"</a><img class='overlay-img' src="+hdarticle[x].urlToImage+"></img></div></div>";
                          hdTxt += "<div class='headline-inner-box' id='headline-box-inner'><div class='headline-content'><div class='source'>"+hdarticle[x].source.name+"</div></br><div class='inside'><span class='title'><p>"+hdarticle[x].title+"</p></span></div><a href="+hdarticle[x].url+" target='_blank'><div class='desc-wrap'><span class='article-desc'>"+hdarticle[x].description+"</span></div></a><div class='bg-img' style='background-image:url('placeholder.jpg')'></div></div></div>";
                        }else{
                          overlayTxt += "<div class='overlay-inner-box' id='overlay-box-inner'><div class='overlay-content'><a href="+hdarticle[x].url+" target='_blank'>"+hdarticle[x].title+"</a><img class='overlay-img' src="+hdarticle[x].urlToImage+"></img></div></div>";
                          // hdTxt += "<div class='headline-inner-box' id='headline-box-inner'><div class='headline-content' style='background-image:url("+hdarticle[x].urlToImage+")' ><div class='source'>"+hdarticle[x].source.name+"</div></br><div class='inside'><span class='title'><p>"+hdarticle[x].title+"</p></span></div><a href="+hdarticle[x].url+" target='_blank'><div class='desc-wrap'><span class='article-desc'>"+hdarticle[x].description+"</span></div></a></div></div>";
                          // hdTxt += "<div class='headline-inner-box' id='headline-box-inner'><img class='inside' style='padding:0px 0px' src="+hdarticle[x].urlToImage+"></img><div class='headline-content'><div class='source'>"+hdarticle[x].source.name+"</div></br><div class='inside'><span class='title'><p>"+hdarticle[x].title+"</p></span></div><a href="+hdarticle[x].url+" target='_blank'><div class='desc-wrap'><span class='article-desc'>"+hdarticle[x].description+"</span></div></a></div></div>";

                      hdTxt += "<div class='headline-inner-box' id='headline-box-inner'><div class='headline-content'><div class='source'>"+hdarticle[x].source.name+"</div></br><div class='inside'><span class='title'><p>"+hdarticle[x].title+"</p></span></div><a href="+hdarticle[x].url+" target='_blank'><div class='desc-wrap'><span class='article-desc'>"+hdarticle[x].description+"</span></div></a><div class='bg-img' style='background-image:url("+hdarticle[x].urlToImage+")'></div></div></div>";

                        }
                      }//for loop
                    overlayTxt =  overlayTxt.split(" ");
                    hdTxt = hdTxt.split(" ");
                    //check Afinn word
                    var positiveScore=0;
                    var negativeScore=0;
                    for(var i=0;i<hdTxt.length; i++){
                      if(afinn.hasOwnProperty(hdTxt[i])){
                        var theWord=hdTxt[i];
                        var score=afinn[theWord];
                        if(score>0){
                          positiveScore=positiveScore+score;
                          hdTxt[i]="<span class='positive'>"+hdTxt[i]+"</span>";
                          hdpositiveLength++;
                        }else if(score<0){
                          negativeScore=negativeScore+score;
                          hdTxt[i]="<span class='negative'>"+hdTxt[i]+"</span>";
                          hdnegativeLength++;
                        }
                      }

                    }
                    for(var i=0;i<overlayTxt.length; i++){
                      if(afinn.hasOwnProperty(overlayTxt[i])){
                        var theWord=overlayTxt[i];
                        var score=afinn[theWord];
                        if(score>0){
                          overlayTxt[i]="<span class='positive'>"+overlayTxt[i]+"</span>";
                          overlayPositiveWord+= "<h1>"+overlayTxt[i]+"</h1>";
                        }else if(score<0){
                          overlayTxt[i]="<span class='negative'>"+overlayTxt[i]+"</span>";
                          overlayNegativeWord+="<h1>"+overlayTxt[i]+"</h1>";
                        }
                      }

                    }



                    hdTxt=hdTxt.join(" ");
                      overlayTxt=overlayTxt.join(" ");
                    document.getElementById("overlay-cont").innerHTML = overlayTxt;
                    document.getElementById("headline-content").innerHTML = hdTxt;


                    var txt = "<h1>"+hdLength+' top news headlines found under """'+ typeValueog+'""</h1><br/>'+
                    "<h1>"+ hdpositiveLength+" <span class='positive'>positive</span> / "+ hdnegativeLength+" <span class='negative'>negative</span></h1>";

                    document.getElementById("overlay-analysis").innerHTML = txt;


                    //analysis texts
                    var txtv =
                    "<div class='wrapper'><div class='hdnegtative-inner'><div class='rotate'>"+overlayNegativeWord+"</div></div>"+
                    "<div class='hdpositive-inner'><div class='rotate'>"+overlayPositiveWord+"</div></div></div>";
                    document.getElementById("text-length").innerHTML = txtv;

                      document.getElementById("footer").style.display ="block";
                      document.getElementById("footer").style.position ="fixed";


                  })//hdResponse Fetch
                  // .then(hdresponse => alert('hi'))
                  .then(function(hdresponse){
                    document.getElementById("loading-page").style.display = "none";
                    document.getElementById("headline-content").style.display = "block";
                  })

    }


}
