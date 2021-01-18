class Node {
  constructor(tytle, text = "", type = 0, childs = [], parents = []) {
    this.tytle = tytle;
    this.text = text;
    this.type = type;
    this.childs = childs;
    this.parents = parents;
    this.added = false;
    this.excluded = false;
    this.multiParetn = false
  }
  addChild(child) {
    this.childs.push(child);
  }
  addParent(parent) {
    this.parents.push(parent);
  }
  isEqual(node) {
    return node.tytle === this.tytle;
  }
  strParents() {
    return this.parents.map((x) => x.tytle);
  }
  isAllParents(parents=[]){
    let result
    // console.log(this.tytle, parents, this.strParents() )
    if (this.strParents().length > 1 && this.multiParetn){
      result = this.strParents().every(t => parents.includes(t))
    } 
    else result=true 
    // console.log(result)
    return result
  }
}





const speachNodes = {
  Приветствие: {
    child: [
      "Нет интернета",
      "Низкая скорость",
      "Уточнить номер договора",
      "Уточнить время заявки",
      "Перенести заявку",
      "Частые пропадания",
      "Отключить интернет",
      "Подключить обещанный платеж"
    ],
    text: "Здравствуйте это компания Feonet, оператор _____ чем могу помочь",
    type: 1
  },
  "Узнать адресc": {
    child: ["Сообщить номер договора"],
    text: "Назвоите пожалуйства свой полный адрес",
    type: 1
  }
};







const reqNodes = {
  "Нет интернета": {
    child: [
      "Подключен напрямую",
      "TEST",
      "Есть сессия",
      "Нет сессии",
      "IPoE абонент",
      "PPPoE абонент",
      "Подключение оптикой",
      "GPON абонент"
    ],
    text: "",
    type: 4
  },
  "Низкая скорость": { child: ["Есть разрывы", "Пропадания пакетов пинга", "Проинформировать о возможных причинах низкой скорости на внутренней сети"], text: "", type: 4 },
  "Перенести заявку": { child: ["TEST"], text: "", type: 4 },
  "Уточнить номер договора": { child: ["Узнать адресc"], text: "", type: 4 },
  "Уточнить время заявки": { child: [], text: "", type: 4 },
  "Частые пропадания": { child: [], text: "", type: 4 },
  "Отключить интернет": {
    child: ["Проверить логин пароль"],
    text: "",
    type: 4
  },
  "Подключить обещанный платеж": { child: [], text: "", type: 4 }
};





const factNodes = {
  "Нет сессии": {child: ["Нет линка", "Есть линк"], text: "", type: 2 },
  "Есть сессия": {child: ["Есть разрывы", "Пропадания пакетов пинга", "Устройства не подключены к wifi"], 
  text: "", type: 2},
  "IPoE абонент": { child: [], text: "", type: 2 },
  "PPPoE абонент": { child: [], text: "", type: 2 },
  "GPON абонент": { child: [], text: "", type: 2 },
  "Подключен оптикой": { child: [], text: "", type: 2 },
  "Недостаточно средств": { child: [], text: "", type: 2 },
  "Подключен к wifi": { child: [], text: "", type: 2 },
  "Отменить заявку": { child: [], text: "", type: 2 },
  "Подключение оптикой": { child: [], text: "", type: 2 },
  "Проверить логин пароль": {child: ["Отключить", "Восстановить данные"], text: "", type: 2},
  "Нет линка": {child: ["Такиеже проблемы у соседей", ], text: "", type: 2},
  "wifi включен": { child: [], text: "", type: 2 },
  "wifi выключен": { child: [], text: "", type: 2 },
  "Есть разрывы": { child: ["Поврежден кабель", "Такиеже проблемы у соседей", "Поставить заявку на ближайшее подходящее время"], text: "", type: 2 },
  "Пропадания пакетов пинга": { child: ["Поврежден кабель", "Такиеже проблемы у соседей","Поставить заявку на ближайшее подходящее время"], text: "", type: 2 },
  "Такиеже проблемы у соседей": { child: ["Передать информацию диспеnчеру"], text: "", type: 2 },
  "TEST": { child: [], text: "", type: 2, multiP:true },
  "Устройства не подключены к wifi": { child: ["Проинструктировать о подключении устройства к wifi", "Сети нет в списке"], text: "", type: 2 },
  "Сети нет в списке": { child: ["Сбросить настройки роутера"], text: "", type: 2},
  "Есть линк": { child: ["Такиеже проблемы у соседей"], text: "", type: 2},
  "Подключен напрямую": { child: ["Есть разрывы", "Пропадания пакетов пинга",], text: "", type: 2},
  "Поврежден кабель":{ child: ["Заявка на ближайшее время",], text: "", type: 2},
};






const actNodes = {
  "Заявка на ближайшее время": { child: [], text: "", type: 3 },
  "Перезагрузить роутер": { child: [], text: "", type: 3 },
  "Обновить сессию": { child: [], text: "", type: 3 },
  "Сообщить номер договора": { child: [], text: "", type: 3 },
  "Отключить": { child: [], text: "", type: 3 },
  "Восстановить данные": { child: [], text: "", type: 3 },
  "Передать информацию диспеnчеру": { child: [], text: "", type: 3 },
  "Проинструктировать о подключении устройства к wifi": { child: [], text: "", type: 3 },
  "Сбросить настройки роутера": { child: [], text: "", type: 3 },
  "Поставить заявку на ближайшее подходящее время": { child: [], text: "", type: 3 },
  "Проинформировать о возможных причинах низкой скорости на внутренней сети": { child: [], text: "", type: 3 },
  
};

const allNodes = { ...speachNodes, ...actNodes, ...factNodes, ...reqNodes };

export { allNodes, Node };
