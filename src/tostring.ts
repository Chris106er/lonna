export function toString(obj: any): string {
    var hasProp = {}.hasOwnProperty;
    try {
      recursionDepth++;
      if (obj == null) {
        return "undefined";
      } else if (obj instanceof Function) {
        return "fn";
      } else if (obj instanceof Array) {
        if (recursionDepth > 5) {
          return "[..]";
        }
        return "[" + obj.map(toString).toString() + "]";
      } else if (((obj != null ? obj.toString : void 0) != null) && obj.toString !== Object.prototype.toString) {
        return obj.toString();
      } else if (typeof obj === "object") {
        if (recursionDepth > 5) {
          return "{..}";
        }
        var results: string[] = [];
        for (var key in obj) {
          if (!hasProp.call(obj, key)) continue;
          let value = (function() {
            try {
              return obj[key];
            } catch (error) {
              return error;
            }
          })();
          results.push(toString(key) + ":" + toString(value));
        }
        return "{" + results + "}";
      } else {
        return obj;
      }
    } finally {
      recursionDepth--;
    }
  }


let recursionDepth = 0;