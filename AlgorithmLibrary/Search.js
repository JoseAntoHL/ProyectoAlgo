//POSICION DEL PSUCODIGO EN PANTALLA
Search.CODE_START_X = 1000;
Search.CODE_START_Y = 10;
Search.CODE_LINE_HEIGHT = 14;

//COLORES DE LETRA DEL CODIGO 
Search.CODE_HIGHLIGHT_COLOR = "#FF0000"; /* COLOR DE LA LETRA EN USO*/ 
Search.CODE_STANDARD_COLOR = "#000000"; /* COLOR DE LA LETRA EN ESTADO NORMAL*/ 

var SMALL_SIZE = 0;
var LARGE_SIZE = 1;

//TAMANO DE LOS CUADRADOS
var EXTRA_FIELD_WIDTH = 50;
var EXTRA_FIELD_HEIGHT = 50;

//CUADRADO BUSCANDO
var SEARCH_FOR_X = 1050;
var SEARCH_FOR_Y = 210;

//CUADRADO RESULTADO
var RESULT_X = 1150; 
var RESULT_Y = 210;

//CUADRADO INDEX
var INDEX_X = 1050;
var INDEX_Y = 310;

//TAMANO DE CIRCULOS
var HIGHLIGHT_CIRCLE_SIZE_SMALL = 20;
var HIGHLIGHT_CIRCLE_SIZE_LARGE = 10;
var HIGHLIGHT_CIRCLE_SIZE = HIGHLIGHT_CIRCLE_SIZE_SMALL;

//COLORES DE LOS CIRCULOS
var LOW_CIRCLE_COLOR = "#1010FF";
var LOW_BACKGROUND_COLOR = "#F0F0FF";
var MID_CIRCLE_COLOR = "#118C4E";
var MID_BACKGROUND_COLOR = "#F0FFF0";
var HIGH_CIRCLE_COLOR = "#FF9009";
var HIGH_BACKGROUND_COLOR = "#FFFFF0";

//CIRCULO BAJO
var LOW_POS_X = 1000;
var LOW_POS_Y = 310;

//CIRCULO MEDIO
var MID_POS_X = 1100;
var MID_POS_Y = 310;

//POSICION DEL CIRCULO 
var HIGH_POS_X = 1200;
var HIGH_POS_Y = 310;


// ARRAY POSICION
var ARRAY_START_X_LARGE = 100;
var ARRAY_START_X = ARRAY_START_X_LARGE;

var ARRAY_START_Y_LARGE = 40;
var ARRAY_START_Y = ARRAY_START_Y_LARGE;

var ARRAY_ELEM_WIDTH_LARGE = 40;
var ARRAY_ELEM_WIDTH = ARRAY_ELEM_WIDTH_LARGE;

//
var ARRAY_ELEM_HEIGHT_LARGE = 30;
var ARRAY_ELEM_HEIGHT = ARRAY_ELEM_HEIGHT_LARGE;// ESPACIO POR ELEMENTO

//A
var ARRAY_ELEMS_PER_LINE_LARGE = 20;
var ARRAY_ELEMS_PER_LINE = ARRAY_ELEMS_PER_LINE_LARGE;// CANTIDAD DE ELEMENTOS POR LINEA

//ESPACIO ENTRE ARRAYS
var ARRAY_LINE_SPACING_LARGE = 60;
var ARRAY_LINE_SPACING = ARRAY_LINE_SPACING_LARGE; // CANTIDAD DE ESPACIO DE SEPARACION

//TAMANO DE ARRAY
var SIZE = '';//TAMANO DEL ARRAY QUE TOMARA

function Search(am, w, h)
{
    this.init(am, w, h);
    
}

Search.prototype = new Algorithm();

Search.superclass = Algorithm.prototype;

//LINEAS DE PSEUDOCODIGO QUE SE MUESTRAN EN LA INTERFAZ

Search.LINEAR_CODE = [ ["1. def ", "linearSearch(listData, value)"],
                       ["2.    index = 0"],
                       ["3.    while (","index < len(listData)", " and ", "listData[index] < value","):"],
                       ["4.        index++;"],
                       ["5.    if (", "index >= len(listData", " or ", "listData[index] != value", "):"],
                       ["6.        return -1"],
                       ["7.    return index"]
                    ];
Search.BINARY_CODE = [ ["1. def ", "binarySearch(listData, value)"],
                       ["2.    low = 0"],
                       ["3.    high = len(listData) - 1"],
                       ["4.    while (","low <= high",")"],
                       ["5.        mid = (low + high) / 2"] ,
                       ["6.        if (","listData[mid] == value","):"], 
                       ["7.            return mid"], 
                       ["8.        elif (","listData[mid] < value",")"], 
                       ["9.            low = mid + 1"],
                       ["10.        else:"],
                       ["11.            high = mid - 1"],
                       ["12.    return -1"]];
Search.QUICK_CODE = [   ["1. def", "quickSelect(list, left, right, k)"], 
                        ["2.    if left = right "],    
                        ["3.        return list[left]"],
                        ["4.        pivotIndex  :=  lenght(list)/2"],
                        ["5.        pivotIndex  := partition(list, left, right, pivotIndex)"],
                        ["6.    if k = pivotIndex"],
                        ["7.        return list[k]"],
                        ["8.    else if k < pivotIndex"]]


Search.prototype.init = function(am, w, h)
{
    Search.superclass.init.call(this, am, w, h);
    this.addControls();
    this.nextIndex = 0;
    this.commands = [];
    this.initialIndex = this.nextIndex;
}


Search.prototype.addControls =  function()  /* BOTONES */{
    this.controls = [];
    //PRIMER FIELD-------------
    this.searchField = addControlToAlgorithmBar("Text", "");//AQUI SE COLOCA EL NUMERO QUE DESEA BUSCAR
    this.searchField.onkeydown = this.returnSubmit(this.searchField,  null,  6, true);//MAX 999999

    this.linearSearchButton = addControlToAlgorithmBar("Button", "Linear Search");//BOTON DE BUSQUEDA LINEAL
    this.linearSearchButton.onclick = this.linearSearchCallback.bind(this);
    this.controls.push(this.searchField);
    this.controls.push(this.linearSearchButton);


    this.binarySearchButton = addControlToAlgorithmBar("Button", "Binary Search");//BOTON DE BUSQUEDA BINARIA
    this.binarySearchButton.onclick = this.binarySearchCallback.bind(this);
    this.controls.push(this.binarySearchButton);
    

    this.quicksearchButton = addControlToAlgorithmBar("Button", "Quick Select");//BOTON DE QUICK SELECT
    this.quicksearchButton.onclick = this.quickSearchCallback.bind(this);
    this.controls.push(this.quicksearchButton);

    // SEGUNDO FIELD----
    this.cantField = addControlToAlgorithmBar("Text", "");//AQUI SE COLOCA EL NUMERO DE CUADROS A CREAR
    this.cantField.onkeydown = this.returnSubmit(this.cantField, null, 3, true);//MAX 999

    this.createField = addControlToAlgorithmBar("Button", "Crear Vector");
    this.createField.onclick = this.createFieldback.bind(this);
    this.controls.push(this.cantField);
    this.controls.push(this.createField);

}

Search.prototype.enableUI = function(event){
    for (var i = 0; i < this.controls.length; i++)
    {
	this.controls[i].disabled = false;
    }
    
}

Search.prototype.disableUI = function(event)
{
    for (var i = 0; i < this.controls.length; i++)
    {
	this.controls[i].disabled = true;
    }
}



Search.prototype.getIndexX = function(index) {
    var xpos = (index  % ARRAY_ELEMS_PER_LINE) * ARRAY_ELEM_WIDTH + ARRAY_START_X;
    return xpos;
}


Search.prototype.getIndexY = function(index) {
    if (index == -1) {
       index = 0;
    }
    var ypos = Math.floor(index / ARRAY_ELEMS_PER_LINE) * ARRAY_LINE_SPACING +  ARRAY_START_Y +  ARRAY_ELEM_HEIGHT;
     return ypos;
}

Search.prototype.setup = function(){
    //FUNCION PARA CREAR LOS VECTORES RELLENOS CON LOS NUMEROS ALEATORIOS EN ORDEN CRECIENTE ------- NO MODIFICAR ----- PELIGRO----- :D---
    this.nextIndex = 0;

    this.values = new Array(SIZE);
    this.arrayData = new Array(SIZE);
    this.arrayID = new Array(SIZE);
    this.arrayLabelID = new Array(SIZE);

    for (var i = 0; i < SIZE; i++){
    this.arrayData[i] = Math.floor(1+Math.random()*999);// ALEATORIO
	this.arrayID[i]= this.nextIndex++;
	this.arrayLabelID[i]= this.nextIndex++;
    }


    for (var i = 1; i < SIZE; i++) {
        var nxt = this.arrayData[i];
        var j = i
        while (j > 0 && this.arrayData[j-1] > nxt) {
            this.arrayData[j] = this.arrayData[j-1];
            j  = j - 1;
        }
        this.arrayData[j] = nxt;
    }

    this.leftoverLabelID = this.nextIndex++;
    this.commands = new Array();

    
    for (var i = 0; i < SIZE; i++)
    {
	var xLabelpos = this.getIndexX(i);
	var yLabelpos = this.getIndexY(i);
	this.cmd("CreateRectangle", this.arrayID[i],this.arrayData[i], ARRAY_ELEM_WIDTH, ARRAY_ELEM_HEIGHT,xLabelpos, yLabelpos - ARRAY_ELEM_HEIGHT);
	this.cmd("CreateLabel",this.arrayLabelID[i],  i,  xLabelpos, yLabelpos);
	this.cmd("SetForegroundColor", this.arrayLabelID[i], "#0000FF");
	
    }

    this.movingLabelID = this.nextIndex++;
    this.cmd("CreateLabel",this.movingLabelID,  "", 0, 0);

//-----------------------------------------CUADROS DE LADO DERECHO-----------------------------------------------------------------------
    this.searchForBoxID = this.nextIndex++;
    this.searchForBoxLabel = this.nextIndex++;
    this.cmd("CreateRectangle",  this.searchForBoxID, "", EXTRA_FIELD_WIDTH, EXTRA_FIELD_HEIGHT,SEARCH_FOR_X, SEARCH_FOR_Y);
    this.cmd("CreateLabel",  this.searchForBoxLabel,  "Buscando  ", SEARCH_FOR_X, SEARCH_FOR_Y);
    this.cmd("AlignLeft",   this.searchForBoxLabel, this.searchForBoxID);

    this.resultBoxID = this.nextIndex++;
    this.resultBoxLabel = this.nextIndex++;
    this.resultString = this.nextIndex++;
    this.cmd("CreateRectangle",  this.resultBoxID, "", EXTRA_FIELD_WIDTH, EXTRA_FIELD_HEIGHT,RESULT_X, RESULT_Y);
    this.cmd("CreateLabel",  this.resultBoxLabel,  "Posicion  ", RESULT_X, RESULT_Y);
    this.cmd("CreateLabel",  this.resultString,  "", RESULT_X, RESULT_Y);
    this.cmd("AlignLeft",   this.resultBoxLabel, this.resultBoxID);
    this.cmd("AlignRight",   this.resultString, this.resultBoxID);
    this.cmd("SetTextColor", this.resultString, "#FF0000");

    this.indexBoxID = this.nextIndex++;
    this.indexBoxLabel = this.nextIndex++;
    this.cmd("CreateRectangle",  this.indexBoxID, "", EXTRA_FIELD_WIDTH, EXTRA_FIELD_HEIGHT,INDEX_X, INDEX_Y);
    this.cmd("CreateLabel",  this.indexBoxLabel,  "indice  ", INDEX_X, INDEX_Y);
    this.cmd("AlignLeft",   this.indexBoxLabel, this.indexBoxID);

    this.midBoxID = this.nextIndex++;
    this.midBoxLabel = this.nextIndex++;
    this.cmd("CreateRectangle",  this.midBoxID, "", EXTRA_FIELD_WIDTH, EXTRA_FIELD_HEIGHT,MID_POS_X, MID_POS_Y);
    this.cmd("CreateLabel",  this.midBoxLabel,  "centro  ", MID_POS_X, MID_POS_Y);
    this.cmd("AlignLeft",   this.midBoxLabel, this.midBoxID);
    this.cmd("SetForegroundColor", this.midBoxID, MID_CIRCLE_COLOR);
    this.cmd("SetTextColor", this.midBoxID, MID_CIRCLE_COLOR);
    this.cmd("SetBackgroundColor", this.midBoxID, MID_BACKGROUND_COLOR);

    this.midCircleID = this.nextIndex++;
    this.cmd("CreateHighlightCircle", this.midCircleID, MID_CIRCLE_COLOR, 0, 0, HIGHLIGHT_CIRCLE_SIZE);

    this.lowBoxID = this.nextIndex++;
    this.lowBoxLabel = this.nextIndex++;
    this.cmd("CreateRectangle",  this.lowBoxID, "", EXTRA_FIELD_WIDTH, EXTRA_FIELD_HEIGHT,LOW_POS_X, LOW_POS_Y);
    this.cmd("CreateLabel",  this.lowBoxLabel,  "primero  ", LOW_POS_X, LOW_POS_Y);
    this.cmd("AlignLeft",   this.lowBoxLabel, this.lowBoxID);
    this.cmd("SetForegroundColor", this.lowBoxID, LOW_CIRCLE_COLOR);
    this.cmd("SetTextColor", this.lowBoxID, LOW_CIRCLE_COLOR);
    this.cmd("SetBackgroundColor", this.lowBoxID, LOW_BACKGROUND_COLOR);

    this.lowCircleID = this.nextIndex++;
    this.cmd("CreateHighlightCircle", this.lowCircleID, LOW_CIRCLE_COLOR, 0,0,HIGHLIGHT_CIRCLE_SIZE);

    this.highBoxID = this.nextIndex++;
    this.highBoxLabel = this.nextIndex++;
    this.cmd("CreateRectangle",  this.highBoxID, "", EXTRA_FIELD_WIDTH, EXTRA_FIELD_HEIGHT,HIGH_POS_X, HIGH_POS_Y);
    this.cmd("CreateLabel",  this.highBoxLabel,  "ultimo  ", HIGH_POS_X, HIGH_POS_Y);
    this.cmd("AlignLeft",   this.highBoxLabel, this.highBoxID);
    this.cmd("SetForegroundColor", this.highBoxID, HIGH_CIRCLE_COLOR);
    this.cmd("SetTextColor", this.highBoxID, HIGH_CIRCLE_COLOR);
    this.cmd("SetBackgroundColor", this.highBoxID, HIGH_BACKGROUND_COLOR);

    this.highCircleID = this.nextIndex++;
    this.cmd("CreateHighlightCircle", this.highCircleID, HIGH_CIRCLE_COLOR, 0 , 0, HIGHLIGHT_CIRCLE_SIZE);


    this.cmd("SetALpha", this.lowBoxID, 0);
    this.cmd("SetALpha", this.lowBoxLabel, 0);
    this.cmd("SetALpha", this.midBoxID, 0);
    this.cmd("SetALpha", this.midBoxLabel, 0);
    this.cmd("SetALpha", this.highBoxID, 0);
    this.cmd("SetALpha", this.highBoxLabel, 0);

    this.cmd("SetALpha", this.midCircleID, 0);
    this.cmd("SetALpha", this.lowCircleID, 0);
    this.cmd("SetALpha", this.highCircleID, 0);

    this.cmd("SetALpha", this.indexBoxID, 0);
    this.cmd("SetALpha", this.indexBoxLabel, 0);
    
    this.highlight1ID = this.nextIndex++;
    this.highlight2ID = this.nextIndex++;

    this.binaryCodeID = this.addCodeToCanvasBase(Search.BINARY_CODE, Search.CODE_START_X, Search.CODE_START_Y, Search.CODE_LINE_HEIGHT, Search.CODE_STANDARD_COLOR);

    this.linearCodeID = this.addCodeToCanvasBase(Search.LINEAR_CODE, Search.CODE_START_X, Search.CODE_START_Y, Search.CODE_LINE_HEIGHT, Search.CODE_STANDARD_COLOR);

    //this.quickCodeID = this.addCodeToCanvasBase(Search.QUICK_CODE, Search.CODE_START_X, Search.CODE_START_Y, Search.CODE_LINE_HEIGHT, Search.CODE_STANDARD_COLOR);

    this.setCodeAlpha(this.binaryCodeID, 0);
    this.setCodeAlpha(this.linearCodeID, 0);
    //this.setCodeAlpha(this.quickCodeID, 0);

    this.animationManager.StartNewAnimation(this.commands);
    this.animationManager.skipForward();
    this.animationManager.clearHistory();
}
//FUNCION QUE AYUDA A CREAR LA CANTIDAD N DE ESPACIOS EN EL VECTOR
Search.prototype.setup_create  = function(createVal) {

    HIGHLIGHT_CIRCLE_SIZE = HIGHLIGHT_CIRCLE_SIZE_LARGE;
    ARRAY_START_X = ARRAY_START_X_LARGE;
    ARRAY_START_Y = ARRAY_START_Y_LARGE;
    ARRAY_ELEM_WIDTH = ARRAY_ELEM_WIDTH_LARGE;
    ARRAY_ELEM_HEIGHT = ARRAY_ELEM_HEIGHT_LARGE;
    ARRAY_ELEMS_PER_LINE = ARRAY_ELEMS_PER_LINE_LARGE;
    ARRAY_LINE_SPACING = ARRAY_LINE_SPACING_LARGE;
    SIZE = createVal;
    this.size = LARGE_SIZE;
    this.setup() 
 }

//----------NO TOCAR----------------------------------
//FUNCIONES DE IMPLEMENTACION DE LOS METODOS 
Search.prototype.linearSearchCallback = function(event)
{
    var searchVal = this.searchField.value;
    this.implementAction(this.linearSearch.bind(this), searchVal);
}

Search.prototype.binarySearchCallback = function(event)
{

    var searchVal = this.searchField.value;
    this.implementAction(this.binarySearch.bind(this), searchVal);

}

Search.prototype.quickSearchCallback = function(event) // NO FUNCIONAL
{
    var searchVal = this.searchField.value;
    this.implementAction(this.quickSearch.bind(this), searchVal);

}
//FUNCIONES DE IMPLEMENTACION PARA CREAR N ESPACIOS
Search.prototype.createFieldback = function(event)
{
    var createVal = this.cantField.value;
    this.implementAction(this.setup_create.bind(this), createVal);
}

//-------------------BINARY SEARCH---------------------------------------
Search.prototype.binarySearch = function(searchVal){
    this.commands = new Array();
    this.setCodeAlpha(this.binaryCodeID, 1);
    this.setCodeAlpha(this.linearCodeID, 0);

    this.cmd("SetALpha", this.lowBoxID, 1);
    this.cmd("SetALpha", this.lowBoxLabel, 1);
    this.cmd("SetALpha", this.midBoxID, 1);
    this.cmd("SetALpha", this.midBoxLabel, 1);
    this.cmd("SetALpha", this.highBoxID, 1);
    this.cmd("SetALpha", this.highBoxLabel, 1);

    this.cmd("SetAlpha", this.lowCircleID, 1);
    this.cmd("SetAlpha", this.midCircleID, 1);
    this.cmd("SetAlpha", this.highCircleID, 1);
    this.cmd("SetPosition", this.lowCircleID, LOW_POS_X, LOW_POS_Y);
    this.cmd("SetPosition", this.midCircleID, MID_POS_X, MID_POS_Y);
    this.cmd("SetPosition", this.highCircleID, HIGH_POS_X, HIGH_POS_Y);
    this.cmd("SetAlpha", this.indexBoxID, 0);
    this.cmd("SetAlpha", this.indexBoxLabel, 0);

    this.cmd("SetText", this.resultString, "");
    this.cmd("SetText", this.resultBoxID, "");
    this.cmd("SetText", this.movingLabelID, "");

    var low = 0;
    var high = SIZE- 1;
    this.cmd("Move", this.lowCircleID, this.getIndexX(0), this.getIndexY(0));
    this.cmd("SetText", this.searchForBoxID, searchVal);
    this.cmd("SetForegroundColor", this.binaryCodeID[1][0], Search.CODE_HIGHLIGHT_COLOR);
    this.cmd("SetHighlight", this.lowBoxID, 1)
    this.cmd("SetText", this.lowBoxID, 0)
    this.cmd("step");
    this.cmd("SetForegroundColor", this.binaryCodeID[1][0], Search.CODE_STANDARD_COLOR);
    this.cmd("SetHighlight", this.lowBoxID, 0)
    this.cmd("SetForegroundColor", this.binaryCodeID[2][0], Search.CODE_HIGHLIGHT_COLOR);
    this.cmd("SetHighlight", this.highBoxID, 1)
    this.cmd("SetText", this.highBoxID, SIZE-1)
    this.cmd("Move", this.highCircleID, this.getIndexX(SIZE-1), this.getIndexY(SIZE-1));
    this.cmd("step");
    this.cmd("SetForegroundColor", this.binaryCodeID[2][0], Search.CODE_STANDARD_COLOR);
    this.cmd("SetHighlight", this.highBoxID, 0)
    var keepGoing = true;

    while (keepGoing)  {
	this.cmd("SetHighlight", this.highBoxID, 1)
	this.cmd("SetHighlight", this.lowBoxID, 1)
	this.cmd("SetForegroundColor", this.binaryCodeID[3][1], Search.CODE_HIGHLIGHT_COLOR);
	this.cmd("step");
	this.cmd("SetHighlight", this.highBoxID, 0)
	this.cmd("SetHighlight", this.lowBoxID, 0)
	this.cmd("SetForegroundColor", this.binaryCodeID[3][1], Search.CODE_STANDARD_COLOR);
	if (low > high)
	{
            keepGoing = false;
	} else {
	    var mid = Math.floor((high + low) / 2);
            this.cmd("SetForegroundColor", this.binaryCodeID[4][0], Search.CODE_HIGHLIGHT_COLOR);
	    this.cmd("SetHighlight", this.highBoxID, 1)
	    this.cmd("SetHighlight", this.lowBoxID, 1)
	    this.cmd("SetHighlight", this.midBoxID, 1)
	    this.cmd("SetText", this.midBoxID, mid)
            this.cmd("Move", this.midCircleID, this.getIndexX(mid), this.getIndexY(mid));

            this.cmd("step");
            this.cmd("SetForegroundColor", this.binaryCodeID[4][0], Search.CODE_STANDARD_COLOR);
	    this.cmd("SetHighlight", this.midBoxID, 0)
	    this.cmd("SetHighlight", this.highBoxID, 0)
	    this.cmd("SetHighlight", this.lowBoxID, 0)
	    this.cmd("SetHighlight", this.searchForBoxID, 1)
            this.cmd("SetHighlight", this.arrayID[mid],1);
            this.cmd("SetForegroundColor", this.binaryCodeID[5][1], Search.CODE_HIGHLIGHT_COLOR);
            this.cmd("step");
	    this.cmd("SetHighlight", this.searchForBoxID, 0)
            this.cmd("SetHighlight", this.arrayID[mid],0);
            this.cmd("SetForegroundColor", this.binaryCodeID[5][1], Search.CODE_STANDARD_COLOR);
            if (this.arrayData[mid] == searchVal) {
// HIGHLIGHT CODE!
		keepGoing = false;
            }
            else {

		this.cmd("SetForegroundColor", this.binaryCodeID[7][1], Search.CODE_HIGHLIGHT_COLOR);
		this.cmd("SetHighlight", this.searchForBoxID, 1)
		this.cmd("SetHighlight", this.arrayID[mid],1);
		this.cmd("step")
		this.cmd("SetForegroundColor", this.binaryCodeID[7][1], Search.CODE_STANDARD_COLOR);
		this.cmd("SetHighlight", this.searchForBoxID, 0)
		this.cmd("SetHighlight", this.arrayID[mid],0);
		if (this.arrayData[mid]  < searchVal) {
                    this.cmd("SetForegroundColor", this.binaryCodeID[8][0], Search.CODE_HIGHLIGHT_COLOR);
                    this.cmd("SetHighlight", this.lowID,1);
                    this.cmd("SetText", this.lowBoxID,mid+1);
                    this.cmd("Move", this.lowCircleID, this.getIndexX(mid+1), this.getIndexY(mid+1));

                    low = mid + 1;
                    for (var i = 0; i < low; i++) {
                        this.cmd("SetAlpha", this.arrayID[i],0.2);
                    }
                    this.cmd("Step");
                    this.cmd("SetForegroundColor", this.binaryCodeID[8][0], Search.CODE_STANDARD_COLOR);
                    this.cmd("SetHighlight", this.lowBoxID,0);
		}  else {
                    this.cmd("SetForegroundColor", this.binaryCodeID[10][0], Search.CODE_HIGHLIGHT_COLOR);
                    this.cmd("SetHighlight", this.highBoxID,1);
                    high  = mid - 1;
                    this.cmd("SetText", this.highBoxID,high);
                    this.cmd("Move", this.highCircleID, this.getIndexX(high), this.getIndexY(high));

                    for (var i = high + 1; i < SIZE; i++) {
                        this.cmd("SetAlpha", this.arrayID[i],0.2);
                    }
                    this.cmd("Step");

                    this.cmd("SetForegroundColor", this.binaryCodeID[10][0], Search.CODE_STANDARD_COLOR);
                    this.cmd("SetHighlight", this.midBoxID,0);

		}
	    }

	}

    }
    if (high < low) {
        this.cmd("SetText", this.resultString, "   Elemento no encontrado   ");
        this.cmd("SetText", this.resultBoxID, -1);
        this.cmd("AlignRight",   this.resultString, this.resultBoxID);
        this.cmd("SetForegroundColor", this.binaryCodeID[11][0], Search.CODE_HIGHLIGHT_COLOR);
        this.cmd("Step")
        this.cmd("SetForegroundColor", this.binaryCodeID[11][0], Search.CODE_STANDARD_COLOR);

    }  else {
        this.cmd("SetText", this.resultString, "   Elemento encontrado");
        this.cmd("SetText", this.movingLabelID, mid);
        this.cmd("SetPosition", this.movingLabelID, this.getIndexX(mid), this.getIndexY(mid));

        this.cmd("Move", this.movingLabelID, RESULT_X, RESULT_Y);

        this.cmd("AlignRight",   this.resultString, this.resultBoxID);
        this.cmd("SetForegroundColor", this.binaryCodeID[6][0], Search.CODE_HIGHLIGHT_COLOR);
        this.cmd("Step")
        this.cmd("SetForegroundColor", this.binaryCodeID[6][0], Search.CODE_STANDARD_COLOR);
    }
	
    for (var i = 0; i < SIZE; i++) {
        this.cmd("SetAlpha", this.arrayID[i],1);
    }
    return this.commands;
}

//-------------------LINEAR SEARCH---------------------------------------
Search.prototype.linearSearch = function(searchVal){
    this.commands = new Array();
    this.setCodeAlpha(this.binaryCodeID, 0);
    this.setCodeAlpha(this.linearCodeID, 1);

    this.cmd("SetALpha", this.lowBoxID, 0);
    this.cmd("SetALpha", this.lowBoxLabel, 0);
    this.cmd("SetALpha", this.midBoxID, 0);
    this.cmd("SetALpha", this.midBoxLabel, 0);
    this.cmd("SetALpha", this.highBoxID, 0);
    this.cmd("SetALpha", this.highBoxLabel, 0);


    this.cmd("SetAlpha", this.lowCircleID, 1);
    this.cmd("SetAlpha", this.midCircleID, 0);
    this.cmd("SetAlpha", this.highCircleID, 0);

    this.cmd("SetPosition", this.lowCircleID, INDEX_X, INDEX_Y);

    this.cmd("SetALpha", this.indexBoxID, 1);
    this.cmd("SetALpha", this.indexBoxLabel, 1);

    this.cmd("SetText", this.resultString, "");
    this.cmd("SetText", this.resultBoxID, "");
    this.cmd("SetText", this.movingLabelID, "");



    var goOn = true;
    var nextSearch = 0;
    this.cmd("SetText", this.searchForBoxID, searchVal);
    this.cmd("SetForegroundColor", this.linearCodeID[1][0], Search.CODE_HIGHLIGHT_COLOR);
    this.cmd("SetHighlight", this.indexBoxID,1);
    this.cmd("SetText", this.indexBoxID, "0");
    this.cmd("Move", this.lowCircleID, this.getIndexX(0), this.getIndexY(0));

    this.cmd("Step");
    this.cmd("SetForegroundColor", this.linearCodeID[1][0], Search.CODE_STANDARD_COLOR);
    this.cmd("SetHighlight", this.indexBoxID,0);

    
    var foundIndex = 0
    while (goOn) {
        if (foundIndex == SIZE) {
    	    this.cmd("SetForegroundColor", this.linearCodeID[2][1], Search.CODE_HIGHLIGHT_COLOR);
            this.cmd("Step");
    	    this.cmd("SetForegroundColor", this.linearCodeID[2][1], Search.CODE_STANDARD_COLOR);
            goOn = false;

        } else {
            this.cmd("SetHighlight", this.arrayID[foundIndex],1);
            this.cmd("SetHighlight", this.searchForBoxID,1);
    	    this.cmd("SetForegroundColor", this.linearCodeID[2][3], Search.CODE_HIGHLIGHT_COLOR);
	    this.cmd("Step")
    	    this.cmd("SetForegroundColor", this.linearCodeID[2][3], Search.CODE_STANDARD_COLOR);
            this.cmd("SetHighlight", this.arrayID[foundIndex],0);
            this.cmd("SetHighlight", this.searchForBoxID,0);
            goOn =  this.arrayData[foundIndex] < searchVal
            if (goOn)
            {
                foundIndex++;

                this.cmd("SetForegroundColor", this.linearCodeID[3][0], Search.CODE_HIGHLIGHT_COLOR);
                this.cmd("SetHighlight", this.indexBoxID,1);
                this.cmd("SetText", this.indexBoxID, foundIndex);
                  this.cmd("Move", this.lowCircleID, this.getIndexX(foundIndex), this.getIndexY(foundIndex));

                this.cmd("Step");
                this.cmd("SetForegroundColor", this.linearCodeID[3][0], Search.CODE_STANDARD_COLOR);
                this.cmd("SetHighlight", this.indexBoxID,0);
            }
        }
    }
    if (foundIndex ==SIZE)
    {
        this.cmd("SetForegroundColor", this.linearCodeID[4][1], Search.CODE_HIGHLIGHT_COLOR);
        this.cmd("Step");
        this.cmd("SetForegroundColor", this.linearCodeID[4][1], Search.CODE_STANDARD_COLOR);
        this.cmd("SetForegroundColor", this.linearCodeID[5][0], Search.CODE_HIGHLIGHT_COLOR);
        this.cmd("Step");
        this.cmd("SetForegroundColor", this.linearCodeID[5][0], Search.CODE_STANDARD_COLOR);
    }

    else if (this.arrayData[foundIndex] == searchVal)
    {
        this.cmd("SetForegroundColor", this.linearCodeID[4][1], Search.CODE_HIGHLIGHT_COLOR);
        this.cmd("SetForegroundColor", this.linearCodeID[4][2], Search.CODE_HIGHLIGHT_COLOR);
        this.cmd("SetForegroundColor", this.linearCodeID[4][3], Search.CODE_HIGHLIGHT_COLOR);
        this.cmd("SetHighlight", this.arrayID[foundIndex],1);
        this.cmd("SetHighlight", this.searchForBoxID,1);
        this.cmd("Step");

        this.cmd("SetHighlight", this.arrayID[foundIndex],0);
        this.cmd("SetHighlight", this.searchForBoxID,0);



        this.cmd("SetForegroundColor", this.linearCodeID[4][1], Search.CODE_STANDARD_COLOR);
        this.cmd("SetForegroundColor", this.linearCodeID[4][2], Search.CODE_STANDARD_COLOR);
        this.cmd("SetForegroundColor", this.linearCodeID[4][3], Search.CODE_STANDARD_COLOR);
        this.cmd("SetForegroundColor", this.linearCodeID[6][0], Search.CODE_HIGHLIGHT_COLOR);
        this.cmd("SetText", this.resultString, "   Elemento encontrado");
        this.cmd("SetText", this.movingLabelID, foundIndex);
        this.cmd("SetPosition", this.movingLabelID, this.getIndexX(foundIndex), this.getIndexY(foundIndex));

        this.cmd("Move", this.movingLabelID, RESULT_X, RESULT_Y);

        this.cmd("AlignRight",   this.resultString, this.resultBoxID);
        this.cmd("Step");
        this.cmd("SetForegroundColor", this.linearCodeID[6][0], Search.CODE_STANDARD_COLOR);
    }
    else 
    {
        this.cmd("SetHighlight", this.arrayID[foundIndex],1);
        this.cmd("SetHighlight", this.searchForBoxID,1);
        this.cmd("SetForegroundColor", this.linearCodeID[4][3], Search.CODE_HIGHLIGHT_COLOR);
        this.cmd("Step");
        this.cmd("SetHighlight", this.arrayID[foundIndex],0);
        this.cmd("SetHighlight", this.searchForBoxID,0);
        this.cmd("SetForegroundColor", this.linearCodeID[4][3], Search.CODE_STANDARD_COLOR);
        this.cmd("SetForegroundColor", this.linearCodeID[5][0], Search.CODE_HIGHLIGHT_COLOR);
        this.cmd("SetText", this.resultString, "   Elemento no encontrado   ");
        this.cmd("SetText", this.resultBoxID, -1); //texto del cuadro cuando no encuentre el elemento
        this.cmd("AlignRight",   this.resultString, this.resultBoxID);
        this.cmd("Step");
        this.cmd("SetForegroundColor", this.linearCodeID[5][0], Search.CODE_STANDARD_COLOR);
    }
    return this.commands;
}

//---------------------QUICK SEARCH-------------------------------------- falta implementar UU
Search.prototype.quickSearch = function(searchVal){
    this.commands = new Array();
    this.setCodeAlpha(this.binaryCodeID, 0);
    this.setCodeAlpha(this.linearCodeID, 0);
    this.setCodeAlpha(this.quickCodeID, 1);
    this.cmd("SetALpha", this.lowBoxID, 0);
    this.cmd("SetALpha", this.lowBoxLabel, 0);
    this.cmd("SetALpha", this.midBoxID, 0);
    this.cmd("SetALpha", this.midBoxLabel, 0);
    this.cmd("SetALpha", this.highBoxID, 0);
    this.cmd("SetALpha", this.highBoxLabel, 0);
}

var currentAlg;

function init()
{
    var animManag = initCanvas();
    currentAlg = new Search(animManag, canvas.width, canvas.height);
}
