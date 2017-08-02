 function swiper3D(obj) {
            this.box = document.querySelector(obj),
                this.children = this.box.querySelectorAll('div'),
                this.count = this.children.length
            var x0, y0, quen, lock = 0,
                css = ['transform:translate3d(0,0,10px) scale3d(1,1,1);z-index:3;visibility:visible;','transform:translate3d(-100px,0,6px) scale3d(0.8,0.8,1);z-index:2;visibility:visible;','transform:translate3d(100px,0,6px) scale3d(0.8,0.8,1);z-index:2;visibility:visible;','transform:translate3d(-200px,0,2px) scale3d(0.667,0.667,1);z-index:1;visibility:visible;','transform:translate3d(200px,0,2px) scale3d(0.667,0.667,1);z-index:1;visibility:visible;'];
            var startT = function(e) {
                x0 = e.targetTouches[0].pageX;
                y0 = e.targetTouches[0].pageY;
                lock = 0;
            }.bind(this);
            var MoveT = function(e) {
                if (lock == 1) return;
                var x = e.targetTouches[0].pageX,
                    y = e.targetTouches[0].pageY,
                    offsetX = x - x0;
                if (offsetX >= 50) {
                    this.quen.unshift(this.quen.pop());
                    lock = 1;
                    swap();
                } else if (offsetX <= -50) {
                    this.quen.push(this.quen.shift());
                    lock = 1;
                    swap();
                }
            }.bind(this);
            var swap = function() {
                var count = this.count,
                    This = this,
                    quen = [].concat(This.quen),
                    last = count - 1,
                    NewList = new Array(count),
                    num = 0,
                    odd = 1;
//                console.log(quen);
                while (num < 5 && count > 0) {
                    NewList[odd ? quen.shift() : quen.pop()] = css[num++];
                    odd = !odd;
                }
                for (var i = 0; i < count; i++) {
//                    if (NewList[i] != this.quen[i]) {
//                        this.quen[i] = NewList[i];
                        this.children[i].style.cssText = NewList[i] || 'visibility: hidden';
//                    }
                }
//                console.log(NewList, quen,This.quen);
            }.bind(this);
            var createQ = function(len) {
                var attr = [];
                for (var i = 0; i < len; i++) {
                    attr[i] = i;
                }
                return attr;
            }
            this.init = function() {
                this.quen = function(len) {
                    var attr = [];
                    for (var i = 0; i < len; i++) {
                        attr[i] = i;
                    }
                    return attr;
                }(this.count);
                var s = this.quen;
                console.log(s)
                for (var i = 0; i < this.count; i++) {
                    this.children[i].style.visibility = 'hidden'
                };
                swap();
                list.addEventListener('touchstart', startT);
                list.addEventListener('touchmove', MoveT);
            };
            var list = document.querySelector(obj);
            list ? this.init() : console.log(obj + " undefined");
        }
