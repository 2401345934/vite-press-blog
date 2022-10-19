# json-utils

## safeJsonParse  JSON转换

```javascript
const safeJsonParse = str => {
  if (!str || typeof str != 'string') {
    return str
  }
  return JSON.parse(str)
}
```
