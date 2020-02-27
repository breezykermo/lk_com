const fs = require('fs')
const matter = require('gray-matter')
const hbs = require('handlebars')
const showdown = require('showdown')

const blogTemplate = hbs.compile(fs.readFileSync('templates/blog.template.html', 'utf8'))
const blogsFolder = "./blogs/"
const mdConverter = new showdown.Converter()

function buildBlogs() {
  // read all blogs, build html to inline
  let stringBuilder = ""
  readFiles(blogsFolder, (name, content) => {
    const theGoods = matter(content)
    stringBuilder += blogTemplate({
      ...theGoods.data,
      'content': mdConverter.makeHtml(theGoods.content)
    })
    stringBuilder += '\n'
  })
  return stringBuilder
}

const indexTemplate = fs.readFileSync('templates/index.template.html', 'utf8')
const content = buildBlogs()
const indexHtml = hbs.compile(indexTemplate)({"inlineBlogs": content})

fs.writeFileSync('index.html', indexHtml)

/*
 * https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
 */
function readFiles(dirname, onFileContent) {
  fs.readdirSync(dirname).forEach(function(file) {
    const contents = fs.readFileSync(dirname + file, 'utf-8')
    onFileContent(file, contents);
  });
}

