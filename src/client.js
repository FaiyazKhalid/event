/**
 * Created by vsokoltsov on 18.08.15.
 */
function addToList(image){
    console.log(image);
    if(image.images.standard_resolution.url != null) {
        new EJS({url: '/photo.ejs'}).render(image);
        //$('.images-list').prepend("<div><img src='" + image.images.standard_resolution.url + "'/></div>");
    }
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
    }
};
window.realtime.connect();
