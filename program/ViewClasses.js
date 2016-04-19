// JavaScript source code
function Ball_view(sr, x0, y0) {

    // arguments
    this.sr = sr; // radius (world coordinate)
    this.x0 = x0; // init-x (world coordinate)
    this.y0 = y0; // init-y (world coordinate)

    // default fields and methods
    this.unit_sz = { x: 1 / 6, y: 1 / 6 };
    this.total_time = 2;
    this.traj = move_down_bounce;
    this.is_over = false;

    this.reset = function () {

        // position the sphere (world coordinate)
        this.unit_id = { x: ball.x, y: ball.y };
        this.obj.position.x = this.x0;
        this.obj.position.y = this.y0;
        this.obj.position.z = 0;
        this.obj.castShadow = true;
        this.traj = next_action();
        this.get_curr_pos();

        // maintain a time as field
        this.time = 0;
        this.is_restart = false;
        reset_bit = false;
    }

    // initialize Ball (world coordinate)
    this.init = function (scene) {

        // creat ball (world coordinate)
        var sphereGeometry = new THREE.SphereGeometry(this.sr, 10, 10);
        var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xE0FFFF });
        this.obj = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.reset();
        
        // add the sphere to the scene
        scene.add(this.obj);
    }

    this.get_curr_pos = function () {
        this.start_x = this.unit_id.x * this.unit_sz.x + 0.5 * this.unit_sz.x;
        this.start_y = this.unit_id.y * this.unit_sz.y + 0.5 * this.unit_sz.y;
    }

    // move ball (world coordinate)
    this.move = function (speed) {
        
        // check time value
        this.time += speed;
        if (this.time > this.total_time) {
            // update time
            this.time -= this.total_time;
            this.unit_id = curr_unit_id;
            // update current pos value
            this.get_curr_pos();
            // update action
            this.traj = next_action();
            // check game over
            [is_over, is_restart, x_val, y_val] = ball.check_game();
            // check if the game is already over. if yes, then this.is_over is true no matter what value of is_over is.
            this.is_over = this.is_over ? true : is_over;
            // check if restart
            this.is_restart = is_restart;
            // reset initial points
            var dot = screen2world({ x: x_val, y: y_val });
            this.x0 = dot.x;
            this.y0 = dot.y;
        }

        // calculate coordinate in world coordinate
        if (this.is_over) {
            this.obj.position.x = 0;
            this.obj.position.y = -23;
            return;
        }

        else if (!this.is_restart || this.time < 0.5 * this.total_time) {
            var screenDot = this.traj
                (this.time, this.start_x, this.start_y, this.total_time, this.unit_sz.x, this.unit_sz.y);
            var worldDot = screen2world(screenDot);
            curr_unit_id = screen2unitID(screenDot);
            // position ball
            this.obj.position.x = worldDot.x;
            this.obj.position.y = worldDot.y;
        } else {
            this.reset();
            reset_bit = true;
        }

    }

    this.circular = function (speed, r) {
        this.obj.position.x = this.x0 + r * Math.cos(this.time);
        this.obj.position.y = this.y0 + r * Math.sin(this.time);
        this.time += speed;
    }

}

function Cube_view(sx, sy, sz, x0, y0) {

    this.sx = sx; // x-size
    this.sy = sy; // y-size
    this.sz = sz;  // constant value
    this.x0 = x0; // init-x
    this.y0 = y0; // init-y

    // initialize MapUnit
    this.init = function () {

        // creat an unit
        var cubeGeometry = new THREE.CubeGeometry(this.sx, this.sy, this.sz);
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
        this.obj = new THREE.Mesh(cubeGeometry, cubeMaterial);
        this.obj.position.x = this.x0;
        this.obj.position.y = this.y0;
        this.obj.position.z = 0;
        this.obj.castShadow = true;
    }

    this.display = function (scene) {
        // add the cube to the scene
        scene.add(this.obj);
    }

    this.remove = function (scene) {
        // remove the cube to the scene
        scene.remove(this.obj);
    }

    this.rotate = function(speed) {
        this.obj.rotation.x += speed;
        this.obj.rotation.y += speed;
        this.obj.rotation.z += speed;
    }

}