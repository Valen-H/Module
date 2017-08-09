var t = [], crd = [], tick = function(){}, tmp = this;
module = true;
X = innerWidth;
Y = innerHeight;
Xx = screen.width;
Yy = screen.height;
Dif = Xx>Yy?Yy:Xx;
dif = X>Y?Y:X;
doc = document;
loc = location;
csl = console;
Win = this;
auto = true;
Sec = Millis = millis = 0;
alph = "abcdefghijklmnopqrtsuvwxyz";
ALPH = alph.toUpperCase().split();
Alph = (alph+"0123456789").split();
online = navigator.onLine;
prefix = ["moz","webkit","o","ms","khtml","ie"];
mobile = /android|iphone|ipod|ipad|tablet|smartphone|ios/gmi.test(UA=navigator.userAgent);
addEventListener("resize",rel);
addEventListener("load",rel);
addEventListener("online",rel);
addEventListener("offline",rel);
addEventListener("load",function tick() {
	var remlist = [];
	ele("node").forEach(function(val) {
		val.innerHTML = eval(val.getAttribute("data-func").replace("this","val"));
		if (val.getAttribute("data-del")) {
			remlist.push(val);
		}
	});
	remlist.forEach(rem);
	setTimeout(tick,1);
	if(Sec++%100) {
		rel();
	}
});
function rel() {
	if (auto) {
		X = innerWidth;
		Y = innerHeight;
		dif = X>Y?Y:X;
		online = navigator.onLine;
		body = doc.body;
		head = doc.head;
	}
}//rel
function Cor(e) {
	if (!e) {
		ele("#corcor").style.display = "none";
		return;
	}
	if (e.touches) {
		crd = [e.touches[e.touches.length-1].clientX,e.touches[e.touches.length-1].clientY];
	} else {
		crd = [e.clientX,e.clientY];
	}
	if (ele("#corcor")&&(e.type=="mousemove"||e.type=="touchmove")) {
		e.preventDefault();
	}
	if (e.type=="touchstart"||e.type=="mousedown") {
		Millis = millis = 0;
		t = setInterval(function() {
			Millis += 1;
			millis += 1;
		},1);
	} else if (e.type=="touchend"||e.type=="mouseup") {
		clearInterval(t);
	} else if (e.type=="touchmove"||e.type=="mousemove") {
		millis = 0;
	}
}//cor
addEventListener("touchstart",Cor);
addEventListener("touchmove",Cor);
addEventListener("mousedown",Cor);
addEventListener("mousemove",Cor);
function win(comm) {
	Win = comm=comm?comm:Win;
	dat = doc.documentElement.outerHTML;
	return eval(comm);
}//win
function act(elem,mode) {
	if (!elem) {
		act(doc.head);
		act(ele());
		return;
	} else if (typeof elem==="string"&&!/(\$|#|%|&)/gmi.test(elem.toString())) {
		elem = ele(elem);
		if (elem.length!==undefined&&/Node|,/gmi.test(elem.toString())) {
			mas("act(@)",elem);
			return;
		}
	} else if (/(\$|#|%|&)/gmi.test(elem.toString())) {
		act(doc.head,elem);
		act(ele(),elem);
		return;
	}
	mode = mode===undefined?"#$%":mode;
	var pat;
	if (/\$/gmi.test(mode)&&(pat=elem.innerHTML.match(/\${2}(.|\n)*?\${2}/gmi))) {
		for (var stp = 0; stp < pat.length; stp++) {
			elem.innerHTML = elem.innerHTML.replace(pat[stp],"<node data-func=\""+pat[stp].replace(/(^\${2}|\${2}$)/gmi,"")+"\"></node>");
		}
	}
	if (/%/gmi.test(mode)&&(pat=elem.innerHTML.match(/%{2}(.|\n)*?%{2}/gmi))) {
		for (var stp = 0; stp < pat.length; stp++) {
			elem.innerHTML = elem.innerHTML.replace(pat[stp],eval(pat[stp].replace(/(^%{2}|%{2}$)/gmi,"")));
		}
	}
	if (/#/gmi.test(mode)&&(pat=elem.innerHTML.match(/#{2}(.|\n)*?#{2}/gmi))) {
		for (var stp = 0; stp < pat.length; stp++) {
			elem.innerHTML = elem.innerHTML.replace(pat[stp],"");
			eval(pat[stp].replace(/(^#{2}|#{2}$)/gmi,""));
		}
	}
	if (/&/gmi.test(mode)&&(pat=elem.innerHTML.match(/&{2}(.|\n)*?&{2}/gmi))) {
		for (var stp = 0; stp < pat.length; stp++) {
			var rep = pat[stp].replace(/&(?!\\(?!\\))/gmi,"");
			prefix.forEach(function(val) {
				rep += pat[stp].replace(/(^&{2}|&{2}$)/gmi,"").replace(/&(?!\\(?!\\))/gmi,"-"+val+"-");
			});
			elem.innerHTML = elem.innerHTML.replace(pat[stp],rep);
		}
	}
}//act
HTMLElement.prototype.act = String.prototype.act = function(mode) {
	mode = mode?mode:"$%#";
	if (typeof this=="string"||this instanceof String) {
		if (/(#|\$|%|&)/gmi.test(this)) {
			act(mode,this);
		} else {
			act(this,mode);
		}
		return;
	}
	act(this,mode?mode:"$%#");
};
Array.prototype.act = NodeList.prototype.act = function(mode) {
	this.forEach(function(val) {
		act(val,mode?mode:"$%#");
	});
};
function ele(val,bl,comm,pr) {
	var com;
	if (!bl) {
		bl = doc;
	} else if (typeof bl=="string") {
		bl = ele(bl);
		if (bl.length!==undefined&&/Node|,/gmi.test(bl.toString())) {
			var nar = [];
			bl.forEach(function(va) {
				nar.push(ele(val,va,comm));
			});
			return nar;
		}
	}
	if (val===undefined) {
		return bl.body;
	} else if (!val) {
		val = "*[0]";
	} else if (val.match(/,(?!\\(?!\\))/)) {
		val = val.split(",");
		com = [];
		for (var stp = 0; stp < val.length; stp++) {
			com.push(ele(val[stp],bl));
		}
		return com;
	}
	var bo = true;
	par = val.match(/^(.|\.|#| |\*)(?!\\(?!\\)).*?(?=(#|\.| |$|\*|,)(?!\\(?!\\)))/mi)[0];
	if (par.match(/\[(?!\\(?!\\)).*?-(?!\\(?!\\)).*?\](?!\\(?!\\))/gmi)&&!pr) {
		com = [];
		var ind = par.match(/\[.*?\]/mi)[0].replace(/(\[|\])(?!\\(?!\\))/gmi,"").split("-");
		par = par.replace(/\[.*?\]/mi,"");
		for (var stp = 0; stp < ind.length; stp++) {
			com = com.concat(ele(par+"["+ind[stp]+"]"));
		}
		return com;
	}
	if (par.match(/^#(?!\\(?!\\))/gmi)&&!pr) {
		com = bl.getElementById(par.replace(/^#(?!\\)/mi,""));
	} else if (par.match(/^\.(?!\\(?!\\))/mi)&&!pr) {
		if (par.match(/\[(?!\\(?!\\))\d+?(?=\](?!\\(?!\\)))/mi)) {
			com = bl.getElementsByClassName(par.replace(/(^\.|\[(?!\\(?!\\)).+?\])(?!\\(?!\\))/gmi,""))[Number(par.match(/\[(?!\\(?!\\))\d+?(?=\](?!\\(?!\\)))/mi)[0].replace(/^\[(?!\\(?!\\))/mi,""))];
		} else {
			bo = false;
			com = bl.getElementsByClassName(par.replace(/^\.(?!\\(?!\\))/mi,""));
		}
	} else if (par.match(/^\*(?!\\(?!\\))/)&&!pr) {
		if (par.match(/\[(?!\\(?!\\))\d+?(?=\](?!\\(?!\\)))/gmi)) {
			com = bl.childNodes[Number(par.match(/\[(?!\\(?!\\))\d+?(?=\](?!\\(?!\\)))/mi)[0].replace(/^\[(?!\\(?!\\))/mi,""))];
		} else {
			bo = false;
			com = bl.childNodes;
		}
	} else if (par.match(/^( (?!(\\|[<>+*~:]|\[|\])(?!\\)))?/mi)&&!pr) {
		if (par.match(/\[(?!\\(?!\\))\d+?(?=\](?!\\(?!\\)))/mi)) {
			com = bl.getElementsByTagName(par.replace(/(^ |\[(?!\\(?!\\)).+?\])(?!\\(?!\\))/gmi,""))[Number(par.match(/\[(?!\\(?!\\))\d+?(?=\](?!\\(?!\\)))/mi)[0].replace(/^\[(?!\\(?!\\))/mi,""))];
		} else {
			bo = false;
			com = bl.getElementsByTagName(par.replace(/^( (?!\\(?!\\)))?/mi,""));
		}
	} else if (par.match(/^@(?!\\(?!\\))/gmi)&&!pr) {
		if (par.match(/\[(?!\\(?!\\))\d+?(?=\](?!\\(?!\\)))/gmi)) {
			com = bl.getElementsByName(par.replace(/^@(?!\\(?!\\))/mi,""))[Number(par.match(/\[(?!\\(?!\\))\d+?(?=\](?!\\(?!\\)))/mi)[0].replace(/^\[(?!\\(?!\\))/mi,""))];
		} else {
			bo = false;
			com = bl.getElementsByName(par.replace(/^@(?!\\(?!\\))/mi,""));
		}
	} else {
		com = bl.querySelectorAll(val);
		bo = false;
		par = val;
	}
	if (val.replace(par,"")!="") {
		if (bo) {
			com = ele(val.replace(par,""),com);
		} else {
			var con = [];
			for (var mat = 0; mat < com.length; mat++) {
				con.push(ele(val.replace(par,""),com[mat]));
			}
			com = cmp(con).filter(function(n){return n!==undefined;});
		}
	}
	if ((!bo)&&comm) {
		com = cmp(com).filter(function(n){return eval(comm.replace(/@(?!\\(?!\\))/gmi,"n").replace(/\\(?!\\(?!\\))/gmi,""));});
	} else if (!bo) {
		com = cmp(com);
	}
	return com;
}//ele
String.prototype.ele = HTMLElement.prototype.ele = function(val,bl,com) {
	return ele(val,!bl&&com?this:bl,com);
};
Array.prototype.ele = NodeList.prototype.ele = function(val,com) {
	var nar = [];
	this.forEach(function(va) {
		nar = nar.concat(ele(val,va,com));
	});
	return nar;
};
function mas(pat,arr,cond) {
	if (cond===undefined) {
		cond = "true";
	}
	if (typeof arr!="object"||arr.length===undefined) {
		arr = [arr];
	}
	var ret = [];
	for (var mat = 0; mat < arr.length; mat++) {
		if (eval(cond.replace(/@(?!\\(?!\\))/gmi,"arr[mat]"))) {
			ret[mat] = eval(pat.replace(/@(?!\\(?!\\))/gmi,"arr[mat]").replace(/\\(?!\\(?!\\))/gmi,""));
		}
	}
	return ret;
}//mas
Array.prototype.mas = NodeList.prototype.mas = function(pat,cond) {
	return mas(pat,this,cond);
};
//deprecated?
function cmp(arr) {
	var nar = [];
	for (var mat = 0; mat < arr.length; mat++) {
		if (arr[mat]) {
			if (typeof arr[mat]!=="object"||arr[mat].length===undefined) {
				nar = nar.concat(arr[mat]);
			} else {
				nar = nar.concat(cmp(arr[mat]));
			}
		}
	}
	return nar;
}//cmp
Array.prototype.cmp = function() {
	return cmp(this);
};
function dbg(tr) {
	if (tr===undefined) {
		tr = !ele("#dbgdbg");
	}
	if (ele("#dbgdbg")) {
		doc.body.removeChild(ele("#dbgdbg"));
	}
	if (!tr) {
		return;
	}
	tr = crt("button");
	tr.style.position = "fixed";
	tr.style.top = tr.style.left = "8%";
	tr.innerHTML = "Debug";
	tr.style.zIndex = 10000;
	tr.id = "dbgdbg";
	tr.onclick = function() {
		eval("try{"+prompt("Run Command ( hlp() )")+"}catch(E){alert(E);}");
	};
}//dbg
function cor(tr,d) {
	if (tr===undefined) {
		tr = !ele("#corcor");
	}
	if (ele("#corcor")&&!tr) {
		ele().removeChild(ele("#corcor"));
		return;
	}
	if (tr&&!ele("#corcor")) {
		tr = ele().appendChild(doc.createElement("coord"));
		tr.style.borderRadius = "50%";
		tr.style.backgroundColor = "blue";
		tr.style.position = "absolute";
		tr.style.pointerEvents = "none";
		tr.style.zIndex = "10000";
		tr.style.opacity = .6;
		tr.style.display = d?"none":"inline-block";
		tr.id = "corcor";
		var T = setInterval(function() {
			if (ele("#corcor")) {
				ele("#corcor").innerHTML = crd;
				ele("#corcor").style.top = crd[1]+5+"px";
				ele("#corcor").style.left = crd[0]+5+"px";
			} else {
				clearInterval(T);
			}
		},1);
	}
}//cor
function src(elem) {
	if (elem===undefined) {
		elem = doc.documentElement;
	}
	if (typeof elem==="string") {
		elem = ele(elem);
		if (elem.length!==undefined&&/Node|,/gmi.test(elem.toString())) {
			console.warn("Error (Lists prohibited) :\n\n"+elem);
			return;
		}
	}
	if (!ele("#srcsrc")) {
		doc.write("<textarea id='srcsrc' style='position:fixed;top:0%;left:0%;width:100%;height:100%;resize:none;' noresize>"+elem.outerHTML+"</textarea>");
		doc.close();
		dbg(true);
		ele("#dbgdbg").innerHTML = "Back";
		ele("#dbgdbg").onclick = function() {
			src(false);
		};
	} else {
		doc.write(ele("#srcsrc").value);
		doc.close();
		dbg(true);
	}
}//src
HTMLElement.prototype.src = String.prototype.src = function() {
	return src(this);
};
function xtr(elem,typ) {
	elem = !elem?doc.documentElement:elem;
	if (typeof elem=="string") {
		elem = ele(elem);
		if (elem.length!==undefined&&/Node|,/gmi.test(elem.toString())) {
			console.warn("Error (Lists prohibited) :\n\n"+elem);
			return;
		}
	}
	if (!typ) {
		mas("clearInterval(@)",t);
		mas("doc.write([@,'<br>-----------<br>'].join(''))",mas("@.replace(/(src|href)=(\"|\')?/gmi,'')",elem.outerHTML.match(/(src|href)=(\"|\')?.+?(?=(\"|\'|( *?)?\>))/gmi)));
		doc.close();
		dbg(true);
		ele("#dbgdbg").innerHTML = "Reload";
		ele("#dbgdbg").onclick = function() {
			loc.reload();
		};
	} else {
		return elem.outerHTML.match(/(src|href)=(\"|\')?.+?(?=(\"|\'|( *?)?\>))/gmi);
	}
}//xtr
HTMLElement.prototype.xtr = String.prototype.xtr = function(typ) {
	return xtr(this,typ);
};
function mul(elem,comm) {
	comm = comm?comm:"";
	if (typeof elem=="string") {
		elem = ele(elem);
		if (elem.length!==undefined&&/Node|,/gmi.test(elem.toString())) {
			elem.forEach(function(val) {
				mul(val,comm);
			});
			return;
		}
	} else if (elem===undefined) {
		elem = ele();
	}
	if (/;+/m.test(comm)) {
		for (var stp = 0; stp < comm.split(";").length; stp++) {
			mul(elem,comm.split(";")[stp]);
		}
		return;
	}
	eval("elem.style."+comm.replace("@",""));
	for (var stp = 0; stp < prefix.length; stp++) {
		eval("elem.style."+prefix[stp]+comm.charAt(0).toUpperCase()+comm.replace(/^./gmi,"").replace(/@(?!\\(?!\\))/gmi,"-"+prefix[stp]+"-").replace(/\\(?!\\)/gmi,""));
	}
}//mul
NodeList.prototype.mul = Array.prototype.mul = String.prototype.mul = HTMLElement.prototype.mul = function(comm) {
	mul(this,comm);
};
function tog(elem,milli,init,comm) {
	elem = elem?elem:ele();
	if (typeof elem=="string"||!elem.getAttribute) {
		elem = ele(elem);
	}
	if (elem.length!==undefined&&/Node|,/gmi.test(elem.toString())) {
		elem.forEach(function(val) {
			tog(val,milli,init,comm);
		});
		return;
	}
	if (!elem.getAttribute("data-tog")) {
		comm = comm?comm:"";
		var op = Number(elem.style.opacity=!elem.style.opacity?1:elem.style.opacity);
		milli = milli?milli:1;
		init = init!==undefined?init:(100-100*Math.round(elem.style.opacity));
		init = per(init,1);
		elem.setAttribute("data-tog",true);
		var t = setInterval(function() {
			elem.style.opacity = op+=(init-elem.style.opacity)/milli;
			if (init>=elem.style.opacity) {
				milli -= milli/1000;
			} else {
				milli += milli/2000;
			}
			if (elem.style.opacity<=.01) {
				elem.style.opacity = 0;
				elem.style.display = "none";
			} else if (elem.style.opacity>=.99) {
				elem.style.opacity = 1;
			} else {
				elem.style.display = "";
			}
			if (elem.style.opacity>=init-.01&&elem.style.opacity<=init+.01) {
				elem.style.opacity = init;
				elem.removeAttribute("data-tog");
				eval(comm);
				clearInterval(t);
			}
		},1);
	}
}//tog
NodeList.prototype.tog = Array.prototype.tog = String.prototype.tog = HTMLElement.prototype.tog = function(milli,init,comm,cust) {
	tog(!cust?this:milli,!cust?milli:init,!cust?init:comm,!cust?comm:cust);
};
function exp(elem,milli,init,comm) {
	elem = elem?elem:ele();
	if (typeof elem=="string"||!elem.getAttribute) {
		elem = ele(elem);
	}
	if (elem.length!==undefined&&/Node|,/gmi.test(elem.toString())) {
		elem.forEach(function(val) {
			exp(val,milli,init,comm);
		});
		return;
	}
	if (!elem.getAttribute("data-exp")) {
		var size = [/px/gm.test(elem.style.width)?elem.style.width.match(/^.+?(?=px)/gm)[0]:elem.offsetWidth,/px/gm.test(elem.style.height)?elem.style.height.match(/^.+?(?=px)/gm)[0]:elem.offsetHeight];
		elem.style.width = size[0]+"px";
		elem.style.height = size[1]+"px";
		milli = milli?milli:.8;
		init = init===undefined?size:[init[0],init[1]];
		if (elem.style.display=="none") {
			elem.style.width = elem.style.height = "";
		}
		elem.setAttribute("data-exp",true);
		var t = setInterval(function() {
			elem.style.width = (size[0]-=(size[0]-init[0])/milli)+"px";
			elem.style.height = (size[1]-=(size[1]-init[1])/milli)+"px";
			if (size[0]-init[0]>0&&size[1]-init[1]>0) {
				milli += milli/600;
			} else {
				milli -= milli/500;
			}
			if (size[0]<2||size[1]<2) {
				elem.style.display = "none";
			} else if (elem.style.display=="none") {
				elem.style.display = "";
			}
			if (size[0]-init[0]<=2&&size[0]-init[0]>=-2&&size[1]-init[1]<=2&&size[1]-init[1]>=-2) {
				elem.style.width = init[0]+"px";
				elem.style.height = init[1]+"px";
				elem.removeAttribute("data-exp")
				eval(comm);
				clearInterval(t);
			}
		},1);
	}
}//exp
NodeList.prototype.exp = Array.prototype.exp = String.prototype.exp = HTMLElement.prototype.exp = function(milli,init,comm,cust) {
	exp(!cust?this:milli,!cust?milli:init,!cust?init:comm,!cust?comm:cust);
};
function tra(elem,milli,init,comm) {
	elem = elem?elem:ele();
	if (typeof elem=="string"||!elem.getAttribute) {
		elem = ele(elem);
	}
	if (elem.length!==undefined&&/Node|,/gmi.test(elem.toString())) {
		elem.forEach(function(val) {
			tra(val,milli,init,comm);
		});
		return;
	}
	if (!elem.getAttribute("data-tra")) {
		if (!/absolute|fixed/.test(elem.style.position)) {
			elem.style.position = "absolute";
		}
		var pos = [/px/gm.test(elem.style.left)?elem.style.left.match(/^.+?(?=px)/gm)[0]:elem.offsetLeft,/px/gm.test(elem.style.top)?elem.style.top.match(/^.+?(?=px)/gm)[0]:elem.offsetTop];
		elem.style.left = pos[0]+"px";
		elem.style.top = pos[1]+"px";
		milli = milli?milli:.5;
		init = init===undefined?pos:[init[0],init[1]];
		elem.setAttribute("data-tra",true);
		var t = setInterval(function() {
			elem.style.left = (pos[0]-=(pos[0]-init[0])/milli)+"px";
			elem.style.top = (pos[1]-=(pos[1]-init[1])/milli)+"px";
			milli += milli/20000;
			if (pos[0]-init[0]<=1&&pos[0]-init[0]>=-1&&pos[1]-init[1]<=1&&pos[1]-init[1]>=-1) {
				elem.style.left = init[0]+"px";
				elem.style.top = init[1]+"px";
				elem.removeAttribute("data-tra");
				eval(comm);
				clearInterval(t);
			}
		},1);
	}
}//tra
NodeList.prototype.tra = Array.prototype.tra = String.prototype.tra = HTMLElement.prototype.tra = function(milli,init,comm,cust) {
	tra(!cust?this:milli,!cust?milli:init,!cust?init:comm,!cust?comm:cust);
};
function rnd(frm,to,rd) {
	if (frm===undefined) {
		return "#"+Math.round(Math.random()*16777215).toString(16);
	} else {
		to = to===undefined?frm:to;
		frm = frm==to?0:frm;
		var tmp = [Math.min(frm,to),Math.max(frm,to)];
		frm = tmp[0];
		to = tmp[1];
		return !rd?Math.round(Math.random()*(to-frm)+frm):(Math.random()*(to-frm)+frm);
	}
}//rnd
if (/heavy/gmi.test(auto.toString())) {
	rnd = function(frm,to,rd) {
		if (frm===undefined) {
			return "rgba("+Math.rnd(255)+","+Math.rnd(255)+","+Math.rnd(255)+","+Math.rnd(0,1,1)+")";
		} else {
			to = to===undefined?frm:to;
			frm = frm==to?0:frm;
			var tmp = [Math.min(frm,to),Math.max(frm,to)];
			frm = tmp[0];
			to = tmp[1];
			return !rd||[frm,to].every(function(val){return !/\./gmi.test(val.toString())})?Math.round(Math.random()*(to-frm)+frm):(Math.random()*(to-frm)+frm);
		}
	};
} else if (/light/gmi.test(auto.toString())) {
	rnd = function(frm,to,rd) {
		if (frm===undefined) {
			return "#"+Math.round(Math.random()*16777215).toString(16);
		} else {
			return !rd?Math.round(Math.random()*(to-frm)+frm):(Math.random()*(to-frm)+frm);
		}
	};
}
Math.rnd = rnd;
Number.prototype.rnd = function(frm,rd) {
	rnd(frm,this,rd);
};
Array.prototype.rnd = function(rd) {
	var ind = rnd(0,this.length-1);
	if (rd) {
		return ind;
	}
	return this[ind];
};
function dst(x,y,d) {
	if (x!==undefined&&y!==undefined&&d===undefined) {
		return Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
	} else if (d!==undefined&&(x!==null||y!==null)&&(x===null||y===null)) {
		return Math.sqrt(Math.pow(d,2)-Math.pow(y!==null?y:(x!==null?x:0)));
	} else if (x!==undefined&&y!==undefined&&d!==undefined) {
		return Math.atan2(y,x)*180/Math.PI;
	}
	console.warn("Invalid arguements");
	return false;
}//dst
Math.dst = dst;
Number.prototype.dst = function(a) {
	if (a===undefined) {
		return Math.cbrt(this);
	}
	return Math.sqrt(Math.pow(this,2)-Math.pow(a,2));
};
function col(x,y,X,Y,dx,dy,dX,dY) {
	if (dY!==undefined) {
		var bx = Math.min(x,X,x+dx,X+dX);
		var by = Math.min(y,Y,y+dy,Y+dY);
		var Bx = Math.max(x,X,x+dx,X+dX);
		var By = Math.max(y,Y,y+dy,Y+dY);
		return Math.abs(Bx-bx)<=dx+dX&&Math.abs(By-by)<=dy+dY;
		//box-box
	} else if (dX!==undefined) {
		return dst(x+X/2-dx,y+Y/2-dy)<=dX+dst(X/2,Y/2);
		//box-circle
	} else {
		return dst(x-Y,y-dx)<=X+(dy?dy:0);
		//circle-circle/point
	}
}//col
Math.col = col;
function cn() {
	var can = doc.head.appendChild(doc.createElement("script"));
	can.src = "https://dl.dropboxusercontent.com/s/iqx2kzfiguvp44y/Canvas.js?dl=1&raw=1";
	can = doc.head.appendChild(doc.createElement("link"));
	can.href = "https://dl.dropboxusercontent.com/s/fvnin56m7ujzd5u/Main.css?dl=1&raw=1";
	can.rel = "stylesheet";
}//can
function rep(cnt,com,ini) {
	var val = [];
	for (var stp = (ini?ini:0); stp < cnt+(ini?ini:0); stp++) {
		if (typeof com=="string") {
			val.push(eval(com.replace(/@(?!\\(?!\\))/gmi,stp).replace(/\\(?!\\(?!\\))/gmi,"")));
		} else {
			val.push(com(stp));
		}
	}
	return val.filter(function(va){return va!==undefined;});
}//rep
String.prototype.rep = Function.prototype.rep = function(cnt,ini) {
	return rep(cnt,this,ini);
};
function deg(dg,rd) {
	if (typeof dg!="string"&&!rd) {
		return (dg/180)*Math.PI;
		//rad
	} else {
		return (Number(dg.toString().replace("π",Math.PI))/Math.PI)*180;
	}
}//deg
Number.prototype.deg = function(rd) {
	return deg(this,rd);
};
Math.deg = deg;
function fon(tg) {
	if (ele("#mmax")) {
		if (tg) {
			ele("#mmax").rem();
		}
		return;
	}
	fl = crt("meta",head);
	fl.name = "viewport";
	fl.content = "width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no";
	fl.id = "mmax";
}//fon
function per(pr,mx,gr) {
	var gr = gr||100;
	return pr*mx/gr;
}//per
Math.per = per;
Number.prototype.per = function(pr,gr) {
	return per(!isNaN(pr)?pr:1,this,gr?gr:100);
};
function crt(e,el) {
	if (typeof el=="string") {
		el = ele(el);
	}
	return (el||ele()).appendChild(doc.createElement(e));
}//crt
HTMLElement.prototype.crt = String.prototype.crt = function(e) {
	return crt(e,this);
};
NodeList.prototype.crt = Array.prototype.crt = function(e) {
	var nar = [];
	for (eac in this) {
		nar.push(crt(e,eac));
	}
	return nar;
};
function ajx(u,f,p,d,syn,user,pass) {
	var aj = new XMLHttpRequest()||new ActiveXObject("Microsoft.XMLHTTP");
	if (syn===undefined) {
		aj.open(p||"GET",u);
	} else if (user===undefined) {
		aj.open(p||"GET",u,syn);
	} else {
		aj.open(p||"GET",u,syn,user,pass);
	}
	aj.onload = f;
	aj.send(d?d:null);
	aj.src = u;
	return aj;
}//ajx
Array.prototype.par = function(func) {
	return eval("("+func+")("+this.map(function(val){if(typeof val=="string"){return "'"+val+"'";}else{return val;}}).join(",")+")");
};
[String,Array,Number].forEach(function(val) {
	val.prototype.wrp = function(wr) {
		if (this instanceof String||this instanceof Number) {
			return wr+""+this+wr;
		} else {
			this.each(function(va,ind) {
				this[ind] = wr+""+this[ind]+wr;
			});
			return this;
		}
	};
});
function con(comm,init) {
	try {
		if (typeof comm=="string") {
			if (eval(comm)===true) {
				return;
			}
		} else {
			if (comm()===true) {
				return;
			}
		}
	} catch(e) {}
	setTimeout(con,init||1,comm||" ",init||1);
}//con
HTMLElement.prototype.rem = String.prototype.rem = function() {
	rem(this);
};
NodeList.prototype.rem = Array.prototype.rem = function() {
	this.forEach(function(val) {
		rem(val);
	});
};
function rem(el) {
	if (typeof el=="string") {
		el = ele(el);
	}
	el.parentNode.removeChild(el);
}//rem
function ins(el) {
	var arr = [];
	for (prop in el) {
		arr.push(typeof prop=="object"?Ins(prop):prop);
	}
	return arr;
}//ins
function Ins(el) {
	return JSON.stringify(el);
}//Ins
Object.prototype.ins = function() {
	return ins(this);
};
Object.prototype.Ins = function() {
	return Ins(this);
};
function dup(str,tim) {
	tim = tim?tim:0;
	var st = str?str:"";
	while (tim--) {
		if (typeof str!="object") {
			str += st.toString();
		} else {
			str = str.concat(st);
		}
	}
	return str;
}//dup
Array.prototype.dup = String.prototype.dup = Number.prototype.dup = function(tim) {
	return dup(this,tim);
};
if (!String.prototype.repeat) {
	String.prototype.repeat = String.prototype.dup;
} else {
	String.prototype.dup = String.prototype.repeat;
}
function alt(bool) {
	return !Boolean(bool);
}//alt
Object.prototype.alt = function() {
	return alt(this);
};
function sig(n) {
	n = Number(n);
	if (!n) {
		return 0;
	}
	return n/Math.abs(n);
}//sig
if (!Math.sign) {
	Math.sign = sig;
}
Math.sum = function(lst) {
	var acc = 0;
	while (lst) {
		acc += lst;
		lst--;
	}
	return acc;
};
Math.fac = function(lst) {
	var acc = 1;
	while (lst) {
		acc *= lst;
		lst--;
	}
	return acc;
};
Number.prototype.sig = String.prototype.sig = function() {
	return sig(this);
};
Object.prototype.each = Object.prototype.foreach = Object.prototype.forEach = Array.prototype.forEach;
Number.prototype.forEach = function(func) {
	return this.toString().forEach(func);
};
popup = Alert = alert;
String.prototype.splice = function(str,end) {
	return this.split("").splice(str,end?end:(this.length-str)).join("");
};
Array.prototype.split = function() {
	return this;
};
Array.prototype.rmv = String.prototype.rmv = function(elm) {
	var arr = this.split("");
	arr.splice(elm,1);
	if (this instanceof String) {
		return arr.join("");
	}
	return arr;
};
Array.prototype.pure = function() {
	return this.join(",").split(",")||[];
};
Image.prototype.data = function() {
	var can = document.createElement("canvas");
	can.width = this.width;
	can.height = this.height;
	var ctx = can.getContext("2d");
	ctx.drawImage(this,0,0);
	return can.toDataURL();
};
Array.prototype.shf = Array.prototype.shf = function() {
	var i = this.length,j,temp;
	if (!i) {
		return this;
	}
	while (--i) {
		j = rnd(i);
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
	return this;
};
String.prototype.shf = Number.prototype.shf = function() {
	return this.split("").shf();
};
if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(c,l) {
		var reg = new RegExp("^"+c);
		return reg.test(this.slice(l?l:0));
	};
}
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(c,l) {
		var reg = new RegExp(c+"$");
		return reg.test(this.slice(0,l?l:this.length));
	};
}
if (!String.prototype.includes) {
	String.prototype.includes = function(c,l) {
		var reg = new RegExp(c);
		return reg.test(this.slice(l?l:0));
	};
}
Array.prototype.split = function(s,j) {
	return this.join(j?j:"").split(s?s:"");
};
String.prototype.join = function(j,s) {
	return this.split(s?s:"").join(j?j:"");
};
Frame = requestAnimationFrame = webkitRequestAnimationFrame||mozRequestAnimationFrame||oRequestAnimationFrame||khtmlRequestAnimationFrame||msRequestAnimationFrame||ieRequestAnimationFrame||requestAnimationFrame||setTimeout;
if (!escape) {
	escape = encodeURI;
}
if (!unescape) {
	unescape = decodeURI;
}
function lim(n,m,M) {
	n = Number(n);
	m = Number(m);
	M = Number(M);
	return n<m?m:(n>M?M:n);
}
Math.lim = lim;
String.prototype.lim = Number.prototype.lim = function(min,max) {
	return lim(this,min,max);
};
Array.prototype.lim = function(min,max) {
	this.forEach(function(val,ind) {
		this[ind] = lim(val,min,max);
	});
	return this;
};
function bool(dt) {
	return dt==="true"?true:(dt==="false"||dt==="0"||dt==="null"||dt==="undefined"?false:Boolean(dt));
}//bool
String.prototype.bool = function() {
	return bool(this.toString());
};
function hlp() {
	//<script src=https://dl.dropboxusercontent.com/s/i8vpm0vlhrlc1en/Module.js?dl=1&raw=1></script>
	//<script src=https://gist.github.com/ValentinHacker/968b0597d65836870644195c4322cf60.js></script>
	alert(hlp);
	/* win(string (command)) -> save current page state & custom commands (globals: dat = page data,Win = command(s))
	ele(string (query),parent) object -> css query to a node e.x.: ele("#id.class tag[1],body*")
	mas(string (command),array,condition (command)) array -> run command for each element of the array - element will take the place of "@" symbol(s) (you can append escape sequences to it to prohibit translation) e.x.: mas("clr(@,500)",ele("**"))
	act(element) -> translate pseudocode : $$code$$ -> dynamically updated node - innerHTML = result of code - 'e' current element - strings must use single-quotes,%%code%% -> replaced with code's value,##code## -> single-run code - no returns,&&CSS$$ auto vendor-prefixes - e.x.:&&&filter:invert(90%);&transform:rotate(45deg);&&-- arguement is the owner-element of the pseudocode -- put pseudo-code inside HTML comments if you face any problems with translation...
	dbg(show/hide (boolean)) -> show/hide debugging button (triggers console) - undefined = toggle
	src(element) -> shows source code of element and allows editing
	xtr(element) -> extracts href/src resources from element
	cmp(array) -> converts multi-dimensional array to single-dinensional
	mul(element,command) -> runs a CSS style for all vendors (prefixes) - vendor prefix will take the position of "@" symbol(s) e.x.: @transform:rotate(45deg)
	cor(show/hide (boolean)) -> show/hide cursor coordinates (coordinates are stored inside global "crd",window events inside array coor[touchstart,touchmove,touchend,mousemove])
	tog(element,milliseconds,value,callback (func)) -> togle visibility of an element
	exp(element,milliseconds,array ([width,height]),callback) -> expand/collapse element
	tra(element,milliseconds,array ([X,Y]),callback) -> reposition element
	rnd(from,to) -> random number,leave arg(s) blank for random HEX
	dst(x,y,d) -> provide (x,y) to calculate distance with pythagorean,provide (x||y,d) to calculate the missing parameter, (x,y,1) for degrees
	col(x,y,X,Y,dx,dy,dX,dY) -> check if boxes collide
	col(X,Y,dx,dy,x,y,r) -> box-circle
	col(x,y,r,X,Y,R) -> circle-circle
	col(x,y,r,X,Y) -> circle-point
	cn() -> import canvas module and css extension
	rep(count,command,initial) -> repeat a command
	deg(degrees,radians) -> convert degrees <=> radians
	per(percent,value,scale(100)) -> returns percentance
	crt(elementType,parent) -> create and append element
	ajx(url,function,method,data) -> AJAX request,returned object src property holds URL
	con(command,interval) -> run a command constantly
	rem(elem) -> remove html element
	ins(object) -> inspect object
	dup(string,times) -> repeat string pattern
	alt(boolean) -> alternate boolean value
	sig(number) -> signum (+1/-1)
	.rmv(index) -> remove item from array/string
	Array.pure() -> grab array value instead of pointer
	Image.data() -> export image as base64
	Array.shf() -> shuffle
	lim(num,min,max) -> limit number range
	bool(str) -> string boolean */
}//hlp