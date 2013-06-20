var sourceURL = "https://spreadsheets.google.com/feeds/cells/0ApfeDljuteLQdGo4U1J4alZnNTFsUGdacTlEcEV4Y0E/1/public/basic?alt=json";

$(document).ready(function() {
	$.get(sourceURL, function(responseText) {
		if (responseText.feed != undefined) {
			if (responseText.feed.entry.length) {
				$('body').append(themeQuestions(responseText.feed.entry, 9));
			}
		}
	});
	
	// Function that returns HTML of questions given the no. of columns for each question
	function themeQuestions(data, numColumns) {
		if (numColumns == 0) return;
		var categorizedData = split(data, (data.length / numColumns));
		console.log(categorizedData);
		
		var finalHtml = '';
		
		for (var i=1; i<categorizedData.length; i++) {
			finalHtml += '<div class="well">';
			
			finalHtml += '<div class="page-header"><h3>' + categorizedData[i][0].content.$t + '. '  + categorizedData[i][1].content.$t + '<small> by ' + categorizedData[i][2].content.$t + '</small></h3></div>';
			
			if (categorizedData[i][3].content.$t != 'nil' && categorizedData[i][5].content.$t != 'nil' && categorizedData[i][6].content.$t != 'nil') {
				finalHtml += '<blockquote><p>' + categorizedData[i][3].content.$t + '</p><small><em>' + categorizedData[i][5].content.$t + '</em>, <cite title="' +  categorizedData[i][6].content.$t + '">' + categorizedData[i][6].content.$t + '</cite></small></blockquote>';
			}
			
			finalHtml += '<p>' + categorizedData[i][4].content.$t + '</p>';
			
			finalHtml += '<p><audio controls><source src="' + categorizedData[i][8].content.$t + '" type="audio/mpeg">Your browser does not support the audio element.</audio></p>';
			
			finalHtml += '</div>';
		}
		
		return finalHtml;
	}
	
	// A helper function that helps split an array into n equal sub-arrays
	function split(a, n) {
    var len = a.length,out = [], i = 0;
    while (i < len) {
        var size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, i += size));
    }
    return out;
	}
});