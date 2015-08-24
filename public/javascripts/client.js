/**
 * Created by vsokoltsov on 18.08.15.
 */
function addToList(image){
    if(image.images.standard_resolution.url != null) {
        //new EJS({url: '/photo.ejs'}).render(image);
        $('.images-list').prepend("<div class='instagram-img'>Instagram" +
            "<img src='" + image.images.standard_resolution.url + "'/>" +
            "<div class='tags'>"+image.tags.join(', ')+"</div>"+
            "</div>");
    }
}

function addTwitterImageToList(imageObject){
    var twitterImg = $("<div class='twitter-img'>Twitter</div>");
    if(imageObject.source.entities.media){
        twitterImg.append("<img src='"+ imageObject.source.entities.media[0].media_url +"'/>");
    }
    twitterImg.append("<div class='text'>"+imageObject.source.text+"</div>")
    console.log(imageObject);
    $(".images-list").prepend(twitterImg);
}
window.realtime = {
    connect: function(){
        window.socket = io.connect("http://127.0.0.1:3000");
        window.socket.on("img", function(message){
            var parsedObj = JSON.parse(message);
            if (parsedObj != null) {
                for (var i = 0; i < parsedObj.data.length; i++) {
                    addToList(parsedObj.data[i]);
                }
            }
        });
        window.socket.on("err", function(message){
            console.log(message);
        });
        window.socket.on('tweet-img', function(message){
           addTwitterImageToList(message);
        });

        window.socket.on('tweet-img-error', function(message){
            addTwitterImageToList(message);
        });
    }
};
window.realtime.connect();
