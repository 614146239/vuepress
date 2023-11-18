---
lang: zh-CN
title: canavs 案例
description: canavs 案例
---
# canavs 案例

## 小球边缘碰撞检测
  生成随机大小球，进行不规则移动，碰撞边缘改变移动方向
1.初始化
```js
 let canvas = document.createElement("canvas");
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    // canvas全屏
    let { innerWidth: width, innerHeight: height } = window;
    canvas.width = width;
    canvas.height = height;
    // 浏览器窗口变化重新初始化
    window.onresize = () => {
      let { innerWidth: width, innerHeight: height } = window;
      canvas.width = width;
      canvas.height = height;
    };
```
2.小球运动，清空画布，改变位置再次画，多帧形成小球运动，其次就是小球大小与浏览器边缘进行碰撞检测，并把运动方向取反

```js
   let ctx = canvas.getContext("2d");//获取上下文

    class Circle {
      constructor() {
        this.radius = (Math.random() + 0.5) * 50; //圆随机半径
        this.x = Math.random() * (width - this.radius * 2) + this.radius;//圆中心点，随机x点，不能出现圆球卡在边缘情况
        this.y = Math.random() * (height - this.radius * 2) + this.radius;//随机y点
        this.dx = Math.random() - 0.5 * 5; //x移动速度
        this.dy = Math.random() - 0.5 * 5;//y移动速度
        this.R = Math.floor(Math.random() * 255);//颜色
        this.G = Math.floor(Math.random() * 255);
        this.B = Math.floor(Math.random() * 255);
      }
      render() {
    //   x边界判断
        if (this.x > width - this.radius || this.x < 0 + this.radius) {
          this.dx = -this.dx;
        }
    //   y边界判断

        if (this.y > height - this.radius || this.y < 0 + this.radius) {
          this.dy = -this.dy;
        }
        // 圆球移动，改变圆球中心点位置
        this.x += this.dx;
        this.y += this.dy;
        ctx.beginPath();
        ctx.save();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);//画圆
        ctx.fillStyle = `rgb(${this.R},${this.G},${this.B})`;//填充颜色
        ctx.fill();
        ctx.restore();
        ctx.closePath();
      }
      move() {}
    }
    // 生成圆
    let circleArray = [];
    for (let index = 0; index < 100; index++) {
      let circle = new Circle();
      circleArray.push(circle);
    }
    // 更新圆
    function update() {
      ctx.clearRect(0, 0, width, height);//清空画布

      requestAnimationFrame(update);//重复画
      circleArray.forEach((item) => {
        item.render();//循环画圆，并判定边界
      });
    }
    update();
 ```

 ## 鼠标边缘范围内小球变大

 和上个案例查不多，小球更小，鼠标一定范围内小球会变大

 1. 获取鼠标位置
 ```js
     canvas.addEventListener(mousemove, (e) => {
    (mousePosition.x = e.offsetX), (mousePosition.y = e.offsetY);
  });
```

2.根据鼠标位置放大圆球

```js
  // 圆球半径放大检测距离
      this.range = 50;
      // 圆球最大值
      this.maxCircle = 50;
      this.minCircle = this.radius;

    //   鼠标与圆球距离判断，如果在范围内，每次更新半径+1
      if (
        mousePosition.x - this.x < this.range &&
        mousePosition.x - this.x > -this.range &&
        mousePosition.y - this.y < this.range &&
        mousePosition.y - this.y > -this.range
      ) {
        if (this.radius < this.maxCircle) {
          this.radius += 1;
          // this.x = mousePosition.x;
          // this.y = mousePosition.y;
        }
      } else if (this.radius > this.minCircle) {
        this.radius -= 1;
      }

```

## 多个小球碰撞检测
1. 创建Canvas元素并设置其宽度和高度与窗口大小相同。
2. 定义了一个Circle类，用于创建小球对象。每个小球具有随机的半径、位置、速度和颜色。
3. 定义了一个twoCircleDistance函数，用于计算两个小球之间的距离。
4. 定义了一个circleCollide函数，用于判断两个小球是否发生碰撞，并更新它们的速度和位置以避免重叠。
5. 在render方法中，每个小球根据其速度更新位置，并在Canvas上绘制出来。
6. 创建一个包含多个小球的数组circleArray，并使用循环生成一定数量的小球对象。
7. 在update函数中，清除Canvas并循环调用render方法来更新和渲染所有小球。
8. 最后，通过调用update函数启动动画效果。

此外，代码还包含了一些边界检测的逻辑，以确保小球在Canvas边界内移动，并且在小球之间发生碰撞时进行处理。
```js
  let canvas = document.createElement("canvas");
  let body = document.getElementsByTagName("body")[0];
  body.appendChild(canvas);
  let { innerWidth: width, innerHeight: height } = window;
  canvas.width = width;
  canvas.height = height;
  window.onresize = () => {
    let { innerWidth: width, innerHeight: height } = window;
    canvas.width = width;
    canvas.height = height;
  };
  // 两圆之间距离
  function twoCircleDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  // 两圆之间碰撞函数
  function circleCollide(ball, arrayBall) {
    // atan2 方法返回一个 -pi 到 pi 之间的数值，表示点 (x, y) 对应的偏移角度。
    // 这是一个逆时针角度，以弧度为单位，正 X 轴和点 (x, y) 与原点连线 之间。
    // 注意此函数接受的参数：先传递 y 坐标，然后是 x 坐标。

    // 判断两点间是否相撞
    if (
      twoCircleDistance(ball.x, ball.y, arrayBall.x, arrayBall.y) <
      ball.radius + arrayBall.radius
    ) {

      // 两点间绝对值
      // let xDistance = Math.abs(ball.x - arrayBall.x);
      // let yDistance = Math.abs(ball.y - arrayBall.y);

      // ball.dx = -ball.dx;
      // ball.dy = -ball.dy;

      // 计算碰撞后的速度
      let dx = arrayBall.x - ball.x;
      let dy = arrayBall.y - ball.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let nx = dx / distance;
      let ny = dy / distance;
      let p = 2 * (ball.dx * nx + ball.dy * ny - arrayBall.dx * nx - arrayBall.dy * ny) / (ball.radius + arrayBall.radius);
      ball.dx = ball.dx - p * arrayBall.radius * nx;
      ball.dy = ball.dy - p * arrayBall.radius * ny;
      arrayBall.dx = arrayBall.dx + p * ball.radius * nx;
      arrayBall.dy = arrayBall.dy + p * ball.radius * ny;

      // 更新小球的位置，使其不重叠
      let overlap = ball.radius + arrayBall.radius - twoCircleDistance(ball.x, ball.y, arrayBall.x, arrayBall.y);
      let offsetX = overlap * (ball.x - arrayBall.x) / twoCircleDistance(ball.x, ball.y, arrayBall.x, arrayBall.y);
      let offsetY = overlap * (ball.y - arrayBall.y) / twoCircleDistance(ball.x, ball.y, arrayBall.x, arrayBall.y);
      ball.x += offsetX;
      ball.y += offsetY;
      arrayBall.x -= offsetX;
      arrayBall.y -= offsetY;


    }
  }
  // 类
  let ctx = canvas.getContext("2d");
  class Circle {
    constructor() {
      this.radius = (Math.random() + 0.5) * 25;
      this.x = Math.random() * (width - this.radius * 2) + this.radius;
      this.y = Math.random() * (height - this.radius * 2) + this.radius;
      this.dx = Math.random() - 0.5 * 5;
      this.dy = Math.random() - 0.5 * 5;
      this.color = `rgb(
        ${Math.floor(Math.random() * 254) + 1},
       ${Math.floor(Math.random() * 254) + 1},
       ${Math.floor(Math.random() * 254) + 1}
      )`;
      //  记录小球重叠更新次数
      this.count = 0;
    }
    // 渲染更新函数
    render() {
      if (this.x + this.radius > width) {
        this.x = width - this.radius;
        this.dx = -this.dx;
      } else if (this.x < this.radius) {
        this.x = this.radius;
        this.dx = -this.dx;
      }
      if (this.y + this.radius > height) {
        this.y = height - this.radius;
        this.dy = -this.dy;
      } else if (this.y < this.radius) {
        this.y = this.radius;
        this.dy = -this.dy;
      }
      // 判断是否相撞
      if (circleArray.length) {
        for (let i = 0; i < circleArray.length; i++) {
          if (this == circleArray[i]) continue;
          circleCollide(this, circleArray[i]);
        }
      }

      this.x += this.dx;
      this.y += this.dy;
      ctx.beginPath();
      ctx.save();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
      ctx.closePath();
    }
  }
  // 生成圆
  let circleArray = [];
  for (let index = 0; index < 100; index++) {
    let circle = new Circle();

    if (circleArray.length > 0) {
      for (let index = 0; index < circleArray.length; index++) {
        if (
          twoCircleDistance(
            circle.x,
            circle.y,
            circleArray[index].x,
            circleArray[index].y
          ) <=
          circleArray[index].radius + circle.radius
        ) {
          //
          this.count++;
          circle.x =
            Math.random() * (width - circle.radius * 2) + circle.radius;
          circle.y =
            Math.random() * (height - circle.radius * 2) + circle.radius;
          // 小球面积大于屏幕面积会死循环

          index = -1;
        }
      }
    }

    circleArray.push(circle);
  }
  // 更新圆
  function update() {
    ctx.clearRect(0, 0, width, height);
    requestAnimationFrame(update);
    circleArray.forEach((item) => {
      item.render();
    });
  }
  update();

  //
  function rotate(velocaity, angle) {
    const rotateVelocity = {
      x: velocaity * x * Math.cos(angle) - velocaity * y * Math.cos(angle),
      y: velocaity * x * Math.cos(angle) - velocaity * y * Math.cos(angle),
    };
    return rotateVelocity;
  }

```

## 小球重力

