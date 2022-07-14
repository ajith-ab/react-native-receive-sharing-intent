function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import MimeTypes from './mimeTypes';

class Utils {
  constructor() {
    _defineProperty(this, "getFileName", file => {
      return file.replace(/^.*(\\|\/|\:)/, '');
    });

    _defineProperty(this, "getExtension", fileName => {
      return fileName.substr(fileName.lastIndexOf('.') + 1);
    });

    _defineProperty(this, "getMimeType", file => {
      const ext = this.getExtension(file);
      const extension = "." + ext.toLowerCase();
      const type = Object.entries(MimeTypes).find(mime => mime[0] === extension);
      if (type) return type[0];
      return "";
    });
  }

  sortData(data) {
    const time = new Date();
    const defaultName = time.toString();
    const objects = {
      filePath: null,
      text: null,
      weblink: null,
      mimeType: null,
      contentUri: null,
      fileName: defaultName,
      extension: null
    };
    const file = data;

    if (file.startsWith('text:')) {
      const text = file.replace("text:", "");

      if (text.startsWith("http")) {
        const object = [{ ...objects,
          weblink: text
        }];
        return object;
      }

      let object = [{ ...objects,
        text: text
      }];
      return object;
    } else if (file.startsWith('webUrl:')) {
      const weblink = file.replace("webUrl:", "");
      const object = [{ ...objects,
        weblink: weblink
      }];
      return object;
    } else {
      try {
        const files = JSON.parse(file);
        const object = [];

        for (let i = 0; i < files.length; i++) {
          const path = files[i].path;
          const obj = { ...objects,
            fileName: this.getFileName(path),
            extension: this.getExtension(path),
            mimeType: this.getMimeType(path),
            filePath: path
          };
          object.push(obj);
        }

        return object;
      } catch (error) {
        return [{ ...objects
        }];
      }
    }
  }

}

export default Utils;
//# sourceMappingURL=utils.js.map