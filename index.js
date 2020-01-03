const path = require('path');
const fs = require('fs');
const showdown  = require('showdown');
const converter = new showdown.Converter();

const source = path.join(__dirname, 'blog');
const destination = path.join(__dirname, 'blabla');

let log_error = (e) => console.error(e);

let html_content;

let handle_files = (error, files) => {
    error && log_error(error);

    files.forEach((file) => {
        fs.readFile(path.join(source, file), 'utf8', (error, text) => {
            error && log_error(error);

            html_content = converter.makeHtml(text);
            fs.writeFile(path.join(destination, file.replace('.md', '.html')), html_content, error => error && log_error(error));
        })
    });
}

fs.readdir(source, handle_files);

