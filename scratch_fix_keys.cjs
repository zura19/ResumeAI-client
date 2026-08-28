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

  // Education
  if (file.includes('Education.tsx')) {
    if (content.match(/data\.map\(\(edu, index\)/)) {
      content = content.replace(/<View key=\{index\}/g, '<View key={edu.id || index}');
      changed = true;
    }
  }
  
  // Experience
  if (file.includes('Experience.tsx')) {
    if (content.match(/data\.map\(\(exp, index\)/)) {
      content = content.replace(/<View key=\{index\}/g, '<View key={exp.id || index}');
      changed = true;
    }
  }

  // Projects
  if (file.includes('Projects.tsx')) {
    if (content.match(/data\.map\(\(proj, index\)/)) {
      content = content.replace(/<View key=\{index\}/g, '<View key={proj.id || index}');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});
