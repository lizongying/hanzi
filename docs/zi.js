class Zi {

    constructor(config = {}) {
        const {
            boxSize = '100px',
            borderSize = '1px',
            borderSizeBold = '2px',
            fontSize = '80px',
            fontFamily = 'serif',
            borderColorOut = 'darkgreen',
            borderColorIn = 'red',
            mode = 'V', // 'V/H'
            count = 80,
            columnNum = 8,
            container = '#container'
        } = config;

        this.config = {
            boxSize,
            borderSize,
            borderSizeBold,
            fontSize,
            fontFamily,
            borderColorOut,
            borderColorIn,
            mode,
            count,
            columnNum,
            container,
        };

        this.container = document.querySelector(this.config.container);
        if (this.container === null) {
            this.container = document.createElement('div');
            this.container.id = 'container';
            document.body.appendChild(this.container);
            this.config.container = '#container';
        }

        if (this.config.mode === 'H') {
            const bs = Math.floor(this.container.clientWidth / this.config.columnNum);
            const fs = Math.floor(bs * 4 / 5);
            this.config.boxSize = `${bs}px`;
            this.config.fontSize = `${fs}px`;
        } else {
            const bs = Math.floor(this.container.clientHeight / this.config.columnNum);
            const fs = Math.floor(bs * 4 / 5);
            this.config.boxSize = `${bs}px`;
            this.config.fontSize = `${fs}px`;
        }

        this.full();
        this.createStyle();
    }

    setMode = (mode) => {
        this.config.mode = mode;
        this.createStyle();
    }

    setColumnNum = (num) => {
        this.config.columnNum = num;
        this.createStyle();
    }

    create = (index, t) => {
        let character = this.container.children[index];
        if (character) {
            character.querySelector('.t').textContent = t;
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

    show = (content) => {
        content.split('').forEach((index, t) => {
            this.create(t, index);
        })
    }

    full = () => {
        for (let t = 0; t < this.config.count; t++) {
            this.create(t);
        }
    }

    createStyle = () => {
        if (this.style === undefined) {
            this.style = document.createElement('style');
            document.head.appendChild(this.style);
        }

        this.style.textContent = `
        ${this.config.container} {
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            flex-direction: ${this.config.mode === 'H' ? 'row' : 'column'};
            border-${this.config.mode === 'H' ? 'left' : 'top'}: ${this.config.borderSize} solid ${this.config.borderColorOut};
            border-${this.config.mode === 'H' ? 'right' : 'bottom'}: ${this.config.borderSize} solid ${this.config.borderColorOut};
            direction: ${this.config.mode === 'H' ? 'ltr' : 'rtl'};
            font-size: ${this.config.fontSize};
            font-family: ${this.config.fontFamily};
            overflow: scroll;
        }

        .c {
            box-sizing: border-box;
            ${this.config.mode === 'H' ? 'margin-top: 0;' : 'margin-right: 0;'}   
            ${this.config.mode === 'H' ? 'margin-bottom: .5em;' : 'margin-left: .5em;'}            
            border-right: ${this.config.mode === 'H' ? this.config.borderSize : this.config.borderSizeBold} solid ${this.config.borderColorOut};
            border-left: ${this.config.mode === 'H' ? this.config.borderSize : this.config.borderSizeBold} solid ${this.config.borderColorOut};
            border-bottom: ${this.config.mode === 'H' ? this.config.borderSizeBold : this.config.borderSize} solid ${this.config.borderColorOut};
            border-top: ${this.config.mode === 'H' ? this.config.borderSizeBold : this.config.borderSize} solid ${this.config.borderColorOut};
            width: ${this.config.boxSize};
            height: ${this.config.boxSize};
            display: flex;
            overflow: hidden;
            justify-content: center;
            position: relative;
        }
        
        .c:nth-last-child(-n+${this.config.columnNum}) {
            ${this.config.mode === 'H' ? 'margin-top: 0;' : 'margin-right: 0;'}
            ${this.config.mode === 'H' ? 'margin-bottom: 0;' : 'margin-left: 0;'}
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
            line-height: ${this.config.boxSize};
            height: 0;
        }
`;
        document.head.appendChild(this.style);
    }
}

window.Zi = Zi
