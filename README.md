# 漢字網頁排版

支持文字豎向排列，支持米字格底紋

* 橫向/豎向
* 米字格

[doc](https://lizongying.github.io/hanzi/)

[npm](https://www.npmjs.com/package/js-hanzi)

[簡化字轉漢字](https://lizongying.github.io/js-han/)

![](screenshots/img_1.png)

### node

```
npm i js-hanzi
```

### browser

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>漢字示例</title>
    <style>
        .container {
            height: 600px;
        }
    </style>
    <script src="raw.githubusercontent.com/lizongying/js-gua64/refs/heads/main/docs/zi.min.js"></script>
    <script>
        window.addEventListener('DOMContentLoaded', () => {
            const zi = new Zi({
                container: '.container',
                mode: 'V',
                columnNum: 6,
                count: 30,
            });
            zi.show('漢字示例漢字示例漢字示例漢字示例漢字示例漢字示例');
            zi.show('我的世界');
        })
    </script>
</head>
<body>
<h1>漢字示例</h1>
<div class="container"></div>
</body>
</html>
```

配置：

* boxSize = '100px', // 暫時不用設置，默認會根據container的寬高和columnNum自動設置
* borderSize = '1px', // 可不用設置
* borderSizeBold = '2px', // 可不用設置
* fontSize = '80px', // 暫時不用設置，默認會設置為boxSize的4/5
* fontFamily = 'serif', // 可以設置
* borderColorOut = 'darkgreen', // 可以設置
* borderColorIn = 'red', // 可以設置
* mode = 'V', // 'V/H' 漢字排列方向。推薦設置
* count = 80, // 默認生成多少個漢字底紋，如果不設置會根據要展示的漢字數量自動添加。推薦設置
* columnNum = 8, // 每一行多少個漢字。推薦設置
* container = '#container' // 顯示漢字的容器，如果不指定，會自動創建一個。強烈推薦設置

## 讚賞

![image](./screenshots/appreciate.png)