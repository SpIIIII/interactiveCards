class Node {
  constructor(tytle, text = "", type = 0, childs = [], parents = []) {
    this.tytle = tytle;
    this.text = text;
    this.type = type;
    this.childs = childs;
    this.parents = parents;
    this.added = false;
    this.excluded = false;
    this.multiParetn = false;
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
  isAllParents(parents = []) {
    let result;
    // console.log(this.tytle, parents, this.strParents() )
    if (this.strParents().length > 1 && this.multiParetn) {
      result = this.strParents().every((t) => parents.includes(t));
    } else result = true;
    // console.log(result)
    return result;
  }
}

const speachNodes = {
  Приветствие: {
    child: ["Интернет", "Заявка", "Договор", "Счет"],
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
  Интернет: {
    child: ["Нет интернета", "Низкая скорость", "Пропадания"],
    text: "",
    type: 4
  },
  Заявка: {
    child: ["Уточнить время заявки", "Перенести заявку", "Отменить заявку"],
    text: "",
    type: 4
  },
  Договор: {
    child: ["Уточнить номер договора", "Отключить интернет"],
    text: "",
    type: 4
  },
  Счет: {
    child: ["Обещанный платеж", "Состояние счета"],
    text: "",
    type: 4
  },
  "Нет интернета": {
    child: ["Есть сессия", "Нет сессии", "TEST"],
    text: "",
    type: 2
  },
  "Низкая скорость": {
    child: [
      "Есть разрывы",
      "Пропадания пакетов пинга",
      "Проинформировать о возможных причинах низкой скорости на внутренней сети"
    ],
    text: "",
    type: 2
  },
  "Перенести заявку": { child: ["TEST"], text: "", type: 2 },
  "Отменить заявку": { child: [], text: "", type: 2 },
  "Уточнить номер договора": { child: ["Узнать адресc"], text: "", type: 2 },
  "Уточнить время заявки": { child: [], text: "", type: 2 },
  Пропадания: { child: [], text: "", type: 2 },
  "Отключить интернет": {
    child: ["Проверить логин пароль"],
    text: "",
    type: 2
  },
  "Обещанный платеж": {
    child: ["У абонента подключен отсроченный платеж"],
    text: "",
    type: 2
  },
  "Состояние счета": {
    child: ["У абонента подключен отсроченный платеж"],
    text: "",
    type: 2
  },
  "У абонента подключен отсроченный платеж": { child: [], text: "", type: 2 }
};

const factNodes = {
  "Нет сессии": {
    child: [
      "IPoE абонент",
      "PPPoE абонент",
      "Подключение оптикой",
      "GPON абонент"
    ],
    text: "",
    type: 2
  },
  "Есть сессия": {
    child: [
      "TEST",
      "Есть разрывы",
      "Пропадания пакетов пинга",
      "Устройства не подключены к wifi",
      "Перезагрузка и обновление"
    ],
    text: "",
    type: 2
  },
  "IPoE абонент": {
    child: ["Такиеже проблемы у соседей"],
    text: "",
    type: 2
  },
  "PPPoE абонент": {
    child: ["Такиеже проблемы у соседей", "Проверить напрямую", "Ошибка 651"],
    text: "",
    type: 2
  },
  "Подключен оптикой": {
    child: ["Такиеже проблемы у соседей"],
    text: "",
    type: 2
  },
  "GPON абонент": {
    child: [
      "Такиеже проблемы у соседей",
      "Горит PON Alarm",
      "Не горят Speed и Link Act"
    ],
    text: "",
    type: 2
  },
  "Настройки роутера": {
    child: [],
    text: "",
    type: 2
  },
  "Горит PON Alarm": {
    child: ["Заявка на ближайшее время со сварщиком"],
    text: "",
    type: 2
  },
  "Не горят Speed и Link Act": {
    child: ["Проверить напрямую", "Заявка на ближайшее время"],
    text: "",
    type: 2
  },
  "Проверить напрямую": {
    child: ["Проверить настройки роутера", "Ошибка 651"],
    text: "",
    type: 2
  },
  "Ошибка 651": {
    child: [],
    text: "",
    type: 2,
    multiP: true
  },

  "Недостаточно средств": { child: [], text: "", type: 2 },
  "Подключен к wifi": { child: [], text: "", type: 2 },
  "Отменить заявку": { child: [], text: "", type: 2 },
  "Подключение оптикой": {
    child: ["Нет оптического линка", "Нет Ethernet линка"],
    text: "",
    type: 2
  },
  "Нет оптического линка": {
    child: ["Заявка на ближайшее время со сварщиком"],
    text: "",
    type: 2
  },
  "Нет Ethernet линка": {
    child: ["Проверить напрямую", "Заявка на ближайшее время"],
    text: "",
    type: 2
  },
  "Проверить логин пароль": {
    child: ["Отключить", "Восстановить данные"],
    text: "",
    type: 2
  },
  "Нет линка": { child: ["Такиеже проблемы у соседей"], text: "", type: 2 },
  "wifi включен": { child: [], text: "", type: 2 },
  "wifi выключен": { child: [], text: "", type: 2 },
  "Есть разрывы": {
    child: [
      "Поврежден кабель",
      "Такиеже проблемы у соседей",
      "Заявка на ближайшее время"
    ],
    text: "",
    type: 2
  },
  "Пропадания пакетов пинга": {
    child: [
      "Поврежден кабель",
      "Такиеже проблемы у соседей",
      "Заявка на ближайшее время"
    ],
    text: "",
    type: 2
  },
  "Такиеже проблемы у соседей": {
    child: ["Передать информацию диспеnчеру"],
    text: "",
    type: 2
  },
  TEST: { child: [], text: "", type: 2, multiP: true },
  "Устройства не подключены к wifi": {
    child: [
      "Проинструктировать о подключении устройства к wifi",
      "Сети нет в списке"
    ],
    text: "",
    type: 2
  },
  "Сети нет в списке": {
    child: ["Сбросить настройки роутера"],
    text: "",
    type: 2
  },
  "Есть линк": { child: ["Такиеже проблемы у соседей"], text: "", type: 2 },
  // "Подключен напрямую": {
  //   child: ["Есть разрывы", "Пропадания пакетов пинга"],
  //   text: "",
  //   type: 2
  // },
  "Поврежден кабель": {
    child: ["Заявка на ближайшее время"],
    text: "",
    type: 2
  }
};

const actNodes = {
  "Проверить настройки роутера": { child: [], text: "", type: 3 },
  "Заявка на ближайшее время": { child: [], text: "", type: 3 },
  "Перезагрузить роутер": { child: [], text: "", type: 3 },
  "Обновить сессию": { child: [], text: "", type: 3 },
  "Сообщить номер договора": { child: [], text: "", type: 3 },
  "Заявка на ближайшее время со сварщиком": { child: [], text: "", type: 3 },
  Отключить: { child: [], text: "", type: 3 },
  "Восстановить данные": { child: [], text: "", type: 3 },
  "Передать информацию диспеnчеру": { child: [], text: "", type: 3 },
  "Проинструктировать о подключении устройства к wifi": {
    child: [],
    text: "",
    type: 3
  },
  "Сбросить настройки роутера": { child: [], text: "", type: 3 },
  "Заявка на ближайшее время": {
    child: [],
    text: "",
    type: 3
  },
  "Перезагрузка и обновление": {
    child: [],
    text: "",
    type: 3
  },
  "Проинформировать о возможных причинах низкой скорости на внутренней сети": {
    child: [],
    text: "",
    type: 3
  }
};

const allNodes = { ...speachNodes, ...actNodes, ...factNodes, ...reqNodes };

export { allNodes, Node };
