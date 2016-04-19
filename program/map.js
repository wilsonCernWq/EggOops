function EggMap() {
    this.id = 1;
    this.exitx;
    this.exity;
    this.startx;
    this.starty;
    this.init = init;

    var data = ['1 0 0 0 1 0 5 0 0 0 1 0 5 0 0 0 1 0 0 1 0 3 1 0 0 1 0 5 1 0 0 1 0 1 1 0 0 1 0 4 4 0 0 4 0 0 4 0 4 4 0 0 4 0 3 1 0 0 1 0 4 1 0 0 1 0 0 1 0 0 1 0 0 1 0 0 1 0 3 1 0 0 1 0 1 1 0 0 1 0 5 1 0 2 0 0 0 1 0 0 0 0 0 1 0 4 0 0 0 1 5 0 5',
                '2 3 3 0 0 4 0 0 4 0 0 4 2 0 4 0 0 0 0 1 0 0 0 0 3 7 4 0 6 4 4 0 1 4 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 2 7 0 0 0 0 0 1 1 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0 2 0 0 0 1 0 0 0 0 0 1 0 0 1 0 0 0 0 0 0 0 4 1 0 0 0 0 0 0 0 0 2 2 5 0',
                '3 1 0 2 0 0 0 0 0 0 0 0 0 1 4 0 0 0 0 1 0 2 1 4 2 0 0 0 2 0 0 0 1 0 0 1 0 1 0 0 0 4 2 1 3 3 0 0 0 0 4 0 0 0 0 1 0 0 0 4 0 0 3 1 1 2 3 0 0 0 1 1 2 1 0 0 0 4 0 0 3 0 0 2 2 1 0 0 0 2 0 7 0 0 0 0 0 0 0 4 0 0 0 0 0 0 1 0 2 0 4 5 1'];

    function init() {
        this.showExit = false;
        this.content = new Array(6);
        for (var i = 0; i < 6; i++) {
            this.content[i] = new Array(6);
            for (var j = 0; j < 6; j++)
                this.content[i][j] = new MapUnit();
        }
        /*this.map_file = './testmap.txt';
		jQuery.get(this.map_file, function(data) {
			array = data.split(' ');
			this.id = array[0];
			for(var i=0;i<6;i++)
				for(var j=0;j<6;j++)
				{
					this.content[i][j].bottom = decode(array[3*(i*6+j)+1]);
					this.content[i][j].right = decode(array[3*(i*6+j)+2]);
					this.content[i][j].center = decode(array[3*(i*6+j)+3]);
				}
			this.startx = array[37];
			this.starty = array[38];
			this.exitx = array[39];
			this.exity = array[40];
		});*/
        array = data[this.id-1].split(' ');
        //this.id = Number(array[0]);
        for (var i = 0; i < 6; i++)
            for (var j = 0; j < 6; j++) {
                this.content[i][j].bottom = decode_bottom(Number(array[3 * (i * 6 + j) + 1]));
                this.content[i][j].right = decode_right(Number(array[3 * (i * 6 + j) + 2]));
                this.content[i][j].center = decode_center(Number(array[3 * (i * 6 + j) + 3]));
            }
        this.startx = Number(array[109]);
        this.starty = Number(array[110]);
        this.exitx = Number(array[111]);
        this.exity = Number(array[112]);

        function decode_bottom(x) {
            switch (x) {
                case 0:
                    return 'empty';
                case 1:
                    return 'normal';
                case 2:
                    return 'tilt_left';
                case 3:
                    return 'tilt_right';
                case 4:
                    return 'temp1';
                case 5:
                    return 'temp2';
                case 6:
                    return 'temp3';
                case 7:
                    return 'fire';
                case 8:
                    return 'nail';
                default:
                    return 'empty';
            }
        }

        function decode_right(x) {
            switch (x) {
                case 0:
                    return 'empty';
                case 1:
                    return 'normal';
                case 2:
                    return 'temp1';
                case 3:
                    return 'temp2';
                case 4:
                    return 'temp3';
                default:
                    return 'empty';
            }
        }

        function decode_center(x) {
            switch (x) {
                case 0:
                    return 'empty';
                case 1:
                    return 'life';
                case 2:
                    return 'score';
                case 3:
                    return 'water';
                case 4:
                    return 'harmer';
                case 5:
                    return 'key';
                default:
                    return 'empty';
            }
        }
    }

    this.next_level = function () {
        this.id++;
        this.init();
    }
}

function MapUnit() {
    this.bottom = 0;
    this.right = 0;
    this.center = 0;
}

function content2Color(state) {
    switch (state) {
        case 'normal':
            return "rgb(90,151,120)";
        case 'tilt_left':
        case 'tilt_right':
            return "rgb(53,118,72)";
        case 'temp3':
            return "rgb(139,187,86)";
        case 'temp2':
            return "rgb(148,196,50)";
        case 'temp1':
            return "rgb(136,230,89)";
        case "fire":
            return "rgb(255,0,0)";
        case "nail":
            return "rgb(10,10,10)";
        case "key":
            return "rgb(255,234,91)";
        case "harmer":
            return "rgb(203,221,228)";
        case "water":
            return "rgb(81,188,250)";
        case "score":
            return "rgb(95,91,173)";
        case "life":
            return "rgb(50,97,166)";
        default:
            return "rgb(255,255,255)";
    }
}