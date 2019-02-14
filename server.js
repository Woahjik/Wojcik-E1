var http = require("http");
var server = http.createServer(requestHandler);
server.listen(process.env.PORT, process.env.IP, startHandler);

function startHandler()
{
    var addr = server.address();
    console.log('Server listening at', addr.address + ':' + addr.port);
}

function requestHandler(req, res)
{
    try
    {
        var url = require('url');
        var url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        
        res.writeHead(200, {'Content-Type' : 'application/json'});
        var result = {};
        
        if(query['cmd'] == 'calcDistance')
            result = calcDistance(query);
        
        else if(query['cmd'] == 'calcCost')
            result = calcCost(query);
        
        else
            throw Error('Invalid Command: ' + query['cmd']);
        
        
        res.write(JSON.stringify(result));
        res.end('');
    }
    
    catch(e)
    {
        var error = {'error: ' : e.message};
        res.write(JSON.stringify(error));
        res.end('');
    }
}

function calcDistance(query)
{
    if(query['budget'] == undefined)
        throw Error('Please enter a budget');
    
    if(query['mpg'] == undefined)
        throw Error('Please enter mpg');
    
    if(query['fuelCost'] == undefined)
        throw Error('Please enter fuelCost');
        
    if(query['budget'] == "")
        throw Error('Please enter a number for budget');
        
    if(query['mpg'] == "")
        throw Error('Please enter a number for mpg');
        
    if(query['fuelCost'] == "")
        throw Error('Please enter a number for fuelCost');
        
    if(isNaN(query['budget']))
        throw Error('Please enter a number for budget');
    
    if(isNaN(query['mpg']))
        throw Error('Please enter a number for mpg');
        
    if(isNaN(query['fuelCost']))
        throw Error('Please enter a number for fuelCost');
        
    if(query['budget'] < 0)
        throw Error('Please enter a correct value for budget');
        
    if(query['mpg'] < 0)
        throw Error('Please enter a correct value for mpg');
        
    if(query['fuelCost'] < 0)
        throw Error('Please enter a correct value for fuelCost');
        
    var budget = query['budget'];
    var mpg = query['mpg'];
    var fuelCost = query['fuelCost'];
    var gallons = budget / fuelCost;
    
    var result = {'distance' :gallons * mpg}
    return result;
}

function calcCost(query)
{
    if(query['distance'] == undefined)
        throw Error('Please enter a distance');
    
    if(query['mpg'] == undefined)
        throw Error('Please enter mpg');
    
    if(query['fuelCost'] == undefined)
        throw Error('Please enter fuelCost');
        
    if(query['distance'] == "")
        throw Error('Please enter a number for distance');
        
    if(query['mpg'] == "")
        throw Error('Please enter a number for mpg');
        
    if(query['fuelCost'] == "")
        throw Error('Please enter a number for fuelCost');
        
    if(isNaN(query['distance']))
        throw Error('Please enter a number for distance');
    
    if(isNaN(query['mpg']))
        throw Error('Please enter a number for mpg');
        
    if(isNaN(query['fuelCost']))
        throw Error('Please enter a number for fuelCost');
        
    if(query['distance'] < 0)
        throw Error('Please enter a correct value for distance');
        
    if(query['mpg'] < 0)
        throw Error('Please enter a correct value for mpg');
        
    if(query['fuelCost'] < 0)
        throw Error('Please enter a correct value for fuelCost');
    
    var distance = query['distance'];
    var mpg = query['mpg'];
    var fuelCost = query['fuelCost'];
    var gallons = distance / mpg;
    
    var result = {'cost' : gallons * fuelCost};
    return result;
}