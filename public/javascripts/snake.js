new Vue({
    el: '#app',
    data: {
        N:32,
        map:[],
        snake:[],
        head:{},
        snakeLen:3,
        direct: 1,
        directOpe:[
            {
                x:-1,
                y:0,
            },
            {
                x:0,
                y:1,
            },
            {
                x:1,
                y:0,
            },
            {
                x:0,
                y:-1,
            },
        ],
        clock:null,
    },
    methods: {
        initialMap() {
            let N = this.N
            for (let i = 0; i < N; i++) {
                this.map[i] = []
                for (let j = 0; j < N; j++) {
                    let tmp = {
                        x: i,
                        y: j,
                        danger: false,
                        bonus: false,
                        snake: 0,
                    }

                    if (i==0 || j==0 || i==(N-1) || j == (N-1)) {
                        tmp.danger = true
                    }

                    this.map[i][j] = tmp
                }
            }

            this.map[1][1].snake = 3
            this.map[1][2].snake = 2
            this.map[1][3].snake = 1
            this.map[1][1].danger = true
            this.map[1][2].danger = true
            this.map[1][3].danger = true

            this.head = this.map[1][3]

            for (let i = 0; i < this.snakeLen; i++) {
                this.snake[0] =  this.map[1][1]
                this.snake[1] =  this.map[1][2]
                this.snake[2] =  this.map[1][3]
            }
        },
        onEnter(d){
            console.log(d)

            if((this.direct+d)%2==0){
                this.$notify({
                    title: 'go back???',
                    message: '...'
                  });

                return
            }

            this.direct=d

        },
        gogo() {
            this.head = this.map[this.head.x+this.directOpe[this.direct].x][this.head.y+this.directOpe[this.direct].y]

            if (this.head.danger) {

                window.clearInterval(this.clock)

                this.$notify({
                    title: 'GAME OVER',
                    message: '...'
                  });

                return
            }

            this.head.snake = 1
            this.head.danger = true

            for (let i = 0; i < this.snakeLen; i++) {
                this.snake[i].snake = (this.snake[i].snake+1)%(this.snakeLen+1)
            }

            if (this.head.bonus) {
                this.snakeLen++
                this.head.bonus = false
                this.snake.push(this.head)
                this.randBonus()
            }else{
                let out = this.snake.shift()
                out.danger = false
                out.snake = 0
                this.snake.push(this.head)
            }

        }, 
        randBonus() {
            let i = this.randInt(1, this.N-2)
            let j = this.randInt(1, this.N-2)

            this.map[i][j].bonus = true
        },
        randInt(min, max) {
            return Math.round( Math.random() * (max - min) + min);
        }
    },
    created() {
        
        this.initialMap()

        this.randBonus()

        let _this = this
        this.clock = setInterval(function(){
            _this.gogo()
            console.log("gogo()")
        },100)

        document.onkeydown = function(e){

            let _key = window.event.keyCode;
            switch (_key) {
                case 38:
                    _this.onEnter(0)
                    break;
                case 39:
                    _this.onEnter(1)
                    break;
                case 40:
                    _this.onEnter(2)
                    break;
                case 37:
                    _this.onEnter(3)
                    break;
            
                default:
                    break;
            }
        }

    }
  })