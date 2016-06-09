# md2html
Executable to generate html from markdown.

## How to install ?

    npm install node-md2html -g

## How to use it ?

Write markdown formatted documentation and generate automatically a sexy html documentation.

    md2html doc.md > doc.html

This will generate only the html corresponding to your markdown without headers and style.

If you want a complete html page, you may use template like the default template (using stackedit default style) :

    md2html doc.md --default-template > doc.html


## Thanks

This project is inspired from (stackedit)[stackedit.io] but works as a standalone without-browser version.

Like stackedit, it uses :

* (pagedown)[https://github.com/ujifgc/pagedown]
* (js-sequence-diagrams)[https://github.com/ujifgc/pagedown]


## Next steps

The next improvments might be :

* integration of flowcharts
* management of pagedown-extra










