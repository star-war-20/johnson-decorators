const fs = require('fs');
const path = require('path');

const dir = 'c:/Sanjitproject/figma';
const files = ['index.html', 'about.html', 'services.html', 'work.html', 'contact.html', 'domestic-painting.html', 'commercial-painting.html'];

for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, 'utf8');

    // Desktop nav
    content = content.replace(
        /(<a href="work\.html" class="nav-link-custom.*?<\/a>)/g,
        '$1\n                    <a href="blog.html" class="nav-link-custom text-gray-300 font-medium text-[15px] no-underline">Blog</a>'
    );

    // Mobile nav (about, services, index, contact, work)
    content = content.replace(
        /(<a href="work\.html">Our Works<\/a>)/g,
        '$1\n            <a href="blog.html">Blog</a>'
    );

    // Mobile nav (domestic, commercial)
    content = content.replace(
        /(<a href="work\.html">Our Works<\/a>)(<a href="contact\.html">Contact<\/a>)/g,
        '$1<a href="blog.html">Blog</a>$2'
    );

    // Footer nav
    content = content.replace(
        /(<a href="work\.html" class="footer-link">.*?<\/a>)/g,
        '$1\n                    <a href="blog.html" class="footer-link">Blog</a>'
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
}
