////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Get Limits from Nova
//
//  Will retrieve limits from Nova.  
//
//  @param apiToken apiToken retrieved from Keyston
//
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var https = require('https')

function main(params) {

     
    var apiToken = params.apiToken
    var host = params.host
    var port = params.port
    var path = params.path

    // harcode for testing
    host = '204d853f.ngrok.io'
    port = '443'
   
    var headers = {
        'X-Auth-Token':apiToken
    };

    // hardcode for now
    var options = {
        host: host,
        port: port,
        path: path+'/limits',
        method: 'GET',
        headers: headers
    };

    var postRequest = https.request(options, function(res) {
    
        var json = ''
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));

        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            json += chunk 
        });
        
        res.on('end', function() {
            console.log(json)            
            var j = JSON.parse(json)
            return whisk.done(j)

        });
    });

    postRequest.end();

    return whisk.async()
    
}
