var items, gender;
$(function(){
	//генерируем имя при загрузке
	renderNames();
	//вешаем события на элементы формы
	$("#selectName, #selectFather").change(function(){
		newName();
	});
	$("#once-again").click(function(){
		newName();
		return false;
	});
	$("#rand").click(function(){
		$("#gender option:eq("+Math.floor(Math.random()*2)+")").prop("selected", true);
		renderNames();
		newName();
		return false;
	});
	$("#gender").change(function(){
		renderNames();
	});
});
function newName(){
	//вызывем функцию генерации имени по выбранным буквам в select
	rename($("#selectName").val(),$("#selectFather").val());
}
function renderNames(){
	//определяем выбранный пол 1-мальчик, 0-деочка
	gender = parseInt($("#gender").val());
	//количество имён в списке
	items = 0;
	//убираем все option из списков, чтобы заполнить новыми
	$("#selectName, #selectFather").find("option").remove();
	//если мальчик
	if(gender){
		//Берем все ключи (буквы) в объекте мужских имён и добвялем в пункты выбора букв
		for(n in male){
			$("#selectName, #selectFather").append("<option value=\""+n+"\">"+n+"</option>");
			items++;
		}
	//если девочка
	} else {
		//добавляем буквы из списка женских имён
		for(n in female){
			$("#selectName").append("<option value=\""+n+"\">"+n+"</option>");
			items++;
		}
		//отчества берём опять же из списка мужских имён
		for(n in male){
			$("#selectFather").append("<option value=\""+n+"\">"+n+"</option>");
			items++;
		}
	}
	//выбираем случайные буквы
	$("#selectName option:eq("+Math.floor(Math.random()*items)+"), #selectFather option:eq("+Math.floor(Math.random()*items)+")").prop("selected", true);
	//генерируем имя
	newName();
}

var male = {Гриша:["Гришабек Ганжатов","Гришатан Ганжатов","Нургриша Ганжатов","Гришамбек Ганжатов","Григбулат Ганжатов"],
Саша:["Сашабек Ершовоглы","Сашатан Ершовоглы","Нурсаша Ершовоглы","Сашамбек Ершовоглы","Сашабулат Ершовоглы"],
Женя:["Женябек Татариев","Женятан Татариев ","Женямбек Татариев ","Женбулат Татариев", "Женьжан Татариев"]};


function rename(initOne, initTwo){
	//создаём переменные для имён и отчеств
	var namesList, fathersList;
	//если мужчина
	if(gender){
		//отдаём массив имён и отчеств по выбранным буквам
		for(n in male){
			if(n == initOne){
				namesList = male[n];
			}
			if(n == initTwo){
				fathersList = male[n];
			}			
		}
	//если девочка	
	} else {
		//отдаём массив женских имён и отчеств по выбранным буквам
		for(n in female){
			if(n == initOne){
				namesList = female[n];
			}			
		}
		for(n in male){
			if(n == initTwo){
				fathersList = male[n];
			}			
		}
	}
	//выбираем случайные имена и имена для отчеств из полученных массивов
	var randNamePos = Math.floor(Math.random()*namesList.length)
	var randName = namesList[randNamePos];
	var randFatherPos = Math.floor(Math.random()*fathersList.length)
	var randFather = fathersList[randFatherPos];
	//смотрим окончание имени отца
	fatherEnd = randFather.slice(randFather.length-2, randFather.length);
	fatherRoot = randFather.slice(0, randFather.length-2);
	//задаём стандартные значения окончаний для м/ж отчеств
	var genderEnd = "на";if (gender) genderEnd = "ич"

	$("#out").html((randName +" "));
}