function loadJSON(filename, callback) {
    getFileObject(filename, function (fileObject) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var res = JSON.parse(reader.result);
            callback(res);
        }
        reader.readAsText(fileObject);
    }); 
}

function getFileBlob (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function() {
        cb(xhr.response);
    });
    xhr.send();
}

function blobToFile(blob, name) {
    blob.lastModifiedDate = new Date();
    blob.name = name;
    return blob;
}

function getFileObject(filePathOrUrl, cb) {
	getFileBlob(filePathOrUrl, function (blob) {
  		cb(self.blobToFile(blob, 'test.jpg'));
   });
}