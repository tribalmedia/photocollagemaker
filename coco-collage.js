    $(":file").css("opacity", 0);
    function collage(element){
        element.load("index.html");
    }
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                input.nextElementSibling.setAttribute("src", e.target.result);
                input.nextElementSibling.onload = function() {
                    var frameHeight = $(this).parents('.x').css('height').replace("px", "");
                    var frameWidth = $(this).parents('.x').css('width').replace("px", "");
                    var frameRela = frameHeight/frameWidth;
                    var imageRela = this.height/this.width;
                    // access image size here
                    if (imageRela < frameRela){
                        $(this).css('height', '100%');
                    } else {
                        $(this).css('width', '100%');
                    }
                }
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $('.x').click(function(event) {
        if (!$(event.target).is('.collage')) {
            $(this).find(".collage").trigger('click');
        }
    });

    $(".x img").on("contextmenu",function(e){
        return false;
    });
    
    $(":file").change(function() {
        readURL(this);
        $(this).parent().css('background-color', 'transparent');
        $(this).next().css('display', 'block');
    });


    $(".btn-Preview-Image").on('click', function () {
        var element = $(this).prev();
        $("#pic").remove();
        $("#downloadBtn").remove();
        html2canvas(element, {
            onrendered: function (canvas) {
                var image = new Image();
                image.id = "pic";
                image.src = canvas.toDataURL();
                $('body').append(image);
                $('body').append("<a href='" + image.src +"' download='image.png' id='downloadBtn'> DownLoad Image </a>")
                canvas.remove();
            }
        });
        
    });