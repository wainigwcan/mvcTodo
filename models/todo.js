var fs = require("fs");
var path = require("path");

//文件路径
var filepath = path.resolve(__dirname , "../db/db.js");

//【查】列出所有的todo。结果通过回调函数返回。
exports.allTodo = allTodo = function(callback){
	//path.resolve()表示只能合并路径。
	fs.readFile(filepath , function(err , data){
		callback(JSON.parse(data.toString()));
	});
}

//【增】增加Todo。思路是先读取所有的Todo，往数组中push一项，然后写文件
exports.addTodo = function(title , callback){
	//利用刚刚写好的allTodo函数读取所有todo
	allTodo(function(data){
		//遍历这个数组找最大的ID，为什么要找呢？因为我们的新Todo要为当前最大id+1
		var maxid = 0;
		for(var i = 0 ; i < data.length ; i++){
			if(data[i].id > maxid){
				maxid = data[i].id;
			}
		}
		//将data中push一项
		data.push({"id" : maxid + 1 , "title" : title , "done" : false});
		//写！
		fs.writeFile(filepath , JSON.stringify(data) , function(){
			callback();
		});
	});
}

//【删】思路是读取全部的数组，删除其中一项，然后写入文件
exports.removeTodo = function(id , callback){
	//利用刚刚写好的allTodo函数读取所有todo
	allTodo(function(data){
		//删除这个todo
		for(var i = 0 ; i < data.length ; i++){
			if(data[i].id == id){
				data.splice(i , 1);
			}
		}
		//写！
		fs.writeFile(filepath , JSON.stringify(data) , function(){
			callback();
		});
	});
}

//【改】思路是读取全部的数组，改变其中一项，写入
//k可能是title或者是done
exports.updateTodo = function(id , k , v , callback){
	//利用刚刚写好的allTodo函数读取所有todo
	allTodo(function(data){
		//改变这个todo，遍历所有todo看看哪个todo的id和你要改的id是一样的
		for(var i = 0 ; i < data.length ; i++){
			if(data[i].id == id){
				data[i][k] = v;
			}
		}
		//写！
		fs.writeFile(filepath , JSON.stringify(data) , function(){
			callback();
		});
	});
}

//【移】思路是读取全部的数组，交换其中两项，写入
exports.moveTodo = function(startidx , endidx , callback){
	allTodo(function(data){
		//改变这个todo，遍历所有todo看看哪个todo的id和你要改的id是一样的
		data.splice(endidx , 0 , data.splice(startidx , 1)[0]);
		//写！
		fs.writeFile(filepath , JSON.stringify(data) , function(){
			callback();
		});
	});
}