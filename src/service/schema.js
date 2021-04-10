const fs = require('fs');
const path = require('path');

const schemas = {};

const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(file => {
    if (fs.statSync(`${dir}/${file}`).isDirectory()) {
      filelist = walkSync(`${dir}/${file}`, filelist);
    } else {
      const foundFile = `${dir}/${file}`;
      filelist.push(foundFile.replace(/^.\/schema/, '.'));
    }
  });
  return filelist;
};

const loadSchemas = rootDirectory => {
  const schemaFiles = walkSync(rootDirectory);
  // console.log('WALK', schemaFiles);

  schemaFiles.map(file => {
    // console.log(file);
    const filePath = path.resolve(file);
    // console.log(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    schemas[file] = JSON.parse(fileContent);
    return true;
  });
//   console.log(schemas);
  return true;
};

const getSchema = (
  schema,
  rootDirectory = 'schema/v1',
) => {
    console.log('We are looking for: ', `${rootDirectory}/${schema}.json`);
  const selector = `${rootDirectory}/${schema}.json`;
  return schemas[selector];
};

module.exports = {
    getSchema,
    loadSchemas,
}
