const fs = require('fs')
const matter = require('gray-matter')
const hbs = require('handlebars')
const showdown = require('showdown')

const blogTemplate = hbs.compile(fs.readFileSync('templates/blog.template.html', 'utf8'))
const blogsFolder = "./blogs/"
const mdConverter = new showdown.Converter()

function buildBlogs() {
  // read all blogs, build html to inline
  let blogs = []
  readFiles(blogsFolder, (name, content) => {
    const theGoods = matter(content)
    blogs.push({
      'date': new Date(theGoods.data.date),
      'content': blogTemplate({
        'title': theGoods.data.title,
        'url': theGoods.data.url,
        'meta': fmtDate(theGoods.data.date),
        'content': mdConverter.makeHtml(theGoods.content)
      }),
    })
  })
  blogs.sort(function(a,b) {
    if (a.date > b.date) return -1
    if (b.date > a.date) return 1
    return 0
  })
  // build string
  let allBlogs = ""
  blogs.forEach(blg => {
    allBlogs += blg.content
  })
  return allBlogs
}

const indexTemplate = fs.readFileSync('templates/index.template.html', 'utf8')
const content = buildBlogs()
const indexHtml = hbs.compile(indexTemplate)({"inlineBlogs": content})

fs.writeFileSync('index.html', indexHtml)


function fmtDate(date) {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  return day + ' ' + monthNames[monthIndex] + ', ' + year;
}
/*
 * https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
 */
function readFiles(dirname, onFileContent) {
  fs.readdirSync(dirname).forEach(function(file) {
    const contents = fs.readFileSync(dirname + file, 'utf-8')
    onFileContent(file, contents);
  });
}

