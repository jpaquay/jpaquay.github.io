module.exports = {
  process(src, filename) {
    if (filename.includes('staticman.js')) {
      let code = src.replace(/^---\n[\s\S]*?\n---\n/, '');
      code = code.replace(/{%[\s\S]*?%}/g, '');
      code = code.replace(/{{.*?sm\.endpoint.*?}}/g, 'https://api.staticman.net/v2/entry/');
      code = code.replace(/{{.*?sm\.repository.*?}}/g, 'user/repo');
      code = code.replace(/{{.*?sm\.branch.*?}}/g, 'master');
      return { code };
    }
    return { code: src };
  },
};
