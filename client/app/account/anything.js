function s3_upload(){
    console.log("Hey, whatever");
    var status_elem = document.getElementById("status");
    var url_elem = document.getElementById("avatar_url");
    // var preview_elem = document.getElementById("preview");
    var s3upload = new S3Upload({
        file_dom_selector: 'files',
        s3_sign_put_url: '/api/tracks/getUploadURL',
        onProgress: function(percent, message) {
            status_elem.innerHTML = 'Upload progress: ' + percent + '% ' + message;
        },
        onFinishS3Put: function(public_url) {
            status_elem.innerHTML = 'Upload completed. Uploaded to: '+ public_url;
            url_elem.value = public_url;
            // preview_elem.innerHTML = '<img src="'+public_url+'" style="width:300px;" />';
        },
        onError: function(status) {
            status_elem.innerHTML = 'Upload error: ' + status;
        }
    });
}
/*
    <input type="file" id="files"/>
    <p id="status">Please select a file</p>

    <a href="https://s3-us-west-1.amazonaws.com/sharesound/prelude_in_c.wma">
    <input type="submit" value="Download"/></a>

    <script>
      (function() {
          var input_element = document.getElementById("files");
          input_element.onchange = s3_upload;
      })();
    </script>
    */