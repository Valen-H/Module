x = innerWidth;
y = innerHeight;
d = [0,0];
trns = [0,0];
Trns = [0,0];
skew = [0,0];
Skew = [0,0];
scls = [100,100];
Scls = [100,100];
loads = rots = Rots = 0;
auto = true;  //heavy,light,fill,stroke,full,lock,unlock,nocenter
canvas = new Object();
off = [0,0];
pixel = devicePixelRatio||1;
onimgs = new CustomEvent("imgs");
onimg = new CustomEvent("img");
var crd = [0,0], ps = false, Trns = [0,0], Rots = 0, Scls = [100,100], dr = [null,null,null,null,null,false], zo = [null,null,null,null,false];
function ln(x,y,X,Y) {
	if (Y!==undefined) {
		if (auto&&!/unlock/gmi.test(auto.toString())) {
			beg();
		}
		mov(X!=null?X:(X=d[0]),Y!=null?Y:(Y=d[1]));
	} else if (X) {
		x += d[0];
		y += d[1];
	}
	pen.lineTo(x!=null?x:(x=d[0]),y||y===0?y:(y=d[1]));
	if (auto) {
		stk();
	}
	return d = [x,y];
}//ln
CanvasRenderingContext2D.prototype.ln = function(x,y,X,Y) {
	var pen = this;
	return ln(x,y,X,Y);
};
function stl(cl,typ) {
	if (typ===undefined) {
		return pen.fillStyle = pen.strokeStyle = cl?cl:rnd();
	} else if (typ) {
		return pen.fillStyle = cl?cl:rnd();
	} else {
		return pen.strokeStyle = cl?cl:rnd();
	}
}//stl
CanvasRenderingContext2D.prototype.stl = function(cl,typ) {
	var pen = this;
	return stl(cl,typ);
};
function wdt(wd) {
	return pen.lineWidth = wd?wd:"";
}//wdt
CanvasRenderingContext2D.prototype.wdt = function(wd) {
	var pen = this;
	return wdt(wd);
};
function txt(tx,x,y,t,s,a,b,w) {
	if (auto) {
		beg();
	}
	if (s) {
		pen.font = s;
	}
	if (b!==undefined||auto) {
		pen.textBaseline = ["top","hanging","middle","alphabetic","bottom","ideographic"][b||b===0?b:2];
	}
	if (a!==undefined||auto) {
		pen.textAlign = ["end","right","center","left","start"][a||a===0?a:2];
	}
	if (tx&&t&&!w) {
		pen.fillText(tx,x!==undefined?x:d[0],y!==undefined?y:d[1]);
	} else if (tx&&(!w)&&t!==undefined&&!t) {
		pen.strokeText(tx,x!==undefined?x:d[0],y!==undefined?y:d[1]);
	} else if (tx&&t) {
		pen.fillText(tx,x!==undefined?x:d[0],y!==undefined?y:d[1],w);
	} else if (tx&&t!==undefined&&!t) {
		pen.strokeText(tx,x!==undefined?x:d[0],y!==undefined?y:d[1],w);
	} else {
		return pen.direction=(!pen.direction)||pen.direction=="ltr"?"rtl":"ltr";
	}
	return pen.measureText(tx);
}//txt
CanvasRenderingContext2D.prototype.txt = function(tx,x,y,t,s,a,b) {
	var pen = this;
	return txt(tx,x,y,t,s,a,b);
};
function cur(x,y,x1,y1,x2,y2,X,Y) {
	if (Y!==undefined) {
		mov(X,Y);
	}
	if (y2!==undefined&&y2!==null) {
		pen.bezierCurveTo(x1,y1,x2,y2,x,y);
	} else {
		pen.quadraticCurveTo(x1,y1,x,y);
	}
	if (auto) {
		stk();
	}
	return d = [x,y];
}//cur
CanvasRenderingContext2D.prototype.cur = function(x,y,x1,y1,x2,y2,X,Y) {
	var pen = this;
	return cur(x,y,x1,y1,x2,y2,X,Y);
};
function mov(x,y,D) {
	if (/lock/gmi.test(auto.toString())&&!/unlock/gmi.test(auto.toString())) {
		beg();
	}
	if (D===undefined) {
		pen.moveTo(x!=null?x:(x=d[0]),y!==undefined?y:(y=d[1]));
	} else {
		pen.moveTo(x!=null?(x=d[0]+x):(x=d[0]),y!==undefined?(y=d[1]+y):(y=d[1]));
	}
	return d = [x,y];
}//mov
CanvasRenderingContext2D.prototype.move = function(x,y,D) {
	var pen = this;
	return mov(x,y,D);
};
function ark(x,y,r,a,b,c) {
	if ((c!==undefined&&c!==null)||a===undefined||b===undefined||a===null) {
		if (auto) {
			beg();
		}
		pen.arc(x!==null?x:d[0],y!==null?y:d[1],r===null?Dif:Math.abs(r),(a?a:0)/180*Math.PI,(b||360)/180*Math.PI,c?true:(a===undefined?true:false));
		d = [x+r,y];
	} else {
		pen.arcTo(x===undefined||x===null?d[0]:x,y===undefined||x===null?d[1]:y,r===undefined?Xx:r,a===undefined?Yy:a,b===undefined?dif:b);
		//x1,y1,x2,y2,r
	}
	if (auto) {
		stk(auto.toString().match(/fill/gmi)?true:false);
		return mov(x,y);
	}
	return d = [x+rx,y];
}//ark
CanvasRenderingContext2D.prototype.ark = function(x,y,r,a,b,c) {
	var pen = this;
	return ark(x,y,r,a,b,c);
};
if (CanvasRenderingContext2D.prototype.ellipse||CanvasRenderingContext2D.ellipse) {
	function ell(x,y,rx,ry,a,b,c) {
		if (auto) {
			beg();
		}
		rx = rx===undefined?Dif/2:rx;
		pen.ellipse(x=x===undefined||x===null?d[0]:x,y=y===undefined||y===null?d[1]:y,rx,ry===undefined||ry===null?rx:ry,(a||"0")/180*Math.PI,(b||360)/180*Math.PI,c?true:false);
		d = [x+rx,y];
		if (auto) {
			stk(auto.toString().match(/fill/gmi)?true:false);
			return mov(x,y);
		}
	}//ell
} else {
	ell = function(x,y,rx,ry,a,b,c) {
		if (auto) {
			beg();
		}
		str();
		rx = rx===undefined||rx===null?Dif/2:rx;
		ry = ry===undefined||ry===null?rx:ry;
		x = x===undefined||x===null?d[0]:x;
		y = y===undefined||y===null?d[1]:y;
		var inc = (rx>ry?rx/ry:(ry/rx))*100;
		scl(rx>ry?inc:100,ry>rx?inc:100);
		ark(x*(scls[0]/100),y*(scls[1]/100),rx>ry?ry:rx,a||"0",b||360,c?true:false);
		rst();
		if (!auto) {
			return d = [x+rx,y];
		} else {
			stk(auto.toString().match(/fill/gmi)?true:false);
			return mov(x,y);
		}
	};
}
CanvasRenderingContext2D.prototype.ell = function(x,y,rx,ry,a,b,c) {
	var pen = this;
	return ell(x,y,rx,ry,a,b,c);
};
function pol(x,y,r,s,sa,A) {
	if (auto) {
		beg();
	}
	var a = (Math.PI*2)/s;
	a = A?-a:a;
	str();
	trn(x,y);
	rot(sa);
	mov(r,0);
	for (var i=1; i<=s; i++) {
    	ln(r*Math.cos(a*i),r*Math.sin(a*i));
    }
    rst();
    if (!auto) {
		return d;
	} else {
		return mov(x,y);
	}
}//pol
CanvasRenderingContext2D.prototype.pol = function(x,y,r,s,sa,A) {
	var pen = this;
	return pol(x,y,r,s,sa,A);
};
function stk(typ) {
	if (typ) {
		pen.fill();
	} else {
		if (typ===undefined&&/fill/gmi.test(auto.toString())) {
			if (/stroke.*?fill/gmi.test(auto.toString())) {
				stk(0);
			}
			stk(1);
			if (/fill.*?stroke/gmi.test(auto.toString())) {
				stk(0);
			}
		} else {
			pen.stroke();
		}
	}
}//stk
CanvasRenderingContext2D.prototype.stk = function(typ) {
	var pen = this;
	stk(typ);
};
function beg(x,y,c) {
	if (x===undefined) {
		pen.beginPath();
	} else if (!c) {
		return pen.isPointInPath(x!==undefined?x:d[0],y!==undefined?y:d[1]);
	} else {
		return pen.isPointInStroke(x!==null?x:d[0],y!==null?y:d[1]);
	}
}//beg
CanvasRenderingContext2D.prototype.beg = function(x,y,c) {
	var pen = this;
	return beg(x,y,c);
};
function cls() {
	pen.closePath();
	if (auto) {
		stk(auto.toString().match(/fill/gmi)?true:false);
		beg();
		mov(d[0],d[1]);
	}
}//cls
CanvasRenderingContext2D.prototype.cls = function() {
	var pen = this;
	cls();
};
function ld(arr,m) {
	console.warn("Your device doesn't support line dashing...");
	ld = function(arr,m) {};
}//ld
if (CanvasRenderingContext2D.prototype.setLineDash) {
	ld = function(arr,m) {
		pen.setLineDash(arr||[]);
		if (m) {
			return pen.lineDashOffset = /^(-|\+)/gmi.test(m.toString())?pen.lineDashOffset+Number(m):m;
		} else if (m===false) {
			return pen.lineDashOffset = "";
		}
		return [pen.getLineDash(),pen.lineDashOffset];
	};
}
CanvasRenderingContext2D.prototype.ld = function(arr,m) {
	var pen = this;
	return ld(arr,m);
};
function rct(x,y,dx,dy,typ) {
	if (auto) {
		beg();
	}
	if (x===undefined) {
		return rct(0,0,can.width,can.height,1);
	}
	if (typ===undefined) {
		pen.rect(x!==null&&x!==undefined?x:(x=d[0]),y!==undefined&&y!==null?y:(y=d[1]),dx!==null&&dx!==undefined?dx:(dx=can.width),dy!==undefined&&dy!==null?dy:(dy=can.height));
		if (x===undefined) {
			stk(1);
		}
	} else if (typ) {
		pen.fillRect(x!==null&&x!==undefined?x:(x=d[0]),y!==undefined&&y!==null?y:(y=d[1]),dx!==null&&dx!==undefined?dx:(dx=can.width),dy!==undefined&&dy!==null?dy:(dy=can.height));
	} else {
		pen.strokeRect(x!==null&&x!==undefined?x:(x=d[0]),y!==undefined&&y!==null?y:(y=d[1]),dx!==null&&dx!==undefined?dx:(dx=can.width),dy!==undefined&&dy!==null?dy:(dy=can.height));
	}
	if (auto) {
		return d = [x+dx/2,y+dy/2];
	} else {
		return d = [x+dx,y+dy];
	}
}//rct
CanvasRenderingContext2D.prototype.rct = function(x,y,dx,dy,typ) {
	var pen = this;
	return rct(x,y,dx,dy,typ);
};
function str() {
	pen.save();
	if (auto) {
		Trns = trns;
		Rots = rots;
		Scls = scls;
	}
}//str
CanvasRenderingContext2D.prototype.str = function() {
	var pen = this;
	str();
};
function rst(a,b) {
	if (a&&b===undefined) {
		pen.setTransform(1,0,0,1,0,0);
		if (auto) {
			scls = [100,100];
			trns = [0,0];
			rots = 0;
			skew = [0,0];
		}
	} else if (b===undefined) {
		pen.restore();
		if (auto) {
			trns = Trns?Trns:[0,0];
			scls = Scls?Scls:[100,100];
			rots = Rots?Rots:0;
			skew = Skew?Skew:[0,0];
		}
	} else {
		pen.transform(1,a,b,1,0,0);
		skew = [skew[0]+a,skew[1]+b];
	}
}//rst
CanvasRenderingContext2D.prototype.rst = function(a) {
	var pen = this;
	rst(a);
};
function scr(X,Y) {
	str();
	if (X===undefined) {
		can.style.position = "fixed";
		can.style.width = "100vw";
		can.style.height = "100vh";
		can.style.top = can.style.left = 0;
		if (/full/gmi.test(auto.toString())&&!canvas.full) {
			addEventListener("resize",function(){scr()});
			addEventListener("orientationchange",function(){scr()});
			canvas.full = true;
		}
	} else if (Y===undefined) {
		Y = X;
		delete canvas.full;
	} else {
		delete canvas.full;
	}
	X = can.width = X?X:innerWidth;
	Y = can.height = Y?Y:innerHeight;
	if (auto) {
		x = X;
		y = Y;
		can.style.boxSizing = "border-box";
		can.style.width = x+"px";
		can.style.height = y+"px";
		un = [x/(mobile?Xx:innerWidth),y/(mobile?Yy:innerHeight)];
		DIF = x>y?y:x;
	}
	rst();
	return [can.width=X,can.height=Y];
}//scr
CanvasRenderingContext2D.prototype.scr = function(X,Y) {
	var pen = this;
	return scr(X,Y);
};
function rot(r,R) {
	if (R) {
		rot(-rots);
		return rot(r);
	}
	if (r===undefined) {
		rot(-rots*Math.PI/180);
		rots = 0;
		return;
	}
	pen.rotate((r?r:0)*Math.PI/180);
	rots += r?r:0;
	return rots %= 360;
}//rot
CanvasRenderingContext2D.prototype.rot = function(r,R) {
	var pen = this;
	return rot(r,R);
};
function scl(X,Y,r) {
	if (r) {
		scl(-scls[0],-scls[1]);
		return scl(X,Y);
	}
	if (X===undefined) {
		scl(100/scls[0],100/scls[1]);
		scls = [100,100];
		return;
	}
	X /= 100;
	if (Y===undefined) {
		Y = X;
	} else {
		Y /= 100;
	}
	pen.scale(X!==null?X:1,Y!==null?Y:1);
	scls = [scls[0]*X,scls[1]*Y];
	if (auto&&can.width==x&&can.height==y) {
		if (!/nocenter/gmi.test(auto.toString())) {
			trn((x-X*x)/2,(y-Y*y)/2);
		}
		un = [x/Xx*100/scls[0],y/Yy*100/scls[1]];
	}
	return scls;
}//scl
CanvasRenderingContext2D.prototype.scl = function(X,Y,r) {
	var pen = this;
	return scl(X,Y);
};
function trn(X,Y,r) {
	if (r) {
		trn(-trns[0],-trns[1]);
		return trn(X,Y);
	}
	if (X===undefined) {
		return trn(-trns[0],-trns[1]);
	}
	pen.translate(X?X:0,Y?Y:0);
	trns = [trns[0]+(X?X:0),trns[1]+(Y?Y:0)]
	if (auto) {
		size = [x-trns[0],y-trns[1]];
	}
	return trns;
}//trn
CanvasRenderingContext2D.prototype.trn = function(X,Y,r) {
	var pen = this;
	return trn(X,Y);
};
function exp(mod,xx,yy,dx,dy,X,Y) {
	if (mod===undefined) {
  	  return can.toDataURL();
	} else if (mod==0) {
		if (xx!==undefined&&yy===undefined) {
			return pen.createImageData(xx);
		}
		return pen.createImageData(xx?xx:x,yy?yy:y);
	} else if (mod==1) {
		return pen.getImageData(xx?xx:0,yy?yy:0,dx?dx:(x-trns[0]),dy?dy:(y-trns[1]));
	} else if (mod==2) {
		if (xx===undefined) {
			xx = 2;
		}
		pen.imageSmoothingEnabled = xx!=2?xx:(pen.imageSmoothingEnabled?false:true);
		pen.mozImageSmoothingEnabled = xx!=2?xx:(pen.mozImageSmoothingEnabled?false:true);
		pen.webkitImageSmoothingEnabled = xx!=2?xx:(pen.webkitImageSmoothingEnabled?false:true);
		pen.msImageSmoothingEnabled = xx!=2?xx:(pen.msImageSmoothingEnabled?false:true);
		pen.oImageSmoothingEnabled = xx!=2?xx:(pen.oImageSmoothingEnabled?false:true);
		pen.khtmlImageSmoothingEnabled = xx!=2?xx:(pen.khtmlImageSmoothingEnabled?false:true);
		pen.ieImageSmoothingEnabled = xx!=2?xx:(pen.ieImageSmoothingEnabled?false:true);
	} else {
		if (dx===undefined) {
			return pen.putImageData(mod,xx?xx:0,yy?yy:0);
		} else {
			return pen.putImageData(mod,xx?xx:0,yy?yy:0,dx?dx:0,dy?dy:0,X?X:x,Y?Y:y);
		}
	}
}//exp
CanvasRenderingContext2D.prototype.exp = function(mod,xx,yy,dx,dy,X,Y) {
	var pen = this;
	return exp(mod,xx,yy,dx,dy,X,Y);
};
function grd(x,y,r,x1,y1,r1,pt) {
	if (r1!==undefined) {
		gr = pen.createRadialGradient(x,y,r,x1,y1,r1);
	} else {
		gr = pen.createLinearGradient(x,y,r,x1);
	}
	for (var stp = 0; stp < (pt?pt:y1).split("/").length; stp++) {
		gr.addColorStop(Number((pt?pt:y1).split("/")[stp].split(":")[0])/100,(pt?pt:y1).split("/")[stp].split(":")[1]);
	}
	if (auto) {
		return pen.fillStyle = pen.strokeStyle = gr;
	} else {
		return gr;
	}
}//grd
CanvasRenderingContext2D.prototype.grd = function(x,y,r,x1,y1,r1,pt) {
	var pen = this;
	return grd(x,y,r,x1,y1,r1,pt);
};
function img(src,par) {
	var im = new Image(src);
	if ((!/^file:\/{2}/gmi.test(src))&&!par) {
		im.crossOrigin = "Anonymous";
	}
	im.src = src;
	loads++;
	im.addEventListener("load",function() {if(!--loads){dispatchEvent(onimgs)}dispatchEvent(onimg)},{once:true,passive:false});
	im.addEventListener("error",function() {if(!--loads){dispatchEvent(onimgs)}dispatchEvent(onimg)},{once:true,passive:false});
	im.draw = function(xx,yy,dx,dy,rep) {
		if (dx===undefined&&xx!==undefined) {
			pen.drawImage(this,xx?xx:xx=0,yy?yy:yy=0);
			dx = this.width;
			dy = this.height;
		} else if (rep===undefined) {
			pen.drawImage(this,xx?xx:xx=0,yy?yy:yy=0,dx?dx:dx=x,dy?dy:dy=y);
		} else {
			var pat = pen.createPattern(this,["repeat","repeat-x","repeat-y","no-repeat"][rep?rep:0]);
			var st = [pen.fillStyle,pen.strokeStyle];
			stl(pat);
			rct(xx?xx:xx=0,yy?yy:yy=0,dx?dx:dx=x,dy?dy:dy=y,1);
			stl(st[0]);
			stl(st[1],0);
			if (auto) {
				stk(auto.toString().match(/fill/gmi)?true:false);
			}
		}
		if (auto) {
			return d=[xx+dx/2,yy+dy/2];
		} else {
			return d=[xx+dx,yy+dy];
		}
	};
	return im;
}//img
CanvasRenderingContext2D.prototype.img = function(src) {
	var pen = this;
	return img(src);
};
function grb(cn) {
	if (typeof module==="undefined") {
		document.head.appendChild(module = document.createElement("script"));
		module.src = "https://dl.dropboxusercontent.com/s/i8vpm0vlhrlc1en/Module.js?dl=1&raw=1";
		setTimeout(module.onload=function(){grb(cn)},500);
	} else {
		if (typeof cn=="string") {
			cn = ele(cn);
		} else if (typeof cn!="object") {
			cn = ele("canvas[0]")?ele("canvas[0]"):(ele().appendChild(document.createElement("canvas")));
		}
		can = cn;
		if (auto) {
			x = can.width;
			y = can.height;
			size = [x,y];
			un = [x/Xx,y/Yy];
			d = [x/2,y/2];
			pen = can.getContext("2d");
			pen.x = x;
			pen.y = y;
			DIF = x>y?y:x;
			Pixel = pen.webkitBackingStorePixelRatio||pen.mozBackingStorePixelRatio||pen.msBackingStorePixelRatio||pen.oBackingStorePixelRatio||pen.backingStorePixelRatio||1;
			Un = pixel/(Pixel||1);
			off = [can.offsetLeft-(can.style.left.replace("px","")||can.offsetLeft),can.offsetTop-(can.style.top.replace("px","")||can.offsetTop)];
			if (/full/gmi.test(auto.toString())) {
				scr();
			}
			if (/lock/gmi.test(auto.toString())) {
				trn(x/2,y/2);
			}
			return pen;
		}
		return can;
	}
}//grb
function dlt(x,y,dx,dy) {
	var ps = false;
	if (x===undefined) {
		str();
		y = x = 0;
		dx = can.width;
		dy = can.height;
		rst(1);
		ps = true;
	}
	pen.clearRect(x,y,dx,dy);
	if (ps) {
		rst();
	}
}//dlt
CanvasRenderingContext2D.prototype.dlt = function(x,y,dx,dy) {
	var pen = this;
	dlt(x,y,dx,dy);
};
function lc(tp,typ) {
	if (tp>=4) {
		pen.miterLimit = typ?typ-4:0;
		return;
	}
	if (!typ) {
		return pen.lineCap = ["butt","square","round",""][tp||tp===0?tp%4:2];
	} else {
		return pen.lineJoin = ["bevel","mitter","round",""][tp||tp===0?tp%4:2];
	}
}//lc
CanvasRenderingContext2D.prototype.lc = function(tp,typ) {
	var pen = this;
	return lc(tp,typ);
};
function frm(code) {
	var fr = doc.createElement("iframe");
	fr.src = "data:text/html;charset:utf-8,"+encodeURI("<script src=https://dl.dropboxusercontent.com/s/i8vpm0vlhrlc1en/Module.js?dl=1&raw=1></script><script src=https://dl.dropboxusercontent.com/s/iqx2kzfiguvp44y/Canvas.js?dl=1&raw=1></script><link rel=stylesheet href=https://dl.dropboxusercontent.com/s/fvnin56m7ujzd5u/Main.css?dl=1&raw=1><script>onload=function(){grb();can.className='fullscreen';scr();("+code+")();};</script>");
	ele().appendChild(fr);
	return fr;
}//frm
function alp(a) {
	return pen.globalAlpha = a!==undefined?(a>=0&&a<=100?a/100:pen.globalAlpha):1;
}//alp
CanvasRenderingContext2D.prototype.alp = function(a) {
	var pen = this;
	return alp(a);
};
function cop(tp) {
	return pen.globalCompositeOperation = ["source-over","source-atop","source-in","source-out","destination-over","destination-atop","destination-in","destination-out","lighter","copy","xor"][tp?tp:0];
}//cop
CanvasRenderingContext2D.prototype.cop = function(tp) {
	var pen = this;
	return cop(tp);
};
function eff(tp,a,b,c,d) {
	var typ = ["blur","brightness","contrast","drop-shadow","grayscale","hue-rotate","invert","opacity","saturate","sepia"];
	if (c!==undefined) {
		pen.filter = "drop-shadow("+a+"px "+b+"px "+c+"px "+d+")";
	} else if (tp!==undefined) {
		if (!b&&pen.filter) {
			pen.filter += " "+typ[tp?tp:0]+"("+a+(tp==0?"px":(tp==5?"deg":"%"))+")";
		} else {
			pen.filter = typ[tp?tp:0]+"("+a+(tp==0?"px":(tp==5?"deg":"%"))+")";
		}
	} else {
		pen.filter = "";
	}
	if (mobile) {
		mul(can,"filter='"+pen.filter+"'");
	}
}//eff
CanvasRenderingContext2D.prototype.eff = function(tp,a,b,c,d) {
	var pen = this, can = this.canvas;
	eff(tp,a,b,c,d);
};
function drg() {
	if (dr[5]) {
		dr.forEach(function(val,ind) {
			if (ind==5) {
				dr[5] = false;
				return;
			}
			removeEventListener(val);
		});
		return;
	}
	var crd = [0,0], ps = false, crds = [0,0];
	dr[0] = can.addEventListener("touchstart",start);
	dr[1] = can.addEventListener("mousedown",start);
	function start(e) {
		if (e.touches) {
			if (e.touches.length==1) {
				ps = true;
				crd = [e.touches[0].clientX*un[0],e.touches[0].clientY*un[1]];
			} else {
				ps = false;
			}
		} else {
			crd = [e.clientX*un[0],e.clientY*un[1]];
			ps = true;
		}
	}//start
	dr[2] = can.addEventListener("touchmove",move);
	dr[3] = can.addEventListener("mousemove",move);
	dr[4] = can.addEventListener("mouseup",function() {
		ps = false;
	});
	dr[5] = true;
	function move(e) {
		e.preventDefault();
		var crds;
		if (e.touches&&ps) {
			if (e.touches.length==1) {
				crds = [e.touches[0].clientX*un[0]-crd[0],e.touches[0].clientY*un[1]-crd[1]];
				trn(crds[0],crds[1]);
				crd = [e.touches[0].clientX*un[0],e.touches[0].clientY*un[1]];
			}
		} else if (ps) {
			crds = [e.clientX*un[0]-crd[0],e.clientY*un[1]-crd[1]];
			trn(crds[0],crds[1]);
			crd = [e.clientX*un[0],e.clientY*un[1]];
		}
	}//move
}//drg
function zom() {
	if (zo[4]) {
		zo.forEach(function(val,ind) {
			if (ind==4) {
				zo[4] = false;
				return;
			}
			removeEventListener(val);
		});
		return;
	}
	var ds = 0, ps = false, Ds = [0,0];
	zo[0] = can.addEventListener("touchstart",start);
	zo[1] = can.addEventListener("touchend",function(e) {
		if (e.changedTouches.length!=2) {
			ps = false;
		}
	});
	function start(e) {
		if (e.touches) {
			if (e.touches.length==2) {
				ds = dst(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
				ps = true;
			} else {
				ps = false;
			}
		}
	}//start
	zo[2] = can.addEventListener("touchmove",move);
	zo[3] = can.addEventListener("wheel",zoom);
	zo[4] = true;
	function move(e) {
		if (e.touches.length==2&&ps) {
			e.preventDefault();
			var tmp = dst(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
			var tm = ds-tmp;
			scl(100-per(100,tm,dif));
			ds = tmp;
			Ds = [per(100-scls[0],(e.touches[0].clientX+e.touches[1].clientX)/2+trns[0]),per(100-scls[1],(e.touches[0].clientY+e.touches[1].clientY)/2+trns[1])];
		}
	}//move
	function zoom(e) {
		e.preventDefault();
		scl(100+(e.movementY/Y)*100*e.deltaY/Math.abs(e.deltaY));
	}//zoom
}//zom
function sha(x,y,clr,blr) {
	pen.shadowOffsetX = x?x:0;
	pen.shadowOffsetY = y?y:0;
	pen.shadowColor = clr||"black";
	pen.shadowBlur = blr?blr:0;
	return [pen.shadowOffsetX,pen.shadowOffsetY,pen.shadowColor,pen.shadowBlur];
}//sha
CanvasRenderingContext2D.prototype.sha = function(x,y,clr,blr) {
	var pen = this;
	return sha(x,y,clr,blr);
};
function clp(X,Y,dx,dy) {
	if (X!==undefined&&dy===undefined) {
		auto = false;
		ark(X,Y||"0",dx||(x>y?y:x));
		auto = true;
	} else if (X!==undefined) {
		rct(X,Y||"0",dx||x,dy||y);
	}
	pen.clip();
}//clp
CanvasRenderingContext2D.prototype.clp = function(X,Y,dx,dy) {
	var pen = this;
	clp(X,Y,dx,dy);
};
function edt(dt,ed,pre,post) {
	eval(pre?pre:"");
	for (var stp = 0; stp < dt.data.length; stp+=4) {
		var Red = red = dt.data[stp], Green = green = dt.data[stp+1], Blue = blue = dt.data[stp+2], Alpha = alpha = dt.data[stp+3], width = dt.width, height = dt.height;
		var grey = (red+blue+green)/3, clr = red>blue?(red>green?"red":"green"):(blue>green?"blue":"green");
		clr = grey>=230?"white":(grey<=20?"black":clr);
		var Grey = Math.abs(red-grey)<=10&&Math.abs(green-grey)<=10&&Math.abs(blue-grey)<=10&&grey>=10&&grey<=240;
		var yellow = (red+green)/2>blue+10&&red>blue&&green>blue, purple = (red+blue)/2>green+10&&red>green&&blue>green, cyan = (green+blue)/2>red+10&&green>red&&blue>red;
		if (yellow) {
			clr = "yellow";
		} else if (purple) {
			clr = "purple";
		} else if (cyan) {
			clr = "cyan";
		}
		var Yellow = (red+green)/2-blue, Purple = (red+blue)/2-green, Cyan = (blue+green)/2-red;
		if (typeof ed!="string") {
			ed();
		} else {
			eval(ed);
		}
		dt.data[stp] = red;
		dt.data[stp+1] = green;
		dt.data[stp+2] = blue;
		dt.data[stp+3] = alpha;
	}
	eval(post?post:"");
	return dt;
}//edt
CanvasRenderingContext2D.prototype.edt = function(dt,ed,pre,post) {
	var pen = this;
	return edt(dt,ed,pre,post);
};
ImageData.prototype.edt = function(ed,pre,post) {
	return this.data = edt(this,ed,pre,post).data;
};
function D(x,y,z) {
	this.X = this.x = x
	this.Y = this.y = y
	this.Z = this.z = z
	this.t = function(c) {
		var x = deg(c[3]), y = deg(c[4]), z = deg(c[5]), X = this.x-c[0], Y = this.y-P[1], Z = this.z-P[2]
		var nc = [Math.cos(y)*(Math.sin(z)*Y+Math.cos(z)*X)-Math.sin(y)*Z, Math.sin(x)*(Math.cos(y)*Z+Math.sin(y)*(Math.sin(z)*Y+Math.cos(z)*X))+Math.cos(x)*(Math.cos(z)*Y-Math.sin(z)*X), Math.cos(x)*(Math.cos(y)*Z+Math.sin(y)*(Math.sin(z)*Y+Math.cos(z)*X))-Math.sin(x)*(Math.cos(z)*Y-Math.sin(z)*X)]
		this.X = nc[0]
		this.Y = nc[1]
		this.Z = nc[2]
		return nc
	}//t
	return this
}//D
function hlpc() {
	//<script src=https://dl.dropboxusercontent.com/s/iqx2kzfiguvp44y/Canvas.js?dl=1&raw=1></script>
	//<script src="https://gist.github.com/ValentinHacker/8ce917a26b8779ea03a4cfd01ef07212.js"></script>
	alert(hlpc);
	/* grb(element) -> grab a canvas element
	mov(!x,!y) -> move pen to (x,y)
	mov(null,50) -> go 50 pixels down
	mov(50) -> go 50 pixels right
	mov(50,50,true) -> go 50 pixels right and 50 down
	ln(x,!y,!X,!Y) -> draw line from pen position (or (X,Y) if set) to (x,y)
	stl(!color,!(stroke/fill)) -> change paint (leave arguement blank for random color)
	wdt(!width) -> set line width (leave blank for random between 1 and 20)
	txt(text,x,y,!fill/stroke,style,align,baseline,width) -> draw text
	cur(x1,y1,x2,y2,x,y) -> bezier curve
	cur (x,y,x1,y1) -> quadratic curve
	ark(x,x,radius,startAngle,endAngle,!arc/tangentArc,!X,!Y) -> circle
	ell(x,y,rx,ry) -> ellipsis
	pol(x,y,r,s,sa,a) -> polygon
	rct(x,y,dx,dy,!(store/fill/stroke)) -> rectangle (undefined=store,0/false/null/""=stroke,1/true=fill)
	stk(!fill/stroke) -> stroke
	grd(x,y,dx,dy,"0:white,1:black") -> linear gradient
	grd(x,y,r,x1,y1,r1,"0:cyan,.4:grey,1:magenda") -> radial gradient
	img("src");this.draw(x,y,dx,dy) -> draw image
	ld([a,b,c...]) -> line dashing
	scr(!x,!y,!iframe) -> resize canvas/iframe
	scr() -> fullscreen
	frm(code) -> control a second canvas for simultaneous animations
	scl(!x,!y) -> scale
	trn(x,y) -> reposition axis (translate), total translation value is stored inside global "trns"
	rot(r) -> rotate
	dlt(x,y,dx,dy) -> erase square part of canvas
	lc(!(lineCap/lineJoin),!((butt/bevel)/(square/mitter)/round)) -> line ending or intercept
	alp(percent/0-1) -> transparency if drawing
	cop(type) -> global composite operation
	eff(type,a,b,c,d) -> add effects
	drg() -> add translation on drag
	zom() -> add scaling on pinch
	sha(x,y,color,blur) -> shadow
	clp(x,y,r) -> clip circle
	clp(x,y,dx,dy) -> clip square
	clp() -> clip path
	edt(imagedata,command) -> process pixels
	b/beg() -> begin path
	c/cls() -> close path
	s/str() -> save
	r/rst() -> restore
	e/exp() -> export/copy canvas
	d[x,y] -> current pen position
	can -> canvas
	pen -> canvas 2d context
	x -> canvas width
	y -> canvas height
	X -> innerWidth
	Y -> innerHeight
	Xx -> screen width
	Yy -> screen height
	UA -> User Agent
	mobile -> bool
	un -> measurement unit [x/Xx,y/Yy]
	dif -> smallest dimension of page
	Dif -> smallest dimension of screen
	DIF -> smallest dimension of canvas
	off -> canvas offset [x,y]
	auto -> true/false defines if stk() and beg() happen automatically */
}//hlpc
