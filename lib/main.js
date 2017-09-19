
var db = new PouchDB('dbname');

/*db.changes().on('change', function() {
  db.get('fe255c6b-e2a4-4824-81d2-9c3dbc867fac').then(function (doc) {
        console.log(doc);
    });
});*/

//addRecord(db,"Casa");

//db.replicate.to('http://example.com/mydb');

function addRecord(dbconn, addr) {
    dbconn.post({
      url: addr,
      create_ts: Date.now()
    }).then(function (response) {
        console.log("Success: " + response.id);
        return response;
    });       
}

function getAllRecords(dbconn) {
    dbconn.allDocs({include_docs: true
    }).then(function (response) {
        for (var i = 0, len = response.rows.length; i < len; i++) {
        document.getElementById('linklist').insertAdjacentHTML('beforeend','<p>'+ response.rows[i].doc.url +'</p>');
        loadPage( response.rows[i].doc.url);
    }
        console.log("Success: " + response.total_rows);
        return response;
    });       
}

function showDocument(text, position) {
    document.getElementById('articles').insertAdjacentHTML('beforeend','<div>'+ text.contents +'</div>');
}

function loadPage(url) {
    //url='https://allorigins.us/get?url=' + encodeURIComponent(url);
    url='https://boilerpipe-web.appspot.com/extract?url=' + url;
    console.log(url);
      if(self.fetch){
        var setHeaders = new Headers();

        var setOptions = {
            method: 'GET',
            headers: setHeaders,
//            mode: 'cors-with-forced-preflight',
        };

        fetch(url,setOptions)
            .then(response => {if (response.ok) {
                response.text().then(text => showDocument(JSON.parse(text),'articles'));
        } else {
            console.log("Stoka"); //TODO Throw exception to redirect to "page not found URL"
            }
        });
    }
}
    