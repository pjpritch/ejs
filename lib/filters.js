/*!
 * EJS - Filters
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * First element of the target `obj`.
 */

exports.first = function(obj) {
  return obj[0];
};

/**
 * Last element of the target `obj`.
 */

exports.last = function(obj) {
  return obj[obj.length - 1];
};

/**
 * Capitalize the first letter of the target `str`.
 */

exports.capitalize = function(str){
  str = String(str);
  return str[0].toUpperCase() + str.substr(1, str.length);
};

/**
 * Downcase the target `str`.
 */

exports.downcase = function(str){
  return String(str).toLowerCase();
};

/**
 * Uppercase the target `str`.
 */

exports.upcase = function(str){
  return String(str).toUpperCase();
};

/**
 * Sort the target `obj`.
 */

exports.sort = function(obj){
  return Object.create(obj).sort();
};

/**
 * Sort the target `obj` by the given `prop` ascending.
 */

exports.sort_by = function(obj, prop){
  return Object.create(obj).sort(function(a, b){
    a = a[prop], b = b[prop];
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
};

/**
 * Size or length of the target `obj`.
 */

exports.size = exports.length = function(obj) {
  return obj.length;
};

/**
 * Add `a` and `b`.
 */

exports.plus = function(a, b){
  return Number(a) + Number(b);
};

/**
 * Subtract `b` from `a`.
 */

exports.minus = function(a, b){
  return Number(a) - Number(b);
};

/**
 * Multiply `a` by `b`.
 */

exports.times = function(a, b){
  return Number(a) * Number(b);
};

/**
 * Divide `a` by `b`.
 */

exports.divided_by = function(a, b){
  return Number(a) / Number(b);
};

/**
 * Join `obj` with the given `str`.
 */

exports.join = function(obj, str){
  return obj.join(str || ', ');
};

/**
 * Truncate `str` to `len`.
 */

exports.truncate = function(str, len, append){
  str = String(str);
  if (str.length > len) {
    str = str.slice(0, len);
    if (append) str += append;
  }
  return str;
};

/**
 * Truncate `str` to `n` words.
 */

exports.truncate_words = function(str, n){
  var str = String(str)
    , words = str.split(/ +/);
  return words.slice(0, n).join(' ');
};

/**
 * Replace `pattern` with `substitution` in `str`.
 */

exports.replace = function(str, pattern, substitution){
  return String(str).replace(pattern, substitution || '');
};

/**
 * Prepend `val` to `obj`.
 */

exports.prepend = function(obj, val){
  return Array.isArray(obj)
    ? [val].concat(obj)
    : val + obj;
};

/**
 * Append `val` to `obj`.
 */

exports.append = function(obj, val){
  return Array.isArray(obj)
    ? obj.concat(val)
    : obj + val;
};

/**
 * Map the given `prop`.
 */

exports.map = function(arr, prop){
  return arr.map(function(obj){
    return obj[prop];
  });
};

/**
 * Reverse the given `obj`.
 */

exports.reverse = function(obj){
  return Array.isArray(obj)
    ? obj.reverse()
    : String(obj).split('').reverse().join('');
};

/**
 * Get `prop` of the given `obj`.
 */

exports.get = function(obj, prop){
  return obj[prop];
};

/**
 * Packs the given `obj` into json string
 */
exports.json = function(obj){
  return JSON.stringify(obj);
};

exports.link_to = function(obj, engine){
	//console.log('engine: '+engine);
	engine = obj.engine || {app:{}};
	var routes = {}, matches=[], entry;
	if( engine.app.config && engine.app.config.routes ) {
		routes = engine.app.config.routes;
	}
	//console.log('appRoutes: '+JSON.stringify(routes));

	var url = '', template, productionURL, match = true;
	//console.log('link_to: '+JSON.stringify(obj));
	if( obj.context ) {
		// Look through the routes and
		for( var x in routes ) {
			entry = routes[x];
			if( entry.context == obj.context ) {
				if( obj.query ) {
					match = true;
					for( var y in obj.query ) {
						if( obj.query[y]!=entry.query[y] ) {
							//console.log('doesnt match: '+obj.query[y]+'!='+entry.query[y]);
							//console.log('skipping potential match: '+x);
							match = false;
							break;
						} else {
							//console.log('does match: '+obj.query[y]+'=='+entry.query[y]);
						}
					}
					if( match ) {
						//console.log('full match found: '+x+' using template: '+entry.template);
						productionURL = x;
						template = entry.template;
						break;
					}
				} else {
					//console.log('no query ... using stem: '+x+' and template: '+entry.template);
					productionURL = x;
					template = entry.template;
					break;
				}
			} else {
				//console.log('skipping non-match: '+x);
				//console.log('context: '+entry.context+' doesnt match context: '+obj.context);
			}
		}
		
		if( engine.isLive ) {
			//console.log('trying to compute live URL');
		}
		
		if( engine.isLive && productionURL ) {
			//console.log('returning live URL: '+productionURL);
			return productionURL;
		} else {
			if( engine && engine.app && engine.app.config ) {
				url += 'http://api.'+engine.app.config.tenant_host+'/render/contexts/'+obj.context;
		
				if( template ) {
					url += '/template/'+template;
				}
			} else {
				url = '/no/engine/config/for/url/contexts/'+obj.context;
			}
		}
	}
	
	if( obj.query ) {
		var query_string = '';
		for( var x in obj.query ) {
			query_string += '&'+x+'='+obj.query[x];
		}
		if( query_string.length > 0 ) {
			url += '?'+query_string.substring(1);
		}
	}
	
	//console.log('returning debug URL: '+url);
	
	return url;
};

