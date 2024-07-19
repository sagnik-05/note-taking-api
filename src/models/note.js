const uuid = require('uuid');

class Note {
  constructor(title, content, tags = []) {
    this.id = uuid.v4();
    this.title = title;
    this.content = content;
    this.tags = tags;
  }
}

module.exports = Note;