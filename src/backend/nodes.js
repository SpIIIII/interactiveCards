class Node {
  constructor(tytle, text = "", type = 0, childs = [], parents = []) {
    this.tytle = tytle;
    this.text = text;
    this.type = type;
    this.childs = childs;
    this.parents = parents;
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
    return [this.parents.map((x) => x.tytle)];
  }
  isAllParents(parents=[]){
    if (this.strParents().every(t => parents.includes(t))) return true
    return false
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
  "Низкая скорость": { child: [], text: "", type: 4 },
  "Перенести заявку": { child: [], text: "", type: 4 },
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
  "Нет сессии": {
    child: ["Проверить индикацию роутера"],
    text: "",
    type: 2
  },
  "Есть сессия": {
    child: ["Проверить индикацию роутера"],
    text: "",
    type: 2
  },
  "IPoE абонент": { child: [], text: "", type: 2 },
  "PPPoE абонент": { child: [], text: "", type: 2 },
  "GPON абонент": { child: [], text: "", type: 2 },
  "Подключен оптикой": { child: [], text: "", type: 2 },
  "Недостаточно средств": { child: [], text: "", type: 2 },
  "Подключен к wifi": { child: [], text: "", type: 2 },
  "Отменить заявку": { child: [], text: "", type: 2 },
  "Подключение оптикой": { child: [], text: "", type: 2 },
  "Проверить логин пароль": {
    child: ["Отключить", "Восстановить данные"],
    text: "",
    type: 2
  },
  "Проверить индикацию роутера": {
    child: ["wifi включен", "wifi выключен", "Линк есть", "Линка нет"],
    text: "",
    type: 2
  },
  "wifi включен": { child: [], text: "", type: 2 },
  "wifi выключен": { child: [], text: "", type: 2 },
  "Линк есть": { child: [], text: "", type: 2 },
  "Линка нет": { child: [], text: "", type: 2 }
};

const actNodes = {
  "Заявка на ближайшее время": { child: [], text: "", type: 3 },
  "Перезагрузить роутер": { child: [], text: "", type: 3 },
  "Обновить сессию": { child: [], text: "", type: 3 },
  "Сообщить номер договора": { child: [], text: "", type: 3 },
  Отключить: { child: [], text: "", type: 3 },
  "Восстановить данные": { child: [], text: "", type: 3 }
};

const allNodes = { ...speachNodes, ...actNodes, ...factNodes, ...reqNodes };

export { allNodes, Node };
