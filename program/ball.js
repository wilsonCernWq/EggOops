// 
function Ball(m) {

    m = typeof m !== 'undefined' ? m : NULL;

	// status initialization
    this.level = 1;
	this.score = 0;
	this.life = 3;
	this.toolbox = {
	    water: 0,
	    harmer: 0,
	    key: 10
	};

	this.map = m;

	// = move;
	//this.go_up = go_up;
	//this.go_down = go_down;
	//this.go_left = go_left;
	//this.go_right = go_right;
	//this.collect_item = collect_item;
	//this.check_game = check_game;
	//this.init = init;

	this.init = function () {
	    this.x = this.map.startx;
	    this.y = this.map.starty;
	    this.current_dir = 'up';
	    this.is_killed = false;
	};

	this.move = function () {
	    console.log(this.x+' '+this.y);
		if (this.y>=0)
		{
	    	this.collect_item(this.map.content[this.x][this.y].center);
	    	this.map.content[this.x][this.y].center = 'empty';
	    }
	    if (this.current_dir == 'up') {
	        switch (next_dir) {
	            case 'up':
	                return this.go_up();

	            case 'left':
	                return this.go_left();

	            case 'right':
	                return this.go_right();

	            default:
	                return this.go_down();
	        }
	    }
	    else {
	        return this.go_down();
	    }
	};

	this.go_up = function () {
	    var i = this.x;
	    var j = this.y + 1;

	    if (this.y >= 5) {
	        this.current_dir = 'down';
	        return this.go_down();
	    }

	    else if (this.map.content[this.x][this.y + 1].bottom == "empty") {
	        this.current_dir = 'up';
	        this.y++;
	        return 'up';
	    }
	    else {
	        this.current_dir = 'down';
	        return this.go_down();
	    }
	};
	
	this.go_down = function () {
	    switch (this.map.content[this.x][this.y].bottom) {
	        case 'empty':
	            this.current_dir = 'down';
	            this.y--;
	            return 'down';

	        case 'normal':
	            this.current_dir = 'up';
	            return 'down_bounce';

	        case 'tilt_left':
	            return this.go_left();

	        case 'tilt_right':
	            return this.go_right();

	        case 'temp1':
	            this.map.content[this.x][this.y].bottom = 'empty';
	            this.current_dir = 'up';
	            return 'down_bounce';

	        case 'temp2':
	            this.map.content[this.x][this.y].bottom = 'temp1';
	            this.current_dir = 'up';
	            return 'down_bounce';

	        case 'temp3':
	            this.map.content[this.x][this.y].bottom = 'temp2';
	            this.current_dir = 'up';
	            return 'down_bounce';

	        case 'fire':
	            if (this.toolbox.water > 0) {
	                this.toolbox.water--;
	                this.map.content[this.x][this.y].bottom = 'normal';
	                this.current_dir = 'up';
	                return 'down_bounce';
	            }
	            else {
	                this.is_killed = true;
	                return 'down_bounce';
	            }

	        case 'nail':
	            this.is_killed = true;
	            return 'down_bounce';

	        default:
	            this.current_dir = 'down';
	            return 'down_bounce';
	    }
	};

	this.go_left = function () {
	    if (this.x <= 0) {
	        this.current_dir = 'down';
	        return 'left_bounce';
	    }
	    switch (this.map.content[this.x - 1][this.y].right) {
	        case 'normal':
	            this.current_dir = 'down';
	            return 'left_bounce';

	        case 'temp1':
	            if (this.toolbox.key) {
	                this.toolbox.key--;
	                this.map.content[this.x - 1][this.y].right = 'empty';
	            }
	            this.current_dir = 'down';
	            return 'left_bounce';

	        case 'temp2':
	            if (this.toolbox.key) {
	                this.toolbox.key--;
	                this.map.content[this.x - 1][this.y].right = 'temp1';
	            }
	            this.current_dir = 'down';
	            return 'left_bounce';

	        case 'temp3':
	            if (this.toolbox.key) {
	                this.toolbox.key--;
	                this.map.content[this.x - 1][this.y].right = 'temp2';
	            }
	            this.current_dir = 'down';
	            return 'left_bounce';

	        default:
	            this.x--;
	            this.current_dir = 'down';
	            return 'left';
	    }
	};

	this.go_right = function () {
	    if (this.x >= 5 || this.map.content[this.x][this.y].right == 'normal') {
	        this.current_dir = 'down';
	        return 'right_bounce'
	    }
	    if (this.map.content[this.x][this.y].right == 'temp1') {
	        if (this.toolbox.key > 0) {
	            this.toolbox.key--;
	            this.map.content[this.x][this.y].right = 'empty';
	        }
	        this.current_dir = 'down';
	        return 'right_bounce';
	    }
	    if (this.map.content[this.x][this.y].right == 'temp2') {
	        if (this.toolbox.key > 0) {
	            this.toolbox.key--;
	            this.map.content[this.x][this.y].right = 'temp1';
	        }
	        this.current_dir = 'down';
	        return 'right_bounce';
	    }
	    if (this.map.content[this.x][this.y].right == 'temp3') {
	        if (this.toolbox.key > 0) {
	            this.toolbox.key--;
	            this.map.content[this.x][this.y].right = 'temp2';
	        }
	        this.current_dir = 'down';
	        return 'right_bounce';
	    }
	    else {
	        this.current_dir = 'down';
	        this.x++;
	        return 'right';
	    }
	};

	this.collect_item = function (item) {
	    switch (item) {
	        case 'life':
	            ++this.life;
	            break;
	        case 'score':
	            this.score += 100;
	            break;
	        case 'water':
	            this.toolbox.water++;
	            break;
	        case 'harmer':
	            this.toolbox.harmer++;
	            break;
	        case 'key':
	            this.toolbox.key++;
	            break;
	        default:
	            break;
	    }
	};

	this.check_game= function () {
	    var is_over = false;
	    var is_restart = false;
	    var x_val = 0;
	    var y_val = 0;
	    var is_exit = 0;
	    if (is_cross_pressed || this.y < 0 || this.is_killed) {
	        this.life--;
	        is_cross_pressed = false;
	        if (this.life <= 0) {
	            is_over = true;
	            is_restart = false;
	        }
	        else {
	            is_over = false;
	            is_restart = true;
	            x_val = this.map.startx;
	            y_val = this.map.starty;
	            this.init();
	            this.map.init();
	        }
	    }
	    else if(this.x==this.map.exitx&&this.y==this.map.exity)
	    {
	    	is_over = false;
	    	is_restart = true;
	    	if (this.level<3)
	    		this.level++;
	    	else
	    		this.level = 1;
	    	this.map.next_level();
	    	this.init();
	    }
	    return [is_over, is_restart, x_val, y_val];
	};
}