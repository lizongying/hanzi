class Zi {

    constructor(config = {}) {
        const {
            borderSize = '1px',
            borderSizeBold = '2px',
            fontFamily = 'serif',
            borderColorOut = '#006400',
            borderColorIn = '#FF0000',
            mode = 0, // '0V/1H'
            style = 0, // '0米/1田/2口/3一'
            rowNum = 8,
            columnNum = 8,
            container = '#container',
            padding = 50,
            padding1 = 5,
        } = config;

        this.config = {
            clientWidth: 0,
            clientHeight: 0,
            containerWidth: 0,
            containerHeight: 0,
            boxSize: 100,
            fontSize: 80,
            borderSize,
            borderSizeBold,
            fontFamily,
            borderColorOut,
            borderColorIn,
            mode,
            style,
            rowNum,
            columnNum,
            container,
            padding,
            padding1,
        };

        this.createContainer();
        this.style = document.createElement('style');

        this.full();
        this.updateSizes();
        this.updateStyle();
    }

    createIframeWithContent(style) {
        const iframeDoc = this.iframe.contentDocument || this.iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
                <!DOCTYPE html>
                <html lang="zh-CN">
                <head>
                    <meta charset="UTF-8">
                    <title></title>
                    <style>
                    body {
                        width: ${this.config.mode === 1 ? '210' : '297'}mm;
                        height: ${this.config.mode === 1 ? '297' : '210'}mm;
                        padding: 0;
                        margin: 0;
                        font-family: 'Source Han Serif TC', 'SimSun-ExtB', 'MingLiU', serif;
                    }
                    </style>
                    <style>
                    ${style}
                    </style>
                </head>
                <body>
                    ${this.container.outerHTML}
                </body>
                </html>
            `);
        iframeDoc.close();
    }

    printIframe() {
        const a = 210 * 4;
        const b = 297 * 4;
        if (this.config.mode === 1) {
            this.iframe.width = `${a}px`;
            this.iframe.height = `${b}px`;
        } else {
            this.iframe.width = `${b}px`;
            this.iframe.height = `${a}px`;
        }
        this.createIframeWithContent(this.changeStyle(this.changeSizes({
            ...this.config,
            clientWidth: this.config.mode === 1 ? a : b,
            clientHeight: this.config.mode === 1 ? b : a,
        })));
        this.iframe.contentWindow.print();
    }

    createContainer() {
        this.container = document.querySelector(this.config.container);
        this.container1 = document.createElement('div');
        this.container1.className = 'c1';
        this.container.appendChild(this.container1);
        this.container2 = document.createElement('div');
        this.container2.className = 'c2';
        this.container1.appendChild(this.container2);

        this.iframe = document.createElement('iframe');
        this.iframe.style.display = 'none';
        this.container.parentElement.appendChild(this.iframe);
    }

    changeSizes(config) {
        const dimension = config.mode === 1 ? config.clientWidth : config.clientHeight;
        const bs = Math.floor((dimension - config.padding * 2 - config.padding1 * 2) / config.columnNum);
        const fs = Math.floor(bs * 4 / 5);
        config.boxSize = bs;
        config.fontSize = fs;

        const v = bs * config.columnNum;
        if (config.mode === 1) {
            config.containerWidth = v;
            config.containerHeight = `auto`;
        } else {
            config.containerHeight = v;
            config.containerWidth = `auto`;
        }
        return config;
    }

    updateSizes() {
        this.config.clientWidth = this.container.parentElement.clientWidth;
        this.config.clientHeight = this.container.parentElement.clientHeight;
        this.config = this.changeSizes(this.config);
    }

    setMode(mode) {
        this.config.mode = mode;
        this.updateSizes();
        this.updateStyle();
    }

    setRowNum(num) {
        this.config.rowNum = num;
        this.full();
        this.updateStyle();
    }

    setColumnNum(num) {
        this.config.columnNum = num;
        this.full();
        this.updateSizes();
        this.updateStyle();
    }

    setBorderColorOut(color) {
        this.config.borderColorOut = color;
        this.updateStyle();
    }

    setBorderColorIn(color) {
        this.config.borderColorIn = color;
        this.updateStyle();
    }

    setStyle(style) {
        this.config.style = style;
        this.updateStyle();
    }

    create(index, t) {
        let character = this.container2.children[index];
        if (character) {
            if (t) {
                character.querySelector('.t').textContent = t;
            }
        } else {
            const character = document.createElement('div');
            character.className = 'c';

            for (let i = 0; i < 4; i++) {
                const line = document.createElement('i');
                line.className = `l${i}`;
                character.appendChild(line);
            }

            const text = document.createElement('span');
            text.className = 't';
            text.textContent = t;
            character.appendChild(text);

            this.container2.appendChild(character);
        }
    }

    show(content) {
        while (this.container2.children.length) {
            this.container2.removeChild(this.container2.lastChild);
        }
        content.split('').forEach((index, t) => {
            this.create(t, index);
        });
        this.full();
        this.updateStyle();
    }

    full() {
        const count = this.config.rowNum * this.config.columnNum;
        while (this.container2.children.length > count) {
            this.container2.removeChild(this.container2.lastChild);
        }

        for (let t = 0; t < count; t++) {
            this.create(t);
        }
    }

    changeStyle(config) {
        return `
        ${config.container} {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: ${config.mode === 1 ? 'column' : 'row'};
            align-items: center;
            justify-content: center;
            padding: ${config.padding}px;
            box-sizing: border-box;
        }
        
        .c1 {
            border: 3px solid ${config.borderColorOut};
            display: flex;
            flex-direction: ${config.mode === 1 ? 'column' : 'row'};
            align-items: center;
            justify-content: center;
            padding:  ${config.padding1}px;
            box-sizing: border-box; 
            overflow: scroll;
        }
        
        .c2 {
            height: ${config.containerHeight}px;
            width: ${config.containerWidth}px;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            flex-direction: ${config.mode === 1 ? 'row' : 'column'};
            border-${config.mode === 1 ? 'left' : 'top'}: ${config.borderSize} solid ${config.borderColorOut};
            border-${config.mode === 1 ? 'right' : 'bottom'}: ${config.borderSize} solid ${config.borderColorOut};
            direction: ${config.mode === 1 ? 'ltr' : 'rtl'};
            font-size: ${config.fontSize}px;
            font-family: ${config.fontFamily};
            overflow: scroll;
        }

        .c {
            box-sizing: border-box;
            ${config.mode === 1 ? 'margin-top: 0' : 'margin-right: 0'};
            ${config.mode === 1 ? 'margin-bottom: .5em' : 'margin-left: .5em'};
            border-right: ${config.mode === 1 ? config.style > 2 ? 0 : config.borderSize : config.borderSizeBold} solid ${config.borderColorOut};
            border-left: ${config.mode === 1 ? config.style > 2 ? 0 : config.borderSize : config.borderSizeBold} solid ${config.borderColorOut};
            border-bottom: ${config.mode === 1 ? config.borderSizeBold : config.style > 2 ? 0 : config.borderSize} solid ${config.borderColorOut};
            border-top: ${config.mode === 1 ? config.borderSizeBold : config.style > 2 ? 0 : config.borderSize} solid ${config.borderColorOut};
            width: ${config.boxSize}px;
            height: ${config.boxSize}px;
            display: flex;
            overflow: hidden;
            justify-content: center;
            position: relative;
        }
        
        .c:nth-last-child(-n+${config.columnNum}) {
            ${config.mode === 1 ? 'margin-top: 0' : 'margin-right: 0'};
            ${config.mode === 1 ? 'margin-bottom: 0' : 'margin-left: 0'};
        }
        
        .l0, .l1, .l2, .l3 {
            position: absolute;
            left: 0;
            top: 0;
            box-sizing: border-box;
            background-color: transparent;
        }
        
        .l0, .l1 {
            width: 141.4%;
            height: 141.4%;
        }
        
        .l0 {
            border-bottom: ${config.borderSize} dashed ${config.borderColorIn};
            transform: translateX(-50%) translateY(-50%) rotate(-45deg);
        }
        
        .l1 {
            border-left: ${config.borderSize} dashed ${config.borderColorIn};
            transform: translateX(20%) translateY(-50%) rotate(-45deg);
        }
        
        .l2, .l3 {
            width: 100%;
            height: 100%;
        }
        
        .l2 {
            border-left: ${config.borderSize} dashed ${config.borderColorIn};
            transform: translateX(50%);
        }
        
        .l3 {
            border-top: ${config.borderSize} dashed ${config.borderColorIn};
            transform: translateY(50%);
        }

        .t {
            line-height: ${config.boxSize}px;
            height: 0;
            z-index: 1;
        }
        
        ${config.style > 0 ? '.l0, .l1 {display: none}' : '.l0, .l1 {display: block}'}
          
        ${config.style > 1 ? '.l2, .l3 {display: none}' : '.l2, .l3 {display: block}'}
        
        @media print {
            @page {
                size: A4 ${config.mode === 1 ? 'portrait' : 'landscape'};
            }
            
            .c2 {
                ${config.mode === 1 ? 'height: 100%!important;' : ''}
            }
        }
`;
    }

    updateStyle() {
        this.style.textContent = this.changeStyle(this.config);
        document.head.appendChild(this.style);
    }
}
