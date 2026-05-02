const fs = require('fs');
const path = require('path');

const dir = __dirname;
const indexFile = path.join(dir, 'index.html');

const filesToUpdate = [
    'about.html',
    'blog.html',
    'commercial-painting.html',
    'contact.html',
    'domestic-painting.html',
    'interior-painting.html',
    'services.html',
    'work.html'
];

try {
    const indexContent = fs.readFileSync(indexFile, 'utf8');
    
    // Extract footer from index.html
    const footerStartMatch = indexContent.match(/<footer[^>]*>/);
    const footerEndMatch = indexContent.match(/<\/footer>/);
    
    if (!footerStartMatch || !footerEndMatch) {
        throw new Error('Could not find footer boundaries in index.html');
    }
    
    const footerStart = footerStartMatch.index;
    const footerEnd = footerEndMatch.index + '</footer>'.length;
    const newFooter = indexContent.substring(footerStart, footerEnd);
    
    filesToUpdate.forEach(file => {
        const filePath = path.join(dir, file);
        if (!fs.existsSync(filePath)) {
            console.log(`Skipping ${file} - not found`);
            return;
        }
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        const oldFooterStartMatch = content.match(/<footer[^>]*>/);
        const oldFooterEndMatch = content.match(/<\/footer>/);
        
        if (oldFooterStartMatch && oldFooterEndMatch) {
            const oldFooterStart = oldFooterStartMatch.index;
            const oldFooterEnd = oldFooterEndMatch.index + '</footer>'.length;
            
            content = content.substring(0, oldFooterStart) + newFooter + content.substring(oldFooterEnd);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated footer in ${file}`);
        } else {
            console.log(`Could not find footer in ${file}`);
        }
    });
    
    console.log('Footer update complete!');
    
} catch (err) {
    console.error('Error:', err.message);
}
