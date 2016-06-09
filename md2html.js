
// https://github.com/mathjax/MathJax
// https://github.com/mathjax/MathJax-node
// https://github.com/jmcmanus/pagedown-extra
// https://highlightjs.org/
// http://adrai.github.io/flowchart.js/
// http://bramp.github.io/js-sequence-diagrams/
//
//
// https://github.com/bramp/js-sequence-diagrams
//

var fs = require('fs');
//var path = require('path');
var pagedown = require("pagedown");
var converter = new pagedown.Converter();

var templateFilename = '';
var mdFilename = '';

try {
    for (var i = 2 ; i < process.argv.length ; i++) {
        var arg = process.argv[i];
        if (arg == '-t' || arg == '--template') {
            if (i+1 >= process.argv.length) {
                throw '';
            }
            i++;
            templateFilename = process.argv[i];
        } else if (arg == '--default-template') {
            templateFilename = __dirname+'/templates/stackedit.html';
        } else {
            mdFilename = arg;
        }
    }

    if (mdFilename == ''){
        throw '';
    }
} catch (e) {
    console.log('md2html <filename>');
    console.log('md2html <filename> --template <templatefilename>');
    console.log('md2html <filename> --default-template');
    process.exit(2);
}


html = fs.readFileSync(mdFilename,'utf8');

var sequences = [];
// remove and store the sequence diagram 
var regex = /```sequence([\s\S]*)```/;
html = html.replace(regex, function(x){
    var sequence = x.match(regex)[1];
    sequences.push(sequence);
    return '```sequence```';
});

// convert the simple markdown
html = converter.makeHtml(html);

// reinsert the sequence diagrams
var sequenceIndex = 0;
html = html.replace(/<code>sequence<\/code>/g,function(x){
    x = '<div class="diagram"><div class="sequence-diagram">'+sequences[sequenceIndex]+'</div><!--<a class="diagram-download">download</a>--></div>';
    sequenceIndex++;
    return x;
});

// use template
if (templateFilename != ''){
    var template = fs.readFileSync(templateFilename, 'utf8');
    html = template.replace('##content##',html);
}

console.log(html);


// a simple TeX-input example
/*
var mjAPI = require("mathjax-node/lib/mj-single.js");
mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  }
});
mjAPI.start();

var yourMath = 'E = mc^2';

mjAPI.typeset({
  math: yourMath,
  format: "TeX", // "inline-TeX", "MathML"
  mml:true, //  svg:true,
}, function (data) {
  if (!data.errors) {console.log(data.mml)}
});
*/

