
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
    dbconn.allDocs({
    }).then(function (response) {
        console.log("Success: " + response.rows.length);
        for (var i = 0, len = response.rows.length; i < len; i++) {
        document.getElementById('linklist').insertAdjacentHTML('beforeend','<div>'+ response.rows[i].id +'</div>');
    }
        console.log("Success: " + response.total_rows);
        return response;
    });       
}

function showDocument(rowDetails) {
    document.getElementById('linklist').innerHTML = '<div>'+ ss+'</div>';
}
    