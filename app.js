

//BUDGET Control
var budgetController = (function(){

	var Expense = function( id, description, value ){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function( id, description, value ){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItems: function( type, des, val ){
			var ID = 0,newItem;

			//Create new ID
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}

			//Create new Item based on 'inc' or 'exp' type
			if(type === 'exp') {
				newItem = new Expense( ID, des, val );
			} else if( type === 'inc') {
				newItem = new Income( ID, des, val);
			}
			//Push it into our data structure
			data.allItems[type].push(newItem);
			// Return the new element
			return newItem;
		},
		testing: () => data
	};


})();


//UI Control
var UIController = (function(){
	var DOMstrings = {
		inputSelect: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	};

	return {
		getInput: function(){
			return {
				type: document.querySelector(DOMstrings.inputSelect).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			};
		},

		getDOMStrings: function(){
			return DOMstrings;
		},

		addListItem: function(obj, type){
			var html, newHtml, element;

			// create html string with placeholder text
			if(type === 'inc'){
				element = DOMstrings.incomeContainer;
				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}
			else{
				element = DOMstrings.expensesContainer;
				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%desc%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// replace placeholder with actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%desc%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);

			// insert element into html DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},
		clearFields: function(){
			var fields, fieldArr;
			fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
			fieldArr = Array.prototype.slice.call(fields);
			for(val of fieldArr){
				val.value = "";
			}
			fieldArr[0].focus();
		}
	};

})();



//GLOBal APP CONTROLLER
var controller = (function( budgetCtrl, UICtrl ){

	var setupEventListeners = function(){
		var DOM = UICtrl.getDOMStrings();
		document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);
		document.addEventListener('keypress',function(event){
		if(event.keyCode === 13 || event.which === 13){
			ctrlAddItem();
		}
	 });
	};

	var ctrlAddItem = function(){
		var input,newItem;
		// 1. Get the field Input data

		input = UICtrl.getInput();

		// 2. Add the item to Budget Controller
		newItem = budgetCtrl.addItems( input.type, input.description, input.value );

		// 3. Add item to the UI
		UICtrl.addListItem(newItem, input.type);

		// 4. Clear fields
		UICtrl.clearFields();
		// 5. Calculate the budget

		// 6. Display budget on the UI
	};

	return {
		init: function(){
			console.log('Application Started');
			setupEventListeners();
		}
	};

})( budgetController, UIController );

controller.init();