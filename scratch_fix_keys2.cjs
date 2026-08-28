const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const dir = path.join('d:', 'Fullstack Project', 'resume builder', 'resume-builder-client', 'src', 'pages', 'resume', 'templates');
const files = walk(dir);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Projects
  if (file.includes('Projects.tsx')) {
    if (content.match(/data\.map\(\((project|proj), index\)/)) {
      content = content.replace(/key=\{index\}/g, (match, offset, string) => {
        // Only replace if it's right after `<View wrap={false} ` or `<View `
        return 'key={project.id || index}'; 
      });
      // Actually we can just do a simpler replace since there is only one map that provides `project`
      // Wait, there's `project.features.map((feature, idx) => (` which uses `key={idx}`.
      // So replacing `key={index}` globally is perfectly safe.
      
      content = content.replace(/key=\{index\}/g, 'key={project.id || index}');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});
