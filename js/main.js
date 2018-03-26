function Shape(a,b) {
    if ( arguments.length > 0 )
        this.init(a,b);
}

Shape.prototype.init = function(a,b) {
    this.a = a;
    this.b = b;
    this.params = [];
}     
Shape.prototype.area = function (area) {
    return 0;
};

Ellipse.prototype = new Shape();
Ellipse.prototype.constructor = Ellipse;
Ellipse.constructor = Shape.prototype.constructor;
function Ellipse(a, b) {
    if ( arguments.length > 0 ) {
        this.init(a,b);
        this.params = ['x Axis', 'y Axis'];
    }
}
Ellipse.prototype.area = function () {
    return Math.PI*this.a*this.b;
};

Circle.prototype = new Ellipse();
Circle.prototype.constructor = Circle;
Circle.constructor = Ellipse.prototype.constructor;
function Circle(diameter) {
    if ( arguments.length > 0 ) {
        var a = diameter/2;
        var b = diameter/2;
        this.init(a,b);
        this.params = ['Diameter'];
    }
}

Rectangle.prototype = new Shape();
Rectangle.prototype.constructor = Rectangle;
Rectangle.constructor = Shape.prototype.constructor;
function Rectangle(a, b) {
    if ( arguments.length > 0 ) {
        this.init(a,b);
        this.params = ['Length', 'Breadth'];
    }
}
Rectangle.prototype.area = function () {
    return this.a*this.b;
};

Square.prototype = new Rectangle();
Square.prototype.constructor = Square;
Square.constructor = Rectangle.prototype.constructor;
function Square(side) {
    if ( arguments.length > 0 ) {
        var a = side;
        var b = side;
        this.init(a,b);
        this.params = ['Side'];
    }
}

window.onload = function(){
    VueInst = new Vue({
		el: '#steps-container',
		data: function() {
            return initialState();
		},
		methods: {
			cancel: function(){
                this.currentStep = 1;
                this.$data = initialState();
                mountedIntialization(this);
                jQuery('#main-action').text('Go to step '+ (this.currentStep+1));
            },
            nextStep: function(){
                if( this.currentStep == 2 ){
                    jQuery('#main-action').text('Startover');                
                    if( this.selectedShape == 'Rectangle'){
                        var rect = new Rectangle(this.inputParams[0],this.inputParams[1]);
                        this.area = rect.area();
                    }
                    else if( this.selectedShape == 'Square'){
                        var square = new Square(this.inputParams[0]);
                        this.area = square.area();
                    }
                    if( this.selectedShape == 'Ellipse'){
                        var ellipse = new Ellipse(this.inputParams[0],this.inputParams[1]);
                        this.area = ellipse.area();
                    }
                    else if( this.selectedShape == 'Circle'){
                        var circle = new Circle(this.inputParams[0]);
                        this.area = circle.area();
                    }
                    this.currentStep++;
                }
                else{
                    if( this.currentStep == 3 ){
                        this.currentStep = 1;
                        this.cancel();
                    }
                    else{
                        if( this.vowels.indexOf(this.selectedShape[0].toLowerCase()) != -1 ){
                            this.selectedShapeArticle = 'an';
                        }
                        else{
                            this.selectedShapeArticle = 'a';
                        }
                        this.reqdParam = this.allParams[this.selectedShape];
                        this.currentStep++;
                    }
                    jQuery('#main-action').text('Go to step '+ (this.currentStep+1));
                }
            }
		},
	    mounted: function(){
            mountedIntialization(this);
	    },
	    updated: function(){

	    }
	});
}

function initialState (){
    return {
        currentStep: 1,
        availableShapes: ['Rectangle','Circle','Square','Ellipse'],
        selectedShape: undefined,
        selectedShapeArticle: 'a',
        vowels: 'aeiou',
        allParams: [[]],
        reqdParam: undefined,
        inputParams: [],
        area: undefined
    }
}

function mountedIntialization(obj){
            
    obj.selectedShape = obj.availableShapes[0];
    obj.allParams = new Object();
    for( i=0; i<obj.availableShapes.length; i++ ){
        var arr = new Array();
        if( obj.availableShapes[i] == 'Rectangle'){
            arr.push('Length');
            arr.push('Breadth');
        }
        else if( obj.availableShapes[i] == 'Square'){
            arr.push('Side');
        }
        if( obj.availableShapes[i] == 'Ellipse'){
            arr.push('x Axis');
            arr.push('y Axis');
        }
        else if( obj.availableShapes[i] == 'Circle'){
            arr.push('Diameter');
        }
        obj.allParams[obj.availableShapes[i]] = arr;
    }

}