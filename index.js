const path = require('path');
const fs = require('fs');
const showdown  = require('showdown');
const converter = new showdown.Converter();

const source = path.join(__dirname, 'blog');
const destination = path.join(__dirname, 'blabla');

let template_html;
let html_content;
let final_html;

let log_error = (e) => console.error(e);

let handle_files = (error, files) => {
    error && log_error(error);

    files.forEach((file) => {
        fs.readFile(path.join(source, file), 'utf8', (error, text) => {
            error && log_error(error);

            html_content = converter.makeHtml(text);
            final_html = template_html
                .replace('_CONTENT_REPLACE_HERE_', html_content)
                .replace('_TITLE_REPLACE_HERE_', file.replace('.md', ''))

            fs.writeFile(
                path.join(destination, file.replace('.md', '.html')),
                final_html,
                error => error && log_error(error));
        })
    });
}

fs.readFile('template.html', 'utf8', (error, text) => {
    error && log_error(error);

    template_html = text;

    fs.readdir(source, handle_files);
});

