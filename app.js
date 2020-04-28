var express = require("express");
var app = express();

//引入控制器
var mainctrl = require("./controllers/mainctrl.js");
//静态化www文件夹
app.use(express.static("www"));

//罗列中间件
app.get("/todo"  		, mainctrl.showTodo);		//列出所有的todo
app.post("/todo" 		, mainctrl.addTodo);		//增加todo
app.delete("/todo/:id"  , mainctrl.removeTodo); 	//删除todo
app.patch("/todo/:id" 	, mainctrl.updateTodo); 	//更改todo
app.move("/todo" 		, mainctrl.moveTodo);		//更改TODO的顺序

//监听端口
app.listen(3000);
console.log("3000端口");