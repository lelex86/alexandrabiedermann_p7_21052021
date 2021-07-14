const sanitizer = require("express-html-sanitizer");
config = {
  allowedTags: [],
  allowedAttributes: {},
};
const sanitize = sanitizer(config);

module.exports = sanitize;
