class Zi {

    constructor(config = {}) {
        const {
            fit = 0,
            boxSize = 100,
            borderSize = '1px',
            borderSizeBold = '2px',
            fontSize = 80,
            fontFamily = 'serif',
            borderColorOut = '#006400',
            borderColorIn = '#FF0000',
            mode = 0, // '0V/1H'
            style = 0, // '0米/1田/2口/3一'
            rowNum = 8,
            columnNum = 8,
            container = '#container'
        } = config;

        this.config = {
            fit,
            boxSize,
            borderSize,
            borderSizeBold,
            fontSize,
            fontFamily,
            borderColorOut,
            borderColorIn,
            mode,
            style,
            rowNum,
            columnNum,
            container,
        };

        this.container = document.querySelector(this.config.container) || this.createContainer();
        this.updateSizes();
        this.full();
        this.updateStyle();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'container';
        document.body.appendChild(container);
        this.config.container = '#container';
        return container;
    }

    updateSizes() {
        const dimension = this.config.mode === 1 ? this.container.clientWidth : this.container.clientHeight;
        const bs = Math.floor(dimension / this.config.columnNum);
        const fs = Math.floor(bs * 4 / 5);
        this.config.boxSize = bs;
        this.config.fontSize = fs;

        const v = `${bs * this.config.columnNum}px`;
        if (this.config.mode === 1) {
            this.container.style.width = v;
            this.container.style.height = `100%`;
        } else {
            this.container.style.height = v;
            this.container.style.width = `100%`;
        }
    }

    setFit(fit) {
        this.config.fit = fit;
        if (fit === 1) {
            const v1 = this.config.boxSize * this.config.rowNum + Math.floor(this.config.fontSize / 2) * (this.config.rowNum - 1);

            if (this.config.mode === 1) {
                if (v1 > document.body.clientHeight - 20) {
                    this.container.style.width = `${this.container.clientWidth * (document.body.clientHeight - 20) / v1}px`;
                }
            } else {
                if (v1 > document.body.clientWidth - 20) {
                    this.container.style.height = `${this.container.clientHeight * (document.body.clientWidth - 20) / v1}px`;
                }
            }
        } else {
            if (this.config.mode === 1) {
                this.container.style.width = `100%`;
            } else {
                this.container.style.height = `100%`;
            }
        }

        this.updateSizes();
        this.updateStyle();
    }

    setMode(mode) {
        this.config.mode = mode;
        this.updateSizes();
        this.updateStyle();
    }

    setRowNum(num) {
        this.config.rowNum = num;
        this.updateSizes();
        this.full();
        this.updateStyle();
    }

    setColumnNum(num) {
        this.config.columnNum = num;
        this.updateSizes();
        this.full();
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
        let character = this.container.children[index];
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

            this.container.appendChild(character);
        }
    }

    show(content) {
        content.split('').forEach((index, t) => {
            this.create(t, index);
        });
    }

    full() {
        const count = this.config.rowNum * this.config.columnNum;
        while (this.container.children.length > count) {
            this.container.removeChild(this.container.lastChild);
        }

        for (let t = 0; t < count; t++) {
            this.create(t);
        }
    }

    updateStyle() {
        if (!this.style) {
            this.style = document.createElement('style');
            document.head.appendChild(this.style);
        }

        this.style.textContent = `
        ${this.config.container} {
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            flex-direction: ${this.config.mode === 1 ? 'row' : 'column'};
            border-${this.config.mode === 1 ? 'left' : 'top'}: ${this.config.borderSize} solid ${this.config.borderColorOut};
            border-${this.config.mode === 1 ? 'right' : 'bottom'}: ${this.config.borderSize} solid ${this.config.borderColorOut};
            direction: ${this.config.mode === 1 ? 'ltr' : 'rtl'};
            font-size: ${this.config.fontSize}px;
            font-family: ${this.config.fontFamily};
            overflow: scroll;
        }

        .c {
            box-sizing: border-box;
            ${this.config.mode === 1 ? 'margin-top: 0' : 'margin-right: 0'};
            ${this.config.mode === 1 ? 'margin-bottom: .5em' : 'margin-left: .5em'};
            border-right: ${this.config.mode === 1 ? this.config.style > 2 ? 0 : this.config.borderSize : this.config.borderSizeBold} solid ${this.config.borderColorOut};
            border-left: ${this.config.mode === 1 ? this.config.style > 2 ? 0 : this.config.borderSize : this.config.borderSizeBold} solid ${this.config.borderColorOut};
            border-bottom: ${this.config.mode === 1 ? this.config.borderSizeBold : this.config.style > 2 ? 0 : this.config.borderSize} solid ${this.config.borderColorOut};
            border-top: ${this.config.mode === 1 ? this.config.borderSizeBold : this.config.style > 2 ? 0 : this.config.borderSize} solid ${this.config.borderColorOut};
            width: ${this.config.boxSize}px;
            height: ${this.config.boxSize}px;
            display: flex;
            overflow: hidden;
            justify-content: center;
            position: relative;
        }
        
        .c:nth-last-child(-n+${this.config.columnNum}) {
            ${this.config.mode === 1 ? 'margin-top: 0' : 'margin-right: 0'};
            ${this.config.mode === 1 ? 'margin-bottom: 0' : 'margin-left: 0'};
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
            border-bottom: ${this.config.borderSize} dashed ${this.config.borderColorIn};
            transform: translateX(-50%) translateY(-50%) rotate(-45deg);
        }
        
        .l1 {
            border-left: ${this.config.borderSize} dashed ${this.config.borderColorIn};
            transform: translateX(20%) translateY(-50%) rotate(-45deg);
        }
        
        .l2, .l3 {
            width: 100%;
            height: 100%;
        }
        
        .l2 {
            border-left: ${this.config.borderSize} dashed ${this.config.borderColorIn};
            transform: translateX(50%);
        }
        
        .l3 {
            border-top: ${this.config.borderSize} dashed ${this.config.borderColorIn};
            transform: translateY(50%);
        }

        .t {
            line-height: ${this.config.boxSize}px;
            height: 0;
            z-index: 1;
        }
        
        ${this.config.style > 0 ? '.l0, .l1 {display: none}' : '.l0, .l1 {display: block}'}
          
        ${this.config.style > 1 ? '.l2, .l3 {display: none}' : '.l2, .l3 {display: block}'}
        
        @media print {
            @page {
                size: A4 ${this.config.mode === 1 ? 'portrait' : 'landscape'};
            }
        }
`;
        document.head.appendChild(this.style);
    }
}
